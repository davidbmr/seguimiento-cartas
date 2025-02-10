/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import style from "./Dashboard.module.css";
import { Chart } from "primereact/chart";

import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";
import { ContentBox } from "@/components/ContentBox/ContentBox";
import { options } from "./data/getData";
import { url } from "@/connections/mainApi";
import axios from "axios";
import { useAppSelector } from "@/store/hooks";

export function Dashboard() {
	const { login } = useAppSelector((state) => state.auth);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [dashboardData, setDashboardData] = useState<any>({});
	const [chartData, setChartData] = useState({
		labels: ["Bajo", "Medio", "Medio - alto", "Alto"],
		datasets: [
			{
				label: "Prospectos segmentados",
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
				const response = await axios.get(`${url}/prospecto/dashboard/oficial`, {
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
							label: "Prospectos segmentados",
							data: [
								data.prospectoBajo || 0,
								data.prospectoMedio || 0,
								data.prospectoMedioAlto || 0,
								data.prospectoAlto || 0,
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
	}, []);

	return (
		<MainContentStructure titleText="Dashboard">
			<div className={style.dashboard__container}>
				<div className={style.item}>
					<p className={style.item__title}>
						Prospectos segmentados en el día: {dashboardData?.totalProspecto || ""}
					</p>
				</div>
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
	);
}

/* <div className={style.item}>
					<p className={style.item__title}>Prospectos segmentados en el mes</p>
					<p className={style.item__text}>321</p>
				</div> */

/* <div className={style.item}>
					<p className={style.item__title}>Registros realizados</p>
					<p className={style.item__text}>55</p>
				</div> */
