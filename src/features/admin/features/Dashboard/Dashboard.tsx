import React from "react";
import styles from "./Dashboard.module.css"; // Archivo CSS Module
import { SectionStructure } from "@/components/SectionStructure/SectionStructure";
import { Chart } from "primereact/chart";
import {
	FaUserCheck,
	FaUserTimes,
	FaUsers,
	FaCalendarCheck,
	FaClock,
	FaIndustry,
	FaHandshake,
} from "react-icons/fa";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";

export const Dashboard = () => {
	const fechaActual = new Date();

	const opcionesMes: Intl.DateTimeFormatOptions = { month: "long" };

	const evento = {
		fecha: fechaActual.getDate(),
		mes: new Intl.DateTimeFormat("es-ES", opcionesMes).format(fechaActual),
		año: fechaActual.getFullYear(),
		nombre: `Rueda de Negocios Lima ${fechaActual.getFullYear()}`,
		ubicacion: "Lima, Perú",
		inscritos: 250,
		cupos: 300,
		reunionesConfirmadas: 120,
		reunionesPendientes: 80,
	};

	// 🔹 Datos para los gráficos
	const inscripcionesData = {
		labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"],
		datasets: [
			{
				label: "Inscripciones",
				data: [30, 50, 70, 90, 120, 250],
				backgroundColor: "rgba(75, 192, 192, 0.5)",
				borderColor: "rgba(75, 192, 192, 1)",
				borderWidth: 2,
			},
		],
	};

	const reunionesData = {
		labels: ["Confirmadas", "Pendientes"],
		datasets: [
			{
				data: [evento.reunionesConfirmadas, evento.reunionesPendientes],
				backgroundColor: ["#2ecc71", "#e74c3c"],
			},
		],
	};

	return (
		<MainContentStructure>
			{/* Grid para la información clave */}
			Dashboard en desarrollo
		</MainContentStructure>
	);
};
