import React, { useEffect, useRef } from "react";

import { AppRoutes } from "./routes/AppRoutes";

import { addLocale, locale } from "primereact/api";
import { useAppDispatch, useAppSelector } from "./store/hooks";

import { clearToast } from "./store/slices/toast";
import { Toast } from "primereact/toast";
import { isLoading, refreshToken } from "./store/slices/auth";
import { checkTokenExpiry } from "./helpers/decodeToken";

export const App = () => {
	addLocale("es", {
		firstDayOfWeek: 1,
		dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
		dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
		dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
		monthNames: [
			"Enero",
			"Febrero",
			"Marzo",
			"Abril",
			"Mayo",
			"Junio",
			"Julio",
			"Agosto",
			"Septiembre",
			"Octubre",
			"Noviembre",
			"Diciembre",
		],
		monthNamesShort: [
			"Ene",
			"Feb",
			"Mar",
			"Abr",
			"May",
			"Jun",
			"Jul",
			"Ago",
			"Sep",
			"Oct",
			"Nov",
			"Dic",
		],
		today: "Hoy",
		clear: "Limpiar",
	});

	locale("es");

	const dispatch = useAppDispatch();
	const toast = useRef<Toast>(null);
	const { severity, summary, detail } = useAppSelector((state) => state.toast.toastConfig);
	useEffect(() => {
		if (summary) {
			toast?.current?.show({ severity, summary, detail, life: 5000 });
			dispatch(clearToast());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [severity, summary, detail]);

	// const dispatch = useAppDispatch();
	useEffect(() => {
		const tokenStorage = localStorage.getItem("rt__bisa");
		if (tokenStorage) {
			dispatch(refreshToken(tokenStorage));
		} else {
			dispatch(isLoading());
		}
	}, []);

	useEffect(() => {
		const token = localStorage.getItem("rt__bisa"); // Cambia según dónde almacenes tu token

		if (token) {
			const timeLeft = checkTokenExpiry(token);

			if (timeLeft === null) {
				console.error("No se pudo verificar el token.");
			} else if (timeLeft <= 0) {
				console.log("El token ha expirado. Necesitas renovar tu sesión.");
			} else {
				console.log(`Tiempo restante del token: ${timeLeft} segundos.`);
			}
		} else {
			console.log("No se encontró ningún token en localStorage.");
		}
	}, []);
	return (
		<>
			<Toast ref={toast} />
			<AppRoutes />
		</>
	);
};
