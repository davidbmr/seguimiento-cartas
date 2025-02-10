import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

//import { IoPersonOutline, IoLogOutOutline } from "react-icons/io5";
//import { logoutUser } from "../../store/slices/auth/thunks";
import { Toast } from "primereact/toast";
import { IoPerson } from "react-icons/io5";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

import style from "./MainHeader.module.css";

import { useAppSelector } from "@/store/hooks";

interface MainHeaderProps {
	additionalClassName?: string;
	setMenuResize?: () => void;
}

export const MainHeader = ({ additionalClassName, setMenuResize }: MainHeaderProps) => {
	//const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const toast = useRef(null);
	const { login } = useAppSelector((state) => state.auth);
	//const [menuActive, setMenuActive] = useState(false);

	/*const handleNavigate = (path: string) => {
		navigate(`/${path}`);
		setMenuActive(false);
	};

	const handleLogout = () => {
		dispatch(logoutUser());
		navigate("/login");
	};*/

	const containerClassName = `${style.mainHeader__container} ${additionalClassName || ""}`;

	return (
		<header className={containerClassName}>
			<Toast ref={toast} />
			<div>
				<div onClick={setMenuResize} className={style.button}>
					<HiOutlineMenuAlt2 size={30} />
				</div>
			</div>

			<div
				className={style.mainHeader__navbar__container}
				onClick={() => navigate("/")}
				style={{ cursor: "pointer" }}
			>
				<div style={{ position: "relative", display: "flex", alignItems: "center", gap: "10px" }}>
					{/* <div className={style.mainHeader__profile} onClick={() => setMenuActive((prev) => !prev)}>
						<IoPerson />
					</div> */}
					<p style={{ textTransform: "uppercase" }}>
						{login?.names || ""} {login?.last_names || ""}
					</p>
					<div className={style.mainHeader__profile}>
						<IoPerson />
					</div>
					{/* {menuActive && (
						<div className={style.profileMenu}>
							<ul className={style.profileMenu__list}>
								<li className={style.profileMenu__item} onClick={() => handleNavigate("/")}>
									<IoPersonOutline size={20} /> Mis Datos
								</li>
								<li className={style.profileMenu__item} onClick={handleLogout}>
									<IoLogOutOutline size={20} /> Cerrar Sesión
								</li>
							</ul>
						</div>
					)} */}
				</div>
			</div>
		</header>
	);
};
