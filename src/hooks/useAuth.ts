import { useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { refreshToken, isLoading } from "../store/slices/auth";

export const useAuth = () => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		const tokenStorage = localStorage.getItem("rt__bisa");
		const TOKEN_EXPIRATION_TIME = 0.2 * 60 * 1000; // 15 minutos

		let refreshTokenInterval;

		const validateAndRefreshToken = async () => {
			if (tokenStorage) {
        console.log("se renovo token")
				try {
					dispatch(refreshToken(tokenStorage));
				} catch (error) {
					console.error("Error al renovar el token:", error);
					window.location.href = "/login";
				}
			} else {
				dispatch(isLoading());
			}
		};

		validateAndRefreshToken();

		refreshTokenInterval = setInterval(validateAndRefreshToken, TOKEN_EXPIRATION_TIME);

		return () => clearInterval(refreshTokenInterval);
	}, [dispatch]);
};
