/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import style from "./Segmentador.module.css";

import { useFormik } from "formik";
import * as Yup from "yup";

import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { SelectField } from "@/components/SelectField/SelectField";
import { SwitchField } from "@/components/SwitchField/SwitchField";

import { IoAddOutline } from "react-icons/io5";
import { DataTable } from "@/components/DataTable/DataTable";
import { handleChangeInput } from "@/helpers/handleTextBox";
import { NumberBoxField } from "@/components/NumberBoxField/NumberBoxField";

import iconoConsumo from "./assets/icono-consumo.png";
import iconoCuentaAhorros from "./assets/icono-cuenta-ahorros.png";
import iconoCuentaCorriente from "./assets/icono-cuenta-corriente.png";
import iconoInversiones from "./assets/icono-inversiones.png";
import iconoTarjetaCredito from "./assets/icono-tarjeta-credito.png";
import iconoVehicular from "./assets/icono-vehicular.png";
import iconoVivienda from "./assets/icono-vivienda.png";

import axios from "axios";
import { url } from "@/connections/mainApi";
import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { useModal } from "@/hooks/useModal";
import { ConfirmarSegmentacion } from "./modals/ConfirmarSegmentacion/ConfirmarSegmentacion";
import { GuardarProspecto } from "./modals/GuardarProspecto/GuardarProspecto";
import { setToast } from "@/store/slices/toast";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { validateEntry } from "@/helpers/validateEntry";
import { useMobile } from "@/hooks/useMobile";

export const Segmentador = () => {
	const dispatch = useAppDispatch();
	const segmentacionModal = useModal();
	const guardarModal = useModal();
	const { isMobile } = useMobile();
	const [switchStatus, setSwitchStatus] = useState(false);

	const { login } = useAppSelector((state) => state.auth);

	const handleSwitchStatus = () => {
		setSwitchStatus((prev: any) => !prev);
	};
	const initialValues = {
		tipoIdentificacion: "",
		numeroIdentificacion: "",
		nombres: "",
		apellidos: "",
		ocupacion: "",
		ingresos: "",
		otrosIngresos: "",
		gastosFinancieros: "",
		gastosMantenimiento: "",
		ofertaValor: "",
		telefono: "",
		telefonoTrabajo: "",
		email: "",
		estadoCivil: "",
		residencia: "",
		productosFinancierosActive: false,
		productosFinancieros: [],
		segmento: "",
	};
	const { values, handleSubmit, handleChange, errors, setValues } = useFormik({
		initialValues,
		onSubmit: () => {
			guardarModal.onVisibleModal();
		},
		validationSchema: Yup.object({
			tipoIdentificacion: Yup.string().required("Tipo de Documento Requerido."),
			numeroIdentificacion: Yup.string().required("Número de Documento Requerido."),
			nombres: Yup.string().required("Nombres Requeridos."),
			apellidos: Yup.string().required("Apellidos Requeridos."),
			ingresos: Yup.number()
				.required("Ingresos Requeridos.")
				.min(1, "Los ingresos deben ser superiores a 0."),
		}),
	});

	// --- Información del prospecto

	// --- Producto Financiero
	const [productoFinancierosList, setProductoFinancierosList] = useState<any>([]);

	const [nuevoProducto, setNuevoProducto] = useState({
		entidadFinanciera: "",
		tipoProducto: "",
	});

	const handleNuevoProducto = () => {
		setProductoFinancierosList((prev: any) => {
			if (nuevoProducto.entidadFinanciera.length === 0 && nuevoProducto.tipoProducto.length === 0) {
				dispatch(
					setToast({
						severity: "error",
						summary: "Error al crear producto",
						detail: `No se puede crear producto vacío`,
					})
				);
				return prev;
			}
			const isNew: any = prev.filter(
				(item: { entidadFinanciera: string; tipoProducto: string }) => {
					return (
						item?.entidadFinanciera === nuevoProducto.entidadFinanciera &&
						item?.tipoProducto === nuevoProducto.tipoProducto
					);
				}
			);

			if (isNew.length > 0) {
				dispatch(
					setToast({
						severity: "error",
						summary: "Error al crear producto",
						detail: `No se puede crear producto repetido`,
					})
				);
				return prev;
			}
			return [...prev, nuevoProducto];
		});
		setNuevoProducto({
			entidadFinanciera: "",
			tipoProducto: "",
		});
	};

	// Estado del prospecto
	const [isSegmentado, setIsSegmentado] = useState(false);

	const handleChangeSegment = () => {
		setIsSegmentado(true);
	};

	// Segmento bajo: solo productos de ahorro e inversión (nada de crédito)
	// Segmento medio: crédito de consumo y TDC + ahorro e inversión
	// Segmento medio alto : todos los productos, diferenciación en TDC
	// Segmento Alto: todos los productos, diferenciación en TDC

	const ofertaValor = [
		{
			id: 2,
			texto: "Consumo",
			icon: iconoConsumo,
			segmento: ["MEDIO", "MEDIO-ALTO", "ALTO"],
		},
		{
			id: 3,
			texto: "Vivienda",
			icon: iconoVivienda,
			segmento: ["MEDIO-ALTO", "ALTO"],
		},
		{
			id: 4,
			texto: "Vehicular",
			icon: iconoVehicular,
			segmento: ["MEDIO-ALTO", "ALTO"],
		},
		{
			id: 5,
			texto: "T. de crédito",
			icon: iconoTarjetaCredito,
			segmento: ["MEDIO", "MEDIO-ALTO", "ALTO"],
		},
		{
			id: 6,
			texto: "Cta. de ahorros",
			icon: iconoCuentaAhorros,
			segmento: ["BAJO", "MEDIO", "MEDIO-ALTO", "ALTO"],
		},
		{
			id: 7,
			texto: "Cta. corriente",
			icon: iconoCuentaCorriente,
			segmento: ["BAJO", "MEDIO", "MEDIO-ALTO", "ALTO"],
		},
		{
			id: 1,
			texto: "Inversiones (DPF)",
			icon: iconoInversiones,
			segmento: ["BAJO", "MEDIO", "MEDIO-ALTO", "ALTO"],
		},
	];

	// Creacion
	const postProspect = async () => {
		const createData = {
			...values,
			otrosIngresos: values.otrosIngresos == null ? 0 : values.otrosIngresos,
			gastosFinancieros: values.gastosFinancieros == null ? 0 : values.gastosFinancieros,
			gastosMantenimiento: values.gastosMantenimiento == null ? 0 : values.gastosMantenimiento,
			productosFinancierosActive: switchStatus,
			productosFinancieros: productoFinancierosList,
			segmento: validateEntry(values.ingresos).text,
		};

		await axios.post(`${url}/prospecto`, createData, {
			headers: {
				Authorization: `Bearer ${login?.access_token}`,
			},
		});

		dispatch(
			setToast({
				severity: "success",
				summary: "¡Prospecto Creado!",
				detail: `Prospecto Creado Correctamente`,
			})
		);

		setTimeout(() => {
			setValues(initialValues);

			setSwitchStatus(false);
			setProductoFinancierosList([]);
			setIsSegmentado(false);
		}, 500);
	};
	const onNextStep = () => {
		if (Object.entries(errors).length === 0) {
			segmentacionModal.onVisibleModal();
		}
		if (Object.entries(errors).length <= 5) {
			Object.entries(errors).forEach(([, value]: any) => {
				dispatch(
					setToast({
						severity: "error",
						summary: "Error en el formulario",
						detail: `${value}`,
					})
				);
			});
		}
	};

	const eliminarProductoFinanciero = (rowData: any) => {
		const dataFiltered = productoFinancierosList.filter(
			(item: any) =>
				item.entidadFinanciera !== rowData.entidadFinanciera ||
				item.tipoProducto !== rowData.tipoProducto
		);

		setProductoFinancierosList(dataFiltered);
	};

	return (
		<>
			{isSegmentado ? (
				<MainContentStructure titleText="Segmentación de prospectos">
					<form noValidate onSubmit={handleSubmit}>
						<div style={{ display: "flex", justifyContent: "space-between", paddingRight: "50px", width: isMobile ? "90vw" : "100%", }}>
							<div>
								<h3>Nombre del prospecto:</h3>
								<p>
									{values.nombres} {values.apellidos}
								</p>
							</div>

							<div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
								<p style={{ fontSize: "20px" }}>Segmento</p>
								<div
									style={{
										padding: "5px 10px",
										textAlign: "center",
										borderRadius: "20px",
										background: `${validateEntry(values.ingresos).color}`,
										color: "#fff",
									}}
								>
									{validateEntry(values.ingresos).text}
								</div>
							</div>
						</div>

						<Divider />

						<div>
							<h3>Oferta de valor disponible</h3>
							<br />

							<div
								style={{
									display: "flex",
									gap: "20px",
									overflowX: "auto",
									width: isMobile ? "90vw" : "100%",
								}}
							>
								{ofertaValor
									.filter((item) => item.segmento.includes(validateEntry(values.ingresos).text))
									.map((item) => (
										<div
											key={item.id}
											style={{
												display: "flex",
												flexDirection: "column",
												alignItems: "center",
												width: "100px",
												padding: "10px",
												border: "1px solid #ddd",
												borderRadius: "8px",
												boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
											}}
										>
											<img
												src={item.icon}
												alt={item.texto}
												style={{ width: "50px", height: "50px", marginBottom: "10px" }}
											/>
											<p style={{ fontSize: "14px", textAlign: "center" }}>{item.texto}</p>
										</div>
									))}
							</div>
						</div>

						<Divider />

						<div>
							<h3>Para continuar, es necesario completar los siguientes datos del prospecto</h3>
							<br />

							<div className={style.segmentadorGroup__container}>
								<TextBoxField
									textLabel="Teléfono:"
									value={values.telefono}
									name={"telefono"}
									onChange={handleChange}
									direction="row"
									labelWidth="200px"
								/>
								<TextBoxField
									textLabel="Teléfono de trabajo:"
									value={values.telefonoTrabajo}
									name={"telefonoTrabajo"}
									onChange={handleChange}
									direction="row"
									labelWidth="200px"
								/>
								<TextBoxField
									textLabel="Email:"
									value={values.email}
									name={"email"}
									onChange={handleChange}
									direction="row"
									labelWidth="200px"
								/>
								<SelectField
									textLabel="Estado civil:"
									value={values.estadoCivil}
									name={"estadoCivil"}
									onChange={handleChange}
									options={[
										{ id: 1, name: "Soltero", value: "soltero" },
										{ id: 2, name: "Casado", value: "casado" },
										{ id: 3, name: "Unión libre", value: "unión libre" },
									]}
									direction="row"
									labelWidth="200px"
								/>
								<TextBoxField
									textLabel="Residencia:"
									value={values.residencia}
									name={"residencia"}
									onChange={handleChange}
									direction="row"
									labelWidth="200px"
								/>
							</div>
						</div>

						<br />

						<div style={{ display: "flex", gap: "10px" }}>
							<Button
								className="p-button-sm p-button-info mr-2"
								onClick={guardarModal.onVisibleModal}
							>
								Guardar prospecto
							</Button>
						</div>
					</form>
				</MainContentStructure>
			) : (
				<MainContentStructure titleText="Segmentación de prospectos">
					<div>
						<h3>Datos personales</h3>

						<div className={style.segmentadorGroup__container}>
							<SelectField
								textLabel="Tipo de identificación:"
								value={values.tipoIdentificacion}
								name={"tipoIdentificacion"}
								onChange={handleChange}
								options={[
									{ id: 1, name: "Carnet de identidad", value: "carnet" },
									{ id: 2, name: "Pasaporte", value: "pasaporte" },
									{ id: 3, name: "Carnet de extranjería", value: "extranjeria" },
								]}
								direction="row"
								labelWidth="200px"
							/>
							<TextBoxField
								textLabel="Número de identificación:"
								value={values.numeroIdentificacion}
								name={"numeroIdentificacion"}
								onChange={handleChange}
								direction="row"
								labelWidth="200px"
							/>
							<TextBoxField
								textLabel="Nombres:"
								value={values.nombres}
								name={"nombres"}
								onChange={handleChange}
								direction="row"
								labelWidth="200px"
							/>
							<TextBoxField
								textLabel="Apellidos:"
								value={values.apellidos}
								name={"apellidos"}
								onChange={handleChange}
								direction="row"
								labelWidth="200px"
							/>
							<SelectField
								textLabel="Ocupación:"
								value={values.ocupacion}
								name={"ocupacion"}
								onChange={handleChange}
								options={[
									{ id: 1, name: "Empleado", value: "empleado" },
									{ id: 2, name: "Empleado con otros ingresos", value: "empleadoIngresos" },
									{ id: 3, name: "Independiente", value: "independiente" },
								]}
								direction="row"
								labelWidth="200px"
							/>
						</div>
					</div>

					<Divider />

					<div>
						<h3>Información financiera</h3>

						<div className={style.segmentadorGroup__container}>
							<NumberBoxField
								textLabel="Ingresos:"
								value={values.ingresos}
								name={"ingresos"}
								direction="row"
								onChange={handleChange}
								labelWidth="200px"
							/>
							<NumberBoxField
								textLabel="Otros ingresos:"
								value={values.otrosIngresos}
								name={"otrosIngresos"}
								direction="row"
								onChange={handleChange}
								labelWidth="200px"
							/>
							<NumberBoxField
								textLabel="Gastos financieros:"
								value={values.gastosFinancieros}
								name={"gastosFinancieros"}
								direction="row"
								onChange={handleChange}
								labelWidth="200px"
							/>
							<NumberBoxField
								textLabel="Gastos de manutención:"
								value={values.gastosMantenimiento}
								name={"gastosMantenimiento"}
								direction="row"
								onChange={handleChange}
								labelWidth="200px"
							/>
						</div>
					</div>

					<Divider />

					<div>
						<h3>Productos financieros</h3>

						<div className={style.segmentadorGroup__container__entidadFinanciera}>
							<SwitchField
								value={switchStatus}
								name={""}
								onChange={handleSwitchStatus}
								textLabel="¿Cuenta con productos financieros de otros bancos?"
								direction="row"
							/>

							{switchStatus ? (
								<>
									<div className={style.segmentadorGroup__container__productosFinancieros}>
										<SelectField
											textLabel="Entidad financiera:"
											value={nuevoProducto.entidadFinanciera}
											name={"entidadFinanciera"}
											direction="row"
											onChange={(e) => handleChangeInput(e, setNuevoProducto)}
											labelWidth="160px"
											options={[
												{
													id: 1,
													name: "Banco Mercantil Santa Cruz",
													value: "Banco Mercantil Santa Cruz",
												},
												{ id: 2, name: "Banco Nacional", value: "Banco Nacional" },
												{ id: 3, name: "Banco Unión", value: "Banco Unión" },
												{ id: 4, name: "Banco BISA", value: "Banco BISA" },
												{
													id: 5,
													name: "Banco de Crédito de Bolivia",
													value: "Banco de Crédito de Bolivia",
												},
												{ id: 6, name: "Banco Fie", value: "Banco Fie" },
												{ id: 7, name: "BancoSol", value: "BancoSol" },
												{ id: 8, name: "Banco Ganadero", value: "Banco Ganadero" },
												{ id: 9, name: "Banco Económico", value: "Banco Económico" },
												{ id: 10, name: "Banco Prodem", value: "Banco Prodem" },
												{
													id: 11,
													name: "Banco de Desarrollo Productivo",
													value: "Banco de Desarrollo Productivo",
												},
												{ id: 12, name: "Banco Fortaleza", value: "Banco Fortaleza" },
												{ id: 13, name: "Banco Nación", value: "Banco Nación" },
											]}
										/>
										<SelectField
											textLabel="Producto financiero:"
											value={nuevoProducto.tipoProducto}
											name={"tipoProducto"}
											direction="row"
											onChange={(e) => handleChangeInput(e, setNuevoProducto)}
											labelWidth="160px"
											options={[
												{ id: 1, name: "Tarjeta de crédito", value: "Tarjeta de crédito" },
												{ id: 2, name: "Crédito de consumo", value: "Crédito de consumo" },
												{ id: 3, name: "Crédito de vehiculo", value: "Crédito de vehiculo" },
												{ id: 4, name: "Crédito hipotecario", value: "Crédito hipotecario" },
												{ id: 5, name: "Cuenta de ahorros", value: "Cuenta de ahorros" },
												{ id: 6, name: "Cuenta de corriente", value: "Cuenta de corriente" },
												{ id: 7, name: "DPF", value: "DPF" },
											]}
										/>

										<div className={style.addButton__container} onClick={handleNuevoProducto}>
											<p>Agregar</p>
											<IoAddOutline />
										</div>
									</div>

									<div className={style.responsive__datatable}>
										<DataTable
											columns={columns}
											data={productoFinancierosList}
											isHeaderActive={false}
											onDelete={eliminarProductoFinanciero}
										/>
									</div>
								</>
							) : (
								<></>
							)}
						</div>
					</div>

					<br />

					<div style={{ display: "flex", gap: "10px" }}>
						<Button className="p-button-sm p-button-info mr-2" onClick={onNextStep}>
							Segmentar prospecto
						</Button>
					</div>
				</MainContentStructure>
			)}

			{/* Add Modal */}
			<PrimeModal
				header="Confirmar la segmentar del prospecto"
				modalStatus={segmentacionModal.modalStatus}
				onHideModal={segmentacionModal.onHideModal}
				width={isMobile ? 300 : 500}
			>
				<ConfirmarSegmentacion
					data={values}
					handleChangeSegment={handleChangeSegment}
					onHideModal={segmentacionModal.onHideModal}
				/>
			</PrimeModal>

			{/* Update Modal */}
			<PrimeModal
				header="Guardar prospecto segmentado"
				modalStatus={guardarModal.modalStatus}
				onHideModal={guardarModal.onHideModal}
				width={650}
			>
				<GuardarProspecto
					data={values}
					handleChangeSegment={postProspect}
					onHideModal={guardarModal.onHideModal}
				/>
			</PrimeModal>
		</>
	);
};

const columns = [
	{ nombre: "Entidad Financiera", campo: "entidadFinanciera" },
	{ nombre: "Producto Financiero", campo: "tipoProducto" },
];
