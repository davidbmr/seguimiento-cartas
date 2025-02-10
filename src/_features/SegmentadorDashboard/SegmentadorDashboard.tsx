import React, { useEffect, useState } from "react";
import style from "./SegmentadorDashboard.module.css";
import axios from "axios";
import { url } from "@/connections/mainApi";

import { Chart } from "primereact/chart";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";

import { ContentBox } from "@/components/ContentBox/ContentBox";
import { options } from "./data/getData";
import { useAppSelector } from "@/store/hooks";

export const SegmentadorDashboard = () => {
	const { login } = useAppSelector((state) => state.auth);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [dashboardData, setDashboardData] = useState<any>({});
	const [chartData, setChartData] = useState({
		labels: ["Bajo", "Medio", "Medio - alto", "Alto"],
		datasets: [
			{
				label: "Clientes segmentados",
				data: [0, 0, 0, 0],
				backgroundColor: [
					"rgba(255, 159, 64, 0.2)",
					"rgba(75, 192, 192, 0.2)",
					"rgba(54, 162, 235, 0.2)",
					"rgba(153, 102, 255, 0.2)",
				],
				borderColor: [
					"rgb(255, 159, 64)",
					"rgb(75, 192, 192)",
					"rgb(54, 162, 235)",
					"rgb(153, 102, 255)",
				],
				borderWidth: 1,
			},
		],
	});

	useEffect(() => {
		const fetchDashboard = async () => {
			try {
				const response = await axios.get(`${url}/segmentacion/dashboard/bi`, {
					headers: {
						Authorization: `Bearer ${login?.access_token}`,
					},
				});
				const data = response.data;
				setDashboardData(data);
				setChartData({
					labels: ["Bajo", "Medio", "Medio - alto", "Alto"],
					datasets: [
						{
							label: "Clientes segmentados",
							data: [
								data.clientesBajo || 0,
								data.clientesMedio || 0,
								data.clientesMedioAlto || 0,
								data.clientesAlto || 0,
							],
							backgroundColor: [
								"rgba(255, 159, 64, 0.2)",
								"rgba(75, 192, 192, 0.2)",
								"rgba(54, 162, 235, 0.2)",
								"rgba(153, 102, 255, 0.2)",
							],
							borderColor: [
								"rgb(255, 159, 64)",
								"rgb(75, 192, 192)",
								"rgb(54, 162, 235)",
								"rgb(153, 102, 255)",
							],
							borderWidth: 1,
						},
					],
				});
			} catch (error) {
				console.error("Error al obtener la información del dashboard:", error);
			}
		};

		fetchDashboard();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<MainContentStructure titleText="Dashboard">
				<div className={style.dashboard__container}>
					<div className={style.item}>
						<p className={style.item__title}>
							Total de clientes segmentados: {dashboardData?.totalClientes || ""}
						</p>
					</div>
					{/* <div className={style.item}>
						<p className={style.item__title}>Clientes segmentados por trimestre:</p>
						<p className={style.item__text}>625</p>
					</div> */}
				</div>

				<br />
				<div className={style.dashboard__graficos}>
					<ContentBox>
						<Chart type="bar" data={chartData} options={options} />
					</ContentBox>

					<ContentBox>
						<Chart type="pie" data={chartData} options={options} className="w-full md:w-30rem" />
					</ContentBox>
				</div>
			</MainContentStructure>
		</>
	);
};
