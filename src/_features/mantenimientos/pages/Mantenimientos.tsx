import React, { useEffect, useState } from "react";
import Logo from "../../../assets/LogoDefault.png";

export const Mantenimientos = () => {
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
		<>
			<div style={{ width: "100", height: "100%", display: "grid", placeItems: "center" }}>
				<img
					src={Logo}
					alt="logo"
					style={{ opacity: "0.1", width: isMobile ? "300px" : "500px", filter: "grayscale(1)" }}
				/>
			</div>
		</>
	);
};
