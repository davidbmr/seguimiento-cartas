import { Role } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
	isLoading: boolean;
	login: {
		access_token: string;
		rol: Role;
		names?: any;
		last_names?: any;
	} | null;
}

const initialState: AuthState = {
	isLoading: true,
	login: null,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		isLoading: (state) => {
			state.isLoading = !state.isLoading;
		},
		setLogin: (state, action) => {
			state.login = action.payload;
			state.isLoading = false;
		},
		logout: (state) => {
			state.login = null;
		},
	},
});

export const { isLoading, setLogin, logout } = authSlice.actions;
