import React, { useState } from "react";
import styles from "./Login.module.css";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { CustomButton } from "@/components/CustomButton/CustomButton";
// import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { getUser } from "@/store/slices/auth";
import logo from "@/assets/LogoDefault.png";

export const Login = () => {
	// const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const [user, setUser] = useState({
		email: "",
		password: "",
	});

	const handleLogin = () => {
		dispatch(getUser(user));
	};
	return (
		<>
			<div className={styles.loginContainer}>
				<div className={styles.overlayContainer}>
					<div className={styles.overlay}>
						{/* <p className={styles.overlay__text}>
						Rueda de <br /> Negocios
						</p> */}
					</div>
				</div>

				<div className={`${styles.form__container__layout}`}>
					<div className={`${styles.form__container}`}>
						<div
							style={{
								width: "250px",
								margin: "0 auto",
							}}
						>
							<img
								src={logo}
								alt="logo de la empresa"
								style={{ width: "100%", height: "auto", objectFit: "cover" }}
							/>
						</div>

						<p className={styles.form__title}>Iniciar sesión</p>
						<TextBoxField
							textLabel="Correo:"
							value={user.email}
							name={"email"}
							onChange={(e) => setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
							isUpperCase={false}
						/>
						<TextBoxField
							textLabel="Contraseña:"
							value={user.password}
							name={"password"}
							onChange={(e) => setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
							type="password"
							isUpperCase={false}
						/>

						<CustomButton
							text="INGRESAR"
							backgroundButton="var(--primary-color-app)"
							colorP="#fff"
							onClick={handleLogin}
							
						/>
					</div>
				</div>
			</div>
		</>
	);
};
