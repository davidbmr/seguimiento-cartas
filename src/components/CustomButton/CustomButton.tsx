import React from "react";
import style from "./CustomButton.module.css";

interface CustomButtonProps {
	icon?: React.ReactNode;
	text: string;
	shortcut?: string;
	backgroundButton?: string;
	height?: string;
	colorP?: string;
	sizeP?: string;
	onClick?: () => void;
}

export const CustomButton = ({
	icon,
	text,
	shortcut,
	backgroundButton = "#eceff1",
	height = "auto",
	colorP = "black",
	sizeP,
	onClick,
}: CustomButtonProps) => {
	const styles: React.CSSProperties = {
		background: backgroundButton,
		height: height,
		color: colorP,
	};
	const stylesP: React.CSSProperties = {
		color: colorP,
		fontSize: sizeP,
	};

	return (
		<div className={style.button__action} style={styles} onClick={onClick}>
			{icon}
			<p className={style.button__text} style={stylesP}>
				{text} {shortcut ? `[${shortcut}]` : null}
			</p>
		</div>
	);
};
