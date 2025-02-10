import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";

import { Login } from "@/features/Login/Login";
import { AppRoutesAdmin } from "./AppRoutesAdmin";

import { AppRoutesUser } from "./AppRoutesUser";

export function AppRoutes() {
	const { login, isLoading } = useAppSelector((state) => state.auth);

	if (isLoading) {
		return <></>;
	}

	// USER, ADMIN

	return (
		<BrowserRouter>
			<Routes>
				{!login ? (
					<>
						<Route path="/login" element={<Login />} />
						<Route path="/*" element={<Navigate to="/login" />} />
					</>
				) : login.rol === "ADMIN" ? (
					<>
						<Route path="/login" element={<Navigate to="/" />} />
						<Route path="/*" element={<AppRoutesAdmin />} />
						<Route path="/*" element={<Navigate to="/" />} />
					</>
				) : (
					<>
						<Route path="/login" element={<Navigate to="/" />} />
						<Route path="/*" element={<AppRoutesUser />} />
						<Route path="/*" element={<Navigate to="/" />} />
					</>
				)}
			</Routes>
		</BrowserRouter>
	);
}
