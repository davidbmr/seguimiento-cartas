import React from "react";
import style from "./Ficha.module.css";
import { ContentBox } from "@/components/ContentBox/ContentBox";

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

export const Ficha = ({ tipoDoc, documento, nombre }: Props) => {
	return (
		<ContentBox additionalClassName={style.fichaContadora__container}>
			<div className={style.container}>
				<div className={style.fichaContadora__data}>
					<div className={style.fichaContadora__fields__container}>
						<div className={style.fichaContadora__field}>
							<p className={style.fichaContadora__label}>Nombre del proyecto:</p>
							<p className={style.fichaContadora__text}>Estudio de Mecánica de Suelos</p>
						</div>
						<div className={style.fichaContadora__field}>
							<p className={style.fichaContadora__label}>Empresa:</p>
							<p className={style.fichaContadora__text}>RIPCONCIV</p>
						</div>
						<div className={style.fichaContadora__field}>
							<p className={style.fichaContadora__label}>Entidad Pública:</p>
							<p className={style.fichaContadora__text}>Gobierno Regional de Huancavelica</p>
						</div>
					</div>
				</div>
			</div>
		</ContentBox>
	);
};
