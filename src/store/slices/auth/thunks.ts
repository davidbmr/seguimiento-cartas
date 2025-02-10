import { AppThunk } from "../../store";
import { authApi } from "../../../connections";
import { isLoading, setLogin } from "./authSlice";
import { setToast } from "../toast";
import data from "./data/userMocked.json";

interface PayloadProps {
	email: string;
	password: string;
}

export const getUser = (payload: PayloadProps): AppThunk => {
	return async (dispatch) => {
		try {
			const Auth = data.filter((item) => {
				return item ? item.email === payload.email : undefined;
			});
			localStorage.setItem("rt__mvp", "dummyToken");
			dispatch(setLogin({ token: "dummyToken", rol: Auth[0].Rol }));
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			if (error?.request?.status === 401) {
				dispatch(
					setToast({
						severity: "error",
						summary: "Credenciales Invalidas: " + error?.request?.status,
						detail: "Usuario o contraseñas invalidas.",
					})
				);
			}
			console.log(error);
		}
	};
};

// export const getUser = (payload: any): AppThunk => {
// 	return async (dispatch) => {
// 		try {
// 			if (payload?.email === "oficial@gmail.com") {
// 				dispatch(setRole("oficial"));
// 			}

// 			if (payload?.email === "cliente@gmail.com") {
// 				dispatch(setRole("cliente"));
// 			}

// 			if (payload?.email === "contadora@gmail.com") {
// 				dispatch(setRole("contadora"));
// 			}
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	};
// };

export const refreshToken = (payload: string): AppThunk => {
	return async (dispatch) => {
		try {
			const { data } = await authApi.post(`/refresh_token`, { refresh_token: payload });
			// -- Devolver todo el login cuando se haga refresh token.
			localStorage.setItem("rt__bisa", data.access_token);
			dispatch(setLogin(data));
		} catch (error) {
			console.log(error);
			localStorage.removeItem("rt__bisa");
			dispatch(setLogin(null));
			dispatch(isLoading());
		}
	};
};

export const logoutUser = (): AppThunk => {
	return (dispatch) => {
		localStorage.removeItem("rt__bisa");
		dispatch(setLogin(null));
	};
};
