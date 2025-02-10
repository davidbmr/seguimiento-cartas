import React, { useEffect, useState } from "react";
import style from "./AppRoutes.module.css";
import { AppStructure } from "@/components/AppStructure/AppStructure";
import { PanelAdmin } from "@/features/admin/PanelAdmin/PanelAdmin";
import { Navigate, Route, Routes } from "react-router-dom";
import { MainHeader } from "@/components/MainHeader/MainHeader";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { FiCalendar, FiFileText, FiHelpCircle, FiHome, FiUsers } from "react-icons/fi";

import { ReunionesPendientes } from "@/features/admin/features/ReunionesPendientes/ReunionesPendientes";

import { Dashboard } from "@/features/admin/features/Dashboard/Dashboard";

import { PerfilCliente } from "@/features/admin/features/ReunionesPendientes/layouts/PerfilCliente/PerfilCliente";
import { Empresas } from "@/features/mantenimientos/Empresas/Empresas";
import { Subtemas } from "@/features/mantenimientos/Subtemas/Subtemas";
import { Temas } from "@/features/mantenimientos/Temas/Temas";
import { EntidadesPublicas } from "@/features/mantenimientos/EntidadesPublicas/EntidadesPublicas";

export const AppRoutesAdmin = () => {
	const [isResponsiveMenu, setIsResponsiveMenu] = useState(false);
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 497);
	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 497);
		};

		setIsResponsiveMenu(window.innerWidth <= 497);
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const containerClassName = isResponsiveMenu
		? `${style.mainContent__container} ${style.containerWithMenu}`
		: style.mainContent__container;

	const setMenuResize = () => {
		setIsResponsiveMenu((prev) => !prev);
	};

	const sidebarItems = [
		{
			path: "/dashboard",
			sidebarProps: {
				displayText: "Dashboard",
				icon: <FiHome />,
			},
		},
		{
			path: "/listado-proyectos",
			sidebarProps: {
				displayText: "Listado de Proyectos",
				icon: <FiFileText />,
			},
		},
		{
			group: true,
			groupName: "Configuración",
			routes: [
				// {
				//   path: "/reuniones-confirmadas",
				//   sidebarProps: {
				// 	displayText: "Reuniones Confirmadas",
				// 	icon: <FiCalendar />,
				//   },
				// },
				{
					path: "/empresas",
					sidebarProps: {
						displayText: "Empresas",
						icon: <FiUsers />,
					},
				},
				{
					path: "/entidades-publicas",
					sidebarProps: {
						displayText: "Entidades Públicas",
						icon: <FiUsers />,
					},
				},
				{
					path: "/temas",
					sidebarProps: {
						displayText: "Temas",
						icon: <FiFileText />,
					},
				},
				{
					path: "/subtemas",
					sidebarProps: {
						displayText: "Subtemas",
						icon: <FiFileText />,
					},
				},
				// {
				// 	path: "/agenda",
				// 	sidebarProps: {
				// 		displayText: "Usuarios",
				// 		icon: <FiFileText />,
				// 	},
				// },
			],
		},

		// {
		//   path: "/soporte",
		//   sidebarProps: {
		// 	displayText: "Soporte y Capacitación",
		// 	icon: <FiHelpCircle />,
		//   },
		// },
	];

	return (
		<AppStructure>
			<div className={containerClassName}>
				<Sidebar
					appRoutes={sidebarItems}
					isResponsiveMenu={isResponsiveMenu}
					setResponsive={setMenuResize}
				/>
				<MainHeader
					additionalClassName={
						`${style.mainHeaderContainer} ` +
						`${isMobile && !isResponsiveMenu ? style.responsiveMenu : ""}`
					}
					setMenuResize={setMenuResize}
				/>
				<div
					className={
						`${style.routesContainer} ` +
						`${isMobile && !isResponsiveMenu ? style.responsiveMenu : ""}`
					}
				>
					<Routes>
						{/* <Route path="/*" element={<Navigate to="/" />} /> */}
						<Route path="/dashboard" element={<Dashboard />} />
						{/* <Route path="/reuniones-confirmadas" element={<ReunionesConfirmadas />} /> */}
						<Route path="/listado-proyectos" element={<ReunionesPendientes />} />
						<Route path="/proyecto" element={<PerfilCliente />} />

						<Route path="/gestion-encuentros" element={<ReunionesPendientes />} />

						<Route path="/empresas" element={<Empresas />} />
						<Route path="/entidades-publicas" element={<EntidadesPublicas />} />
						<Route path="/temas" element={<Temas />} />
						<Route path="/subtemas" element={<Subtemas />} />

						<Route path="/*" element={<Navigate to="/dashboard" />} />
					</Routes>
				</div>
			</div>
		</AppStructure>
	);
};
