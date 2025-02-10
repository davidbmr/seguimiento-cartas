import React from "react";
import style from "./NumberBoxField.module.css";

import { InputNumber, InputNumberValueChangeEvent } from "primereact/inputnumber";

interface NumberBoxFieldProps {
	textLabel?: string;
	value: any;
	name: string;
	type?: string;
	direction?: "row" | "column";
	disabled?: boolean;
	labelWidth?: string;
	onChange: (e: InputNumberValueChangeEvent) => void;
}

export const NumberBoxField = ({
	textLabel,
	value,
	name,
	onChange,
	direction = "column",
	disabled = false,
	labelWidth = "100%",
}: NumberBoxFieldProps) => {
	const styles: React.CSSProperties = {
		width: labelWidth,
		fontSize: "15px",
	};
	return (
		<div
			className={`${style.item__group} ${
				direction === "column" ? style.item__column : style.item__row
			}`}
		>
			{textLabel ? <label style={styles}>{textLabel}</label> : <></>}

			<InputNumber
				className="p-inputtext-sm"
				value={value}
				name={name}
				onValueChange={onChange}
				minFractionDigits={2}
				maxFractionDigits={2}
				locale="es-BO"
				currency="BOB"
				mode="currency"
				disabled={disabled}
			/>

			{/* <InputText
				className="p-inputtext-sm"
				value={value}
				name={name}
				type={type}
				onChange={onChange}
				autoComplete="off"
				disabled={disabled}
			/> */}
		</div>
	);
};
