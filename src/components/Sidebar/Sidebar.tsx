/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import style from "./Sidebar.module.css";
import sidebarItemStyle from "./SidebarItem.module.css";
import { SidebarItem } from "./SidebarItem";

import imgLogo from "@/assets/LogoDefault.png";
import logoResponsive from "@/assets/Logo.png";
import { useAppDispatch } from "@/store/hooks";
import { logoutUser } from "@/store/slices/auth";
import { FiLogOut } from "react-icons/fi";

export const Sidebar = ({ appRoutes, isResponsiveMenu, setResponsive }: any) => {
	const dispatch = useAppDispatch();
	const containerClassName = isResponsiveMenu
		? `${style.container__drawer} ${style.responsiveMenu}`
		: style.container__drawer;

	const [isMobile, setIsMobile] = useState(window.innerWidth <= 497);
	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 497);
		};

		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);
	return (
		<div className={containerClassName}>
			{isMobile && (
				<div className={style.onClose} onClick={setResponsive}>
					X
				</div>
			)}
			<div className={style.logo__container}>
				<img src={isResponsiveMenu ? logoResponsive : imgLogo} className={style.logo__item} />
			</div>

			<div className={style.list__container}>
				{appRoutes.map((route: any, index: any) => {
					if (route.group) {
						return (
							<React.Fragment key={index}>
								{isResponsiveMenu ? null : (
									<>
										{index > 0 && <div className={style.whiteDivider} />}
										<div className={style.group}>
											<label>{route.groupName}</label>
										</div>
									</>
								)}
								{route.routes.map((childRoute: any, childIndex: any) => (
									<React.Fragment key={childIndex}>
										<SidebarItem
											item={childRoute}
											styles={sidebarItemStyle}
											isResponsive={isResponsiveMenu}
										/>
									</React.Fragment>
								))}
							</React.Fragment>
						);
					} else {
						return (
							<React.Fragment key={index}>
								<SidebarItem
									item={route}
									styles={sidebarItemStyle}
									isResponsive={isResponsiveMenu}
								/>
							</React.Fragment>
						);
					}
				})}
			</div>

			<div
				className={style.container__button}
				style={{
					padding: "20px",
					width: "100%",
					display: "flex",
					justifyContent: "center",
					position: "absolute",
					top: "90vh",
				}}
			>
				<button
					style={{
						background: "var(--primary-color-app)",
						color: "#fff",
						padding: "10px 20px",
						border: "none",
						borderRadius: "5px",
						width: "100%",
						cursor: "pointer",
					}}
					onClick={() => dispatch(logoutUser())}
				>
					{isResponsiveMenu ? <FiLogOut /> : "Cerrar sesión"}
				</button>
			</div>
		</div>
	);
};
