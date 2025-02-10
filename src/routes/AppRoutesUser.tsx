import React, { useEffect, useState } from "react";
import style from "./AppRoutes.module.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { PanelUser } from "@/features/users/PanelUser/PanelUser";
import { AppStructure } from "@/components/AppStructure/AppStructure";
import { MainHeader } from "@/components/MainHeader/MainHeader";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { FiCalendar, FiCheckCircle, FiSearch, FiUser, FiUsers } from "react-icons/fi";
import { Participantes } from "@/features/users/features/Participantes/Participantes";
import Busqueda from "@/features/users/features/Busqueda/Busqueda";
import SolicitudesReuniones from "@/features/users/features/SolicitudesReuniones/SolicitudesReuniones";
import MisReuniones from "@/features/users/features/MisReuniones/MisReuniones";
import MiPerfil from "@/features/users/features/MiPerfil/MiPerfil";

export const AppRoutesUser = () => {
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
			path: "/",
			sidebarProps: {
				displayText: "Listado de Cartas",
				icon: <FiUsers />,
			},
		},
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
						<Route path="/" element={<Participantes />} />
						<Route path="/participantes" element={<Participantes />} />

						<Route path="/solicitudes-reuniones" element={<SolicitudesReuniones />} />
						<Route path="/mis-reuniones" element={<MisReuniones />} />
						<Route path="/mi-perfil" element={<MiPerfil />} />
						<Route path="/*" element={<Navigate to="/busqueda" />} />
					</Routes>
				</div>
			</div>
		</AppStructure>
	);
};
