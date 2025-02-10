import React from "react";
import styles from "./ProgressSpinner.module.css";
import { ProgressSpinner } from "primereact/progressspinner";
import { CSSProperties } from "styled-components";

interface ProgressSpinnerProps {
	duration?: string;
	style?: CSSProperties;
}
export const ProgressSpinnerComp = ({ duration, style }: ProgressSpinnerProps) => {
	return (
		<div className={styles.body}>
			<ProgressSpinner animationDuration={duration} style={style} />
			<p>Cargando...</p>
		</div>
	);
};
