import React from "react";
import style from "./PerfilCliente.module.css";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";
import { ContentBox } from "@/components/ContentBox/ContentBox";

import { DataTable } from "@/components/DataTable/DataTable";

import iconoConsumo from "./assets/icono-consumo.png";
import iconoCuentaAhorros from "./assets/icono-cuenta-ahorros.png";
import iconoCuentaCorriente from "./assets/icono-cuenta-corriente.png";
import iconoInversiones from "./assets/icono-inversiones.png";
import iconoTarjetaCredito from "./assets/icono-tarjeta-credito.png";
import iconoVehicular from "./assets/icono-vehicular.png";
import iconoVivienda from "./assets/icono-vivienda.png";

import { useGetFetch } from "@/hooks/useGetFetch";
import { useParams } from "react-router-dom";
import { Ficha } from "./components/Ficha/Ficha";
import { useMobile } from "@/hooks/useMobile";
///import { validateEntry } from "@/helpers/validateEntry";

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
	return (
		<MainContentStructure titleText="Perfil de prospecto segmentado">
			<div className={style.seguimientoServicio__container}>
				<Ficha {...data} />
				<div
					style={{
						display: "flex",
						gap: "20px",
						width: isMobile ? "90vw" : "100%",
						overflowX: "auto",
					}}
				>
					{ofertaValor
						.filter((item) => item.segmento.includes(data?.segmento))
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

				<ContentBox additionalClassName={style.content__box}>
					<h3>Información Financiera</h3>
					<div className={style.container}>
						<div className={style.content}>
							<div className={style.perfilContadora__cliente__field}>
								<p className={style.perfilContadora__label}>Ingresos:</p>
								<p>Bs. {getData?.data?.ingresos || ""}</p>
							</div>
							<div className={style.perfilContadora__cliente__field}>
								<p className={style.perfilContadora__label}>Gastos financieros:</p>
								<p>Bs. {getData?.data?.gastosFinancieros || ""}</p>
							</div>
						</div>
						<div className={style.content}>
							<div className={style.perfilContadora__cliente__field}>
								<p className={style.perfilContadora__label}>Otros Ingresos:</p>
								<p>Bs. {getData?.data?.otrosIngresos || ""}</p>
							</div>
							<div className={style.perfilContadora__cliente__field}>
								<p className={style.perfilContadora__label}>Gastos de Manutención:</p>
								<p>Bs. {getData?.data?.gastosMantenimiento || ""}</p>
							</div>
						</div>
					</div>
				</ContentBox>
				<ContentBox additionalClassName={style.content__box}>
					<h3>Información de Contacto</h3>
					<div className={style.container}>
						<div className={style.content}>
							<div className={style.perfilContadora__cliente__field}>
								<p className={style.perfilContadora__label}>Teléfono:</p>
								<p>{getData?.data?.telefono || ""}</p>
							</div>
							<div className={style.perfilContadora__cliente__field}>
								<p className={style.perfilContadora__label}>Email:</p>
								<p>{getData?.data?.email || ""}</p>
							</div>
						</div>
						<div className={style.content}>
							<div className={style.perfilContadora__cliente__field}>
								<p className={style.perfilContadora__label}>Teléfono de trabajo:</p>
								<p>{getData?.data?.telefonoTrabajo || ""}</p>
							</div>
						</div>
					</div>
				</ContentBox>
				<div>
					<h3>Productos Financieros Actuales</h3>
					<div className={style.responsive__datatable}>
						<DataTable
							columns={columns}
							data={getData?.data?.productosFinancieros || []}
							isHeaderActive={false}
						/>
					</div>
				</div>
			</div>
		</MainContentStructure>
	);
};

const columns = [
	{ nombre: "Entidad Financiera", campo: "entidadFinanciera" },
	{ nombre: "Producto Financiero", campo: "tipoProducto" },
];
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
