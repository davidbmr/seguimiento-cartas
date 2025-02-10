/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";

import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";

import axios from "axios";
import { url } from "@/connections/mainApi";
import { formatMoney } from "@/helpers/formatMoney";
import { HeaderDataTable } from "@/components/HeaderDataTable/HeaderDataTable";
import { useMobile } from "@/hooks/useMobile";

export const ClientesSegmentados = () => {
	const [dataSegmentado, setDataSegmentado] = useState<any>([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(8);
	const [totalItems, setTotalItems] = useState(0);

	const [searchTerm, setSearchTerm] = useState<string>("");
	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const debounceTimeout = useRef<any>(null); // Ref para manejar el temporizador
	const { isMobile } = useMobile();
	// Debounce: Actualiza `debouncedSearchTerm` después de un retraso
	useEffect(() => {
		// Limpia el temporizador previo si existe
		if (debounceTimeout.current) {
			clearTimeout(debounceTimeout.current);
		}

		// Configura un nuevo temporizador
		debounceTimeout.current = setTimeout(() => {
			setDebouncedSearchTerm(searchTerm); // Actualiza el término de búsqueda con debounce
		}, 500); // 500 ms de retraso

		// Limpia el temporizador al desmontar o antes de configurar uno nuevo
		return () => {
			clearTimeout(debounceTimeout.current);
		};
	}, [searchTerm]);

	// Fetch de datos (general o filtrado)
	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				if (debouncedSearchTerm) {
					// Petición al endpoint de filtrado
					const response = await axios.get(
						`${url}/segmentacion/dashboard/bi-oficial/${debouncedSearchTerm}`
					);
					setDataSegmentado(response.data); // Asume que el backend devuelve un array de resultados filtrados
					setTotalItems(response.data.length); // La longitud del array filtrado
				} else {
					// Petición al endpoint de datos generales
					const response = await axios.get(`${url}/segmentacion`, {
						params: { page: page + 1, limit: rowsPerPage },
					});
					const data = response.data;
					setDataSegmentado(data.data || []); // Data general paginada
					setPage(data.page - 1); // Ajuste para páginas del backend (1-based)
					setRowsPerPage(data.perPage);
					setTotalItems(data.totalItems);
				}
			} catch (error) {
				console.error("Error al obtener los datos:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, [page, rowsPerPage, debouncedSearchTerm]);

	const headerGroup = (
		<ColumnGroup>
			<Row>
				<Column header="" colSpan={15} style={{ textAlign: "center" }} />
				<Column header="TC" colSpan={3} style={{ textAlign: "center" }} />
				<Column header="Consumo" colSpan={2} style={{ textAlign: "center" }} />
				<Column header="Bisa Hogar" colSpan={5} style={{ textAlign: "center" }} />
				<Column header="Bisa Auto" colSpan={5} style={{ textAlign: "center" }} />
			</Row>

			<Row>
				<Column header="" colSpan={5} style={{ textAlign: "center" }} />
				<Column header="Saldos Actuales Clientes" colSpan={3} style={{ textAlign: "center" }} />
				{/* <Column header="Ponderaciones" colSpan={3} /> */}
				{/* <Column header="Indice" colSpan={2} /> */}
				<Column header="Potencial de Crecimiento" colSpan={2} />
				{/* <Column header="Estrategia" colSpan={7} /> */}
				<Column header="Con Calificación de Riesgo" colSpan={2} style={{ textAlign: "center" }} />
				<Column header="" colSpan={3} />
				<Column header="Tarjeta de Crédito" colSpan={3} style={{ textAlign: "center" }} />
				<Column header="Crédito Consumo" colSpan={2} style={{ textAlign: "center" }} />
				<Column header="Hasta 2da Vivienda" colSpan={4} style={{ textAlign: "center" }} />
				<Column header="Hasta 3ra Vivienda" colSpan={1} style={{ textAlign: "center" }} />
				<Column header="Crédito de Auto" colSpan={5} style={{ textAlign: "center" }} />
			</Row>
			<Row>
				{columns &&
					columns.map((item: any, key) => (
						<Column key={key} header={item.nombre} style={{ textAlign: "center" }} />
					))}
			</Row>
		</ColumnGroup>
	);

	return (
		<MainContentStructure>
			<HeaderDataTable
				isSearch
				placeholderText="Buscar por No. Cliente"
				onSearchChange={(value) => {
					setSearchTerm(value); // Actualiza el término de búsqueda
					setPage(0); // Reinicia la paginación al cambiar el término de búsqueda
				}}
			/>
			<br />
			<DataTable
				style={{ width: isMobile ? "90vw" : "calc(100vw - 320px)", fontSize: "13px" }}
				value={dataSegmentado || []}
				headerColumnGroup={headerGroup}
				tableStyle={{ minWidth: "290vw", maxHeight: "50px" }}
				showGridlines
				scrollable
				stripedRows
				size="small"
				paginator
				// rows={8}
				lazy
				rows={rowsPerPage}
				totalRecords={totalItems}
				first={page * rowsPerPage} // Índice inicial
				onPage={(e: any) => {
					setPage(e.page); // Actualiza la página
					setRowsPerPage(e.rows); // Actualiza el número de filas por página
				}}
				loading={isLoading}
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
			</DataTable>
		</MainContentStructure>
	);
};

const columns = [
	//
	{ nombre: "No.Cliente", campo: "codigo_cliente", widthColumn: "50px" },
	{ nombre: "Nombres", campo: "nombres", widthColumn: "50px" },
	{ nombre: "Apellidos", campo: "apellidos", widthColumn: "50px" },
	{ nombre: "Segmento Valor", campo: "segmento", widthColumn: "150px" },
	{
		nombre: "Ingreso Mensual (USD)",
		campo: "ingreso_mensual",
		widthColumn: "150px",
		body: (rowData: any) => {
			return <p>{formatMoney(rowData.ingreso_mensual)}</p>;
		},
	},
	// {
	// 	nombre: "Cuota Máxima Objetivo",
	// 	campo: "cuota_maxima_objetivo",
	// 	widthColumn: "130px",
	// 	body: (rowData: any) => {
	// 		return <p>{formatMoney(rowData.cuota_maxima_objetivo)}</p>;
	// 	},
	// },
	// {
	// 	nombre: "Endeudamiento Máximo Proyectado",
	// 	campo: "endeudamiento_maximo",
	// 	widthColumn: "130px",
	// 	body: (rowData: any) => {
	// 		return <p>{formatMoney(rowData.endeudamiento_maximo)}</p>;
	// 	},
	// },
	// {
	// 	nombre: "Captación Esperada",
	// 	campo: "captacion_esperada",
	// 	widthColumn: "130px",
	// 	body: (rowData: any) => {
	// 		return <p>{formatMoney(rowData.captacion_esperada)}</p>;
	// 	},
	// },
	// {
	// 	nombre: "Captaciones Vista Esperada",
	// 	campo: "captaciones_vista_esperada",
	// 	widthColumn: "130px",
	// 	body: (rowData: any) => {
	// 		return <p>{formatMoney(rowData.captaciones_vista_esperada)}</p>;
	// 	},
	// },
	// {
	// 	nombre: "Captaciones Deposito a Plazo Fijo Esperado",
	// 	campo: "captaciones_deposito_plazo_fijo",
	// 	widthColumn: "130px",
	// 	body: (rowData: any) => {
	// 		return <p>{formatMoney(rowData.captaciones_deposito_plazo_fijo)}</p>;
	// 	},
	// },
	// {
	// 	nombre: "Negocio Proyectado",
	// 	campo: "negocio_proyectado",
	// 	widthColumn: "130px",
	// 	body: (rowData: any) => {
	// 		return <p>{formatMoney(rowData.negocio_proyectado)}</p>;
	// 	},
	// },

	// Saldos Actuales Clientes
	{
		nombre: "Cartera Total",
		campo: "saldo_actual_cartera_total",
		widthColumn: "130px",
		body: (rowData: any) => {
			return <p>{formatMoney(rowData.saldo_actual_cartera_total)}</p>;
		},
	},
	{
		nombre: "Captaciones Vista",
		campo: "saldo_actual_captaciones_vista",
		widthColumn: "130px",
		body: (rowData: any) => {
			return <p>{formatMoney(rowData.saldo_actual_captaciones_vista)}</p>;
		},
	},
	{
		nombre: "Deposito a plazo fijo",
		campo: "saldo_actual_deposito_plazo_fijo",
		widthColumn: "130px",
		body: (rowData: any) => {
			return <p>{formatMoney(rowData.saldo_actual_deposito_plazo_fijo)}</p>;
		},
	},
	// {
	// 	nombre: "Negocio Real",
	// 	campo: "saldo_actual_negocio_real",
	// 	widthColumn: "130px",
	// 	body: (rowData: any) => {
	// 		return <p>{formatMoney(rowData.saldo_actual_negocio_real)}</p>;
	// 	},
	// },

	// // Ponderaciones
	// {
	// 	nombre: "Cartera Total",
	// 	campo: "ponderacion_cartera_total",
	// 	widthColumn: "100px",
	// 	body: (rowData: any) => {
	// 		return <p>{rowData.ponderacion_cartera_total * 100} %</p>;
	// 	},
	// },
	// {
	// 	nombre: "Captaciones Vista",
	// 	campo: "ponderacion_captaciones_vista",
	// 	widthColumn: "100px",
	// 	body: (rowData: any) => {
	// 		return <p>{rowData.ponderacion_captaciones_vista * 100} %</p>;
	// 	},
	// },
	// {
	// 	nombre: "Deposito a Plazo Fijo",
	// 	campo: "ponderacion_deposito_plazo_fijo",
	// 	widthColumn: "100px",
	// 	body: (rowData: any) => {
	// 		return <p>{rowData.ponderacion_deposito_plazo_fijo * 100} %</p>;
	// 	},
	// },

	// // Índice
	// {
	// 	nombre: "Negocio Ponderado",
	// 	campo: "indice_negocio_ponderado",
	// 	widthColumn: "100px",
	// 	body: (rowData: any) => {
	// 		return <p>{rowData.indice_negocio_ponderado * 100} %</p>;
	// 	},
	// },
	// {
	// 	nombre: "Real / Proyectado",
	// 	campo: "indice_real_proyectado",
	// 	widthColumn: "100px",
	// 	body: (rowData: any) => {
	// 		return <p>{rowData.indice_real_proyectado * 100} %</p>;
	// 	},
	// },

	// //Potencial de Crecimiento
	// - 1. Valores Positivos convertirlos en Ceros
	// - 2. Valores negativos convertirlos en Positivos
	{
		// nombre: "Dif. Cartera",
		nombre: "Potencial Crecimiento Cartera",
		campo: "diferencia_cartera",
		widthColumn: "130px",
		body: (rowData: any) => {
			// return <p>{formatMoney(rowData.diferencia_cartera)}</p>;
			const diferenciaCartera =
				rowData?.diferencia_cartera >= 0 ? 0 : +rowData?.diferencia_cartera * -1;
			return <p>{formatMoney(diferenciaCartera)}</p>;
		},
	},
	{
		// nombre: "Dif. Captaciones",
		nombre: "Potencial Crecimiento Captaciones",
		campo: "diferencia_captaciones",
		widthColumn: "130px",
		body: (rowData: any) => {
			// return <p>{formatMoney(rowData.diferencia_captaciones)}</p>;
			const diferenciaCaptaciones =
				rowData?.diferencia_captaciones >= 0 ? 0 : +rowData?.diferencia_captaciones * -1;
			return <p>{formatMoney(diferenciaCaptaciones)}</p>;
		},
	},

	// //Estrategia
	// {
	// 	nombre: "Profundizar Límite Superior ",
	// 	campo: "prof_limite_superior",
	// 	widthColumn: "130px",
	// 	body: (rowData: any) => {
	// 		return <p>{formatMoney(rowData.prof_limite_superior)}</p>;
	// 	},
	// },
	// {
	// 	nombre: "Mantener Límite Inferior",
	// 	campo: "man_limite_inferior",
	// 	widthColumn: "130px",
	// 	body: (rowData: any) => {
	// 		return <p>{formatMoney(rowData.man_limite_inferior)}</p>;
	// 	},
	// },
	// {
	// 	nombre: "Mantener Límite Superior",
	// 	campo: "man_limite_superior",
	// 	widthColumn: "130px",
	// 	body: (rowData: any) => {
	// 		return <p>{formatMoney(rowData.man_limite_superior)}</p>;
	// 	},
	// },
	// {
	// 	nombre: "Administrar Límite Inferior",
	// 	campo: "adm_limite_inferior",
	// 	widthColumn: "130px",
	// 	body: (rowData: any) => {
	// 		return <p>{formatMoney(rowData.adm_limite_inferior)}</p>;
	// 	},
	// },
	// {
	// 	nombre: "Límite Inferior Mantener",
	// 	campo: "lim_inf_mantener",
	// 	widthColumn: "130px",
	// 	body: (rowData: any) => {
	// 		return <p>{rowData.lim_inf_mantener * 100} %</p>;
	// 	},
	// },
	// {
	// 	nombre: "Límite Superior Mantener",
	// 	campo: "lim_sup_mantener",
	// 	widthColumn: "130px",
	// 	body: (rowData: any) => {
	// 		return <p>{rowData.lim_sup_mantener * 100} %</p>;
	// 	},
	// },
	// { nombre: "Estrategia Cliente", campo: "estrategia_cliente", widthColumn: "130px" },

	// Con Calificación de Riesgo
	{ nombre: "Riesgo", campo: "riesgo", widthColumn: "50px" },
	{
		nombre: "Calificación de Estrategia Cliente ",
		campo: "estrategia_cliente_riesgo",
		widthColumn: "200px",
	},

	// Cuadrante
	{ nombre: "Cuadrante", campo: "cuadrante", widthColumn: "50px" },
	{
		nombre: "V - A",
		campo: "VA",
		widthColumn: "60px",
		body: (rowData: any) => {
			const valor = rowData.cuadrante.split("-")[0];
			return `${valor}`;
		},
	},
	{
		nombre: "V - P",
		campo: "VP",
		widthColumn: "60px",
		body: (rowData: any) => {
			const valor = rowData.cuadrante.split("-")[1];
			return `${valor}`;
		},
	},

	// Tarjeta de Crédito
	// {
	// 	nombre: "Bisa Propia",
	// 	widthColumn: "100px",
	// 	body: (rowData: any) => {
	// 		return `${rowData.bisa_propia ? "X" : ""}`;
	// 	},
	// },
	// {
	// 	nombre: "Grupo Bisa / Bisa Internacional / Planilla",
	// 	widthColumn: "100px",
	// 	body: (rowData: any) => {
	// 		return `${rowData.grupo_bisa ? "X" : ""}`;
	// 	},
	// },
	{
		nombre: "Oro",
		widthColumn: "100px",
		body: (rowData: any) => {
			return `${rowData.oro == true ? "X" : ""}`;
		},
	},
	{
		nombre: "Signature",
		widthColumn: "100px",
		body: (rowData: any) => {
			return `${rowData.signature ? "X" : ""}`;
		},
	},
	{
		nombre: "Infinite",
		widthColumn: "100px",
		body: (rowData: any) => {
			return `${rowData.infinite ? "X" : ""}`;
		},
	},

	// Crédito Consumo
	{
		nombre: "Dependiente",
		campo: "Dependiente",
		widthColumn: "100px",
		body: (rowData: any) => {
			return `${rowData.dependiente ? "X" : ""}`;
		},
	},
	{
		nombre: "Preferencial",
		widthColumn: "100px",
		body: (rowData: any) => {
			return `${rowData.preferencial ? "X" : ""}`;
		},
	},

	// Hasta 2da Vivienda
	{
		nombre: "Hasta 80%, 30 Años",
		widthColumn: "100px",
		body: (rowData: any) => {
			return `${rowData.segunda_vivienda_80_30 ? "X" : ""}`;
		},
	},
	{
		nombre: "Hasta 80%, 25 Años",
		widthColumn: "100px",
		body: (rowData: any) => {
			return `${rowData.segunda_vivienda_80_25 ? "X" : ""}`;
		},
	},
	{
		nombre: "Hasta 70%, 20 Años",
		widthColumn: "100px",
		body: (rowData: any) => {
			return `${rowData.segunda_vivienda_70_20 ? "X" : ""}`;
		},
	},
	{
		nombre: "Hasta 70%, 15 Años",
		widthColumn: "100px",
		body: (rowData: any) => {
			return `${rowData.segunda_vivienda_70_15 ? "X" : ""}`;
		},
	},

	// Hasta 3era Vivienda
	{
		nombre: "Hasta 60%, 15 Años",
		widthColumn: "100px",
		body: (rowData: any) => {
			return `${rowData.tercera_vivienda_60_15 ? "X" : ""}`;
		},
	},

	// Crédito de Auto
	{
		nombre: "Nuevo",
		widthColumn: "100px",
		body: (rowData: any) => {
			return `${rowData.nuevo ? "X" : ""}`;
		},
	},
	{
		nombre: "Nuevo sin Garantía",
		widthColumn: "100px",
		body: (rowData: any) => {
			return `${rowData.nuevo_sin_garantia ? "X" : ""}`;
		},
	},
	{
		nombre: "Usado",
		widthColumn: "100px",
		body: (rowData: any) => {
			return `${rowData.usado ? "X" : ""}`;
		},
	},
	{
		nombre: "Moto bien de Lujo",
		widthColumn: "100px",
		body: (rowData: any) => {
			return `${rowData.moto_bien_lujo ? "X" : ""}`;
		},
	},
	{
		nombre: "Moto Medio de Transporte",
		widthColumn: "100px",
		body: (rowData: any) => {
			return `${rowData.moto_medio_transporte ? "X" : ""}`;
		},
	},
];
