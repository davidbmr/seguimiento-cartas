import React, { ChangeEvent } from "react";
import style from "./UploadField.module.css";

import { FileUpload } from "primereact/fileupload";

interface UploadFieldProps {
	textLabel?: string;
	value?: string | undefined;
	name?: string;
	type?: string;
	onUpload?: any;
	direction?: "row" | "column";
	disabled?: boolean;
	labelWidth?: string;
}

export const UploadField = ({
	textLabel,
	value,
	name,
	type = "text",
	onUpload,
	direction = "column",
	disabled = false,
	labelWidth = "100%",
}: UploadFieldProps) => {
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

			<FileUpload
				mode="basic"
				name="demo"
				url="/api/upload"
				accept=".pdf,.doc,.docx,.xls,.xlsx"
				maxFileSize={10000000} //10mb
				onUpload={() => console.log("Se subió")}
				chooseLabel="Carga tu documento"
			/>
		</div>
	);
};
