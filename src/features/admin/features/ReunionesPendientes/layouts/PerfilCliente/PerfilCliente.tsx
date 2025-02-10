import React, { useState } from "react";
import style from "./PerfilCliente.module.css";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";

import { DataTable } from "primereact/datatable";

import { useGetFetch } from "@/hooks/useGetFetch";
import { useParams } from "react-router-dom";
import { Ficha } from "./components/Ficha/Ficha";
import { useMobile } from "@/hooks/useMobile";
import { Column } from "primereact/column";
import { HeaderDataTable } from "@/components/HeaderDataTable/HeaderDataTable";

import { Button } from "primereact/button";

import pdfView from "@/assets/carta-prueba.pdf";
import { Dialog } from "primereact/dialog";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { SelectField } from "@/components/SelectField/SelectField";
import { SwitchField } from "@/components/SwitchField/SwitchField";
import { InputSwitchChangeEvent } from "primereact/inputswitch";
import { UploadField } from "@/components/UploadField/UploadField";

export const PerfilCliente = () => {
	const { id } = useParams();
	const { isMobile } = useMobile();
	const getData = useGetFetch("/prospecto/" + id);
	const data = {
		tipoDoc: getData?.data?.tipoIdentificacion || "",
		documento: getData?.data?.numeroIdentificacion || "",
		nombre: getData?.data?.nombres || "",
		apellido: getData?.data?.apellidos || "",
		residencia: getData?.data?.residencia || "",
		edoCivil: getData?.data?.estadoCivil || "",
		especialidad: getData?.data?.ocupacion || "",
		ingresos: getData?.data?.ingresos || "",
		segmento: getData?.data?.segmento || "",
	};

	const [filterValues, setFilterValues] = useState({
		nombre: "",
		empresa: "",
		sector: undefined,
		ciudad: undefined,
		interes: "",
	});

	const handleFilterChange = (e: any) => {
		const { name, value } = e.target;
		setFilterValues((prev) => ({
			...prev,
			[name]: value || undefined,
		}));
	};

	const handleOpenPDF = () => {
		window.open(pdfView, "_blank");
	};

	// dialog

	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [formValues, setFormValues] = useState({
		participante1: "",
		participante2: "",
		fecha: "",
		hora: "",
		duracion: "",
		modalidad: "",
	});

	const handleInputChange = (name: string, value: string) => {
		setFormValues({ ...formValues, [name]: value });
	};

	const handleOpenModal = () => {
		setModalVisible(true);
	};

	return (
		<>
			<MainContentStructure titleText="Información del Proyecto">
				<div className={style.seguimientoServicio__container}>
					<Ficha {...data} />

					<div>
						<h3 style={{ color: "var(--primary-color-app)" }}>Cuadro de cartas LVA</h3>
						<br />

						<HeaderDataTable onAddModal={handleOpenModal} textAddButton="Agregar Carta" />
						<br />

						<DataTable
							style={{ width: isMobile ? "90vw" : "calc(100vw - 320px)", fontSize: "13px" }}
							value={dataCarta || []}
							// headerColumnGroup={headerGroup}
							tableStyle={{ minWidth: "290vw", maxHeight: "50px" }}
							showGridlines
							scrollable
							stripedRows
							size="small"
							paginator
							rows={8}
							lazy
						>
							{columns &&
								columns.map((item: any, index) => (
									<Column
										key={index}
										field={item.campo}
										body={item.body}
										header={item.nombre}
										style={{
											width: item.widthColumn && item.widthColumn,
											minWidth: "25px",
											fontSize: "13px",
											textAlign: "center",
										}}
									/>
								))}
							<Column
								header="Ver Documento"
								style={{ width: "30px" }}
								body={() => (
									<Button
										label="Visualizar documento"
										icon="pi pi-send"
										className="p-button-sm p-button-primary"
										onClick={handleOpenPDF}
									/>
								)}
							/>
						</DataTable>
					</div>
				</div>
			</MainContentStructure>

			<Dialog
				header="Nueva Carta"
				visible={modalVisible}
				style={{ width: "40vw" }}
				onHide={() => setModalVisible(false)}
			>
				<div
					className={style.modalContent}
					style={{ display: "flex", gap: "5px", flexDirection: "column" }}
				>
					<TextBoxField
						textLabel="Código Interno:"
						value={formValues.hora}
						name="ab1"
						onChange={(e) => handleInputChange("hora", e.target.value)}
					/>
					<TextBoxField
						textLabel="Asunto:"
						value={formValues.hora}
						name="ab2"
						onChange={(e) => handleInputChange("hora", e.target.value)}
					/>

					<TextBoxField
						textLabel="Fecha de envío:"
						value={formValues.hora}
						name="ab3"
						type="date"
						onChange={(e) => handleInputChange("asd", e.target.value)}
					/>

					<SwitchField
						value={false}
						textLabel="Requiere respuesta:"
						name={""}
						labelWidth="180px"
						direction="row"
						onChange={function (event: InputSwitchChangeEvent): void {
							throw new Error("Function not implemented.");
						}}
					/>
					<SwitchField
						value={false}
						textLabel="TYTL - BCP:"
						labelWidth="180px"
						name={""}
						direction="row"
						onChange={function (event: InputSwitchChangeEvent): void {
							throw new Error("Function not implemented.");
						}}
					/>
					<br />
					<UploadField />

					<br />
					<Button
						label="Agregar Carta"
						icon="pi pi-check"
						className="p-button-success"
						onClick={() => {}}
					/>
				</div>
			</Dialog>
		</>
	);
};

const columns = [
	{ nombre: "Código Interno", campo: "codigoInterno", widthColumn: "100px" },
	{ nombre: "Receptor", campo: "receptor", widthColumn: "100px" },
	{ nombre: "Asunto", campo: "asunto", widthColumn: "100px" },
	{ nombre: "Fecha de Envío", campo: "fechaEnvio", widthColumn: "80px" },
	{ nombre: "Requiere RPTA.", campo: "requiereRpta", widthColumn: "50px" },
	{ nombre: "TYTL - BCP", campo: "tytlBcp", widthColumn: "50px" },
	{ nombre: "Fecha de Envío (2)", campo: "fechaEnvio2", widthColumn: "50px" },
	{ nombre: "BCP traslado al GORE", campo: "bcpTrasladoGore", widthColumn: "50px" },
	{ nombre: "Fecha de Envío (3)", campo: "fechaEnvio3", widthColumn: "50px" },
	{ nombre: "Comentarios", campo: "comentarios", widthColumn: "100px" },
	{ nombre: "RPTA. GORE", campo: "rptaGore", widthColumn: "100px" },
	{ nombre: "Fecha de Respuesta", campo: "fechaRespuesta", widthColumn: "100px" },
	{ nombre: "Hoy", campo: "hoy", widthColumn: "100px" },
	{ nombre: "Días Transcurridos", campo: "diasTranscurridos", widthColumn: "100px" },
	{ nombre: "Cargo", campo: "cargo", widthColumn: "100px" },
	{ nombre: "Estado", campo: "estado", widthColumn: "30px" },
];

const dataCarta = [
	{
		id: 1,
		codigoInterno: "RIP-BCP-CAR-ED09-0001",
		receptor: "BCP",
		asunto: "Se remite Propuesta de Modificación – Plan de Trabajo de fecha 24 de agosto del 2024",
		fechaEnvio: "07/02/2025",
		requiereRpta: "Sí",
		tytlBcp: "Sí",
		fechaEnvio2: "07/02/2025",
		bcpTrasladoGore: "Sí",
		fechaEnvio3: "07/02/2025",
		comentarios: "Se adjunta la propuesta de modificación",
		rptaGore: "No",
		fechaRespuesta: "",
		hoy: "07/02/2025",
		diasTranscurridos: "0",
		cargo: "Coordinador",
		estado: "Pendiente",
	},
	{
		id: 2,
		codigoInterno: "RIP-BCP-CAR-ED09-0002",
		receptor: "BCP",
		asunto: "Se remite Propuesta de Modificación – Plan de Trabajo de fecha 24 de agosto del 2024",
		fechaEnvio: "07/02/2025",
		requiereRpta: "Sí",
		tytlBcp: "Sí",
		fechaEnvio2: "07/02/2025",
		bcpTrasladoGore: "Sí",
		fechaEnvio3: "07/02/2025",
		comentarios: "Se adjunta la propuesta de modificación",
		rptaGore: "No",
		fechaRespuesta: "",
		hoy: "07/02/2025",
		diasTranscurridos: "0",
		cargo: "Coordinador",
		estado: "Pendiente",
	},
];
