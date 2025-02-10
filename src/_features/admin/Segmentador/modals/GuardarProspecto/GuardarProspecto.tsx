import React from "react";
import style from "./GuardarProspecto.module.css";
import { Button } from "primereact/button";
import { ReadOnlyTextBoxField } from "@/components/ReadOnlyTextBoxField/ReadOnlyTextBoxField";

interface Props {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	data: any;
	onHideModal: () => void;
	handleChangeSegment: () => void;
}

export const GuardarProspecto = ({ onHideModal, handleChangeSegment, data }: Props) => {
	const onClick = () => {
		handleChangeSegment();
		onHideModal();
	};
	return (
		<>
			<div className={style.inputs}>
				<ReadOnlyTextBoxField
					labelWidth="100px"
					direction="row"
					textLabel={"Número de Telefono:"}
					value={data.telefono}
				/>
				<ReadOnlyTextBoxField
					labelWidth="100px"
					direction="row"
					textLabel={"Número de Telefono laboral:"}
					value={data.telefonoTrabajo}
				/>
				<ReadOnlyTextBoxField
					labelWidth="100px"
					direction="row"
					toUpperCase={false}
					textLabel={"Email:"}
					value={data.email}
				/>
				<ReadOnlyTextBoxField
					labelWidth="100px"
					direction="row"
					textLabel={"Estado Civil:"}
					value={data.estadoCivil}
				/>
				<ReadOnlyTextBoxField
					labelWidth="100px"
					direction="row"
					textLabel={"Residencia:"}
					value={data.residencia}
				/>
			</div>
			<div style={{ display: "flex", gap: "20px", padding: "20px 0px 0px" }}>
				<Button className="p-button-sm p-button-info mr-2" onClick={onClick}>
					Guardar
				</Button>
				<Button className="p-button-sm p-button mr-2" onClick={onHideModal}>
					Cancelar
				</Button>
			</div>
		</>
	);
};
