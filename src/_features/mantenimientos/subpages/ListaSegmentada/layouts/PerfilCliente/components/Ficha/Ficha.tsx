import React from "react";
import style from "./Ficha.module.css";
import { ContentBox } from "@/components/ContentBox/ContentBox";
import { validateEntry } from "@/helpers/validateEntry";

interface Props {
	tipoDoc: string;
	documento: string;
	nombre: string;
	apellido: string;
	especialidad: string;
	edoCivil: string;
	residencia: string;
	ingresos: string;
}

export const Ficha = ({
	tipoDoc,
	documento,
	nombre,
	apellido,
	especialidad,
	edoCivil,
	residencia,
	ingresos,
}: Props) => {
	return (
		<ContentBox additionalClassName={style.fichaContadora__container}>
			<div className={style.container}>
				<div className={style.fichaContadora__data}>
					<p className={style.fichaContadora__title}>Detalle de prospecto</p>
					<div className={style.fichaContadora__fields__container}>
						<div className={style.fichaContadora__field}>
							<p className={style.fichaContadora__label}>Tipo de documento:</p>
							<p className={style.fichaContadora__text}>{tipoDoc}</p>
						</div>
						<div className={style.fichaContadora__field}>
							<p className={style.fichaContadora__label}>Nro. Documento:</p>
							<p className={style.fichaContadora__text}>{documento}</p>
						</div>
						<div className={style.fichaContadora__field}>
							<p className={style.fichaContadora__label}>Nombre:</p>
							<p className={style.fichaContadora__text}>{nombre}</p>
						</div>
						<div className={style.fichaContadora__field}>
							<p className={style.fichaContadora__label}>Apellido:</p>
							<p className={style.fichaContadora__text}>{apellido}</p>
						</div>

						<div className={style.fichaContadora__field}>
							<p className={style.fichaContadora__label}>Ocupación:</p>
							<p className={style.fichaContadora__text}>{especialidad}</p>
						</div>

						<div className={style.fichaContadora__field}>
							<p className={style.fichaContadora__label}>Residencia:</p>
							<p className={style.fichaContadora__text}>{residencia}</p>
						</div>
						<div className={style.fichaContadora__field}>
							<p className={style.fichaContadora__label}>Estado Civil:</p>
							<p className={style.fichaContadora__text}>{edoCivil}</p>
						</div>
					</div>
				</div>
				<div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
					<p style={{ fontSize: "20px" }}>Segmento</p>
					<div
						style={{
							padding: "5px 10px",
							textAlign: "center",
							borderRadius: "20px",
							background: `${validateEntry(ingresos).color}`,
							color: "#fff",
						}}
					>
						{validateEntry(ingresos).text}
					</div>
				</div>
			</div>
		</ContentBox>
	);
};
