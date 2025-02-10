import React from "react";
import style from "./ReadOnlyTextBoxField.module.css";
import { InputText } from "primereact/inputtext";
import { useMobile } from "@/hooks/useMobile";

interface ReadOnlyTextBoxFieldProps {
	textLabel: string;
	value: string | undefined;
	name?: string;
	type?: string;
	direction?: "row" | "column";
	labelWidth?: string;
	containerStyle?: React.CSSProperties;
	labelWrap?: string;
	maxLength?: number | undefined;
	minLength?: number | undefined;
	toUpperCase?: boolean;
	containerWidth?: string;
	placeholder?: string;
}

export const ReadOnlyTextBoxField = ({
	textLabel,
	value,
	name,
	type = "text",
	direction = "column",
	labelWidth = "100%",
	labelWrap,
	maxLength,
	minLength = 0,
	toUpperCase = true,
	containerWidth = "100%",
	placeholder = "",
}: ReadOnlyTextBoxFieldProps) => {
	const { isMobile } = useMobile();
	const labelWidthResponsive = isMobile ? "30vh" : labelWidth;
	const styles: React.CSSProperties = {
		width: labelWidthResponsive,
		fontSize: "12px",
		whiteSpace: labelWrap,
	};
	const stylesContainer: React.CSSProperties = {
		width: containerWidth,
	};
	const inputWidth = isMobile ? "30vh" : "100%";
	return (
		<div
			className={`${style.item__group} ${
				direction === "column" ? style.item__column : style.item__row
			}`}
			style={stylesContainer}
		>
			{textLabel ? <label style={styles}>{textLabel}</label> : <></>}

			<InputText
				className="p-inputtext-sm"
				value={value}
				name={name}
				type={type}
				autoComplete="off"
				readOnly={true}
				style={{
					width: inputWidth,
					height: "30px",
					textTransform: `${toUpperCase ? "uppercase" : "none"}`,
					border: "none", // Sin borde
					backgroundColor: "transparent", // Para asegurar que no tenga fondo visible
				}}
				maxLength={maxLength}
				minLength={minLength}
				placeholder={placeholder}
			/>
		</div>
	);
};
