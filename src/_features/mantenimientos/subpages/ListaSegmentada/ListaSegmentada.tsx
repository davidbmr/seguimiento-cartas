/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import style from "./ListaSegmentada.module.css";
import { DataTable } from "@/components/DataTable/DataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";
import axios from "axios";
import { url } from "@/connections/mainApi";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import { formatDateTime } from "@/helpers/formatDate";
import * as XLSX from "xlsx";

export const ListaSegmentada = () => {
	const navigate = useNavigate();
	const { login } = useAppSelector((state) => state.auth);

	const handleClientRedirect = (rowData: number) => {
		navigate("/lista-segmentada/" + rowData);
	};
	const [listData, setListData] = useState<any>([]);

	useEffect(() => {
		const getList = async () => {
			const result = await axios.get(`${url}/prospecto`, {
				headers: {
					Authorization: `Bearer ${login?.access_token}`,
				},
			});
			if (result) {
				setListData(result?.data);
			}
		};
		getList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Función para exportar a Excel
	const exportToExcel = () => {
		// Convertir datos a formato plano si es necesario
		const formattedData = listData.map((item: any) => ({
			NumeroIdentificacion: item.numeroIdentificacion,
			Nombres: item.nombres,
			Apellidos: item.apellidos,
			"Fecha de Segmentación": formatDateTime(item.fechaCreacion),
		}));

		// Crear una hoja de trabajo
		const worksheet = XLSX.utils.json_to_sheet(formattedData);

		// Crear un libro de trabajo
		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, "Prospectos");

		// Exportar a un archivo Excel
		XLSX.writeFile(workbook, "Prospectos-segmentados.xlsx");
	};

	return (
		<>
			<MainContentStructure titleText="Lista prospectos segmentados">
				<div className={style.responsive__datatable}>
					<DataTable
						columns={columns}
						data={listData}
						isSearch={false}
						onEye={handleClientRedirect}
						isHeaderActive={login?.rol == "ADMIN" ? true : false}
						isExport={login?.rol == "ADMIN" ? exportToExcel : false}
					/>
				</div>
			</MainContentStructure>
		</>
	);
};

const columns = [
	{ nombre: "N. Identificación", campo: "numeroIdentificacion" },
	{ nombre: "Nombres", campo: "nombres" },
	{ nombre: "Apellidos", campo: "apellidos" },
	{
		nombre: "Fecha de segmentación",
		campo: "fechaCreacion",
		body: (rowData: any) => {
			return <p>{formatDateTime(rowData.fechaCreacion)}</p>;
		},
	},
];

// const data = [
// 	{
// 		name: "Janeth",
// 		fatherSurname: "Peves Ramirez",
// 		documentNumber: "67777777",
// 		date: "01/11/24",
// 	},
// ];
