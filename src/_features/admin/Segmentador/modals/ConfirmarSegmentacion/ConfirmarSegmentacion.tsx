import React from "react";
import style from "./ConfirmarSegmentacion.module.css";
import { Button } from "primereact/button";
import { ReadOnlyTextBoxField } from "@/components/ReadOnlyTextBoxField/ReadOnlyTextBoxField";

interface Props {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	data: any;
	onHideModal: () => void;
	handleChangeSegment: () => void;
}

export const ConfirmarSegmentacion = ({ onHideModal, handleChangeSegment, data }: Props) => {
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
					textLabel={"Tipo de Identificación:"}
					value={data.tipoIdentificacion}
				/>
				<ReadOnlyTextBoxField
					labelWidth="100px"
					direction="row"
					textLabel={"Número de Identificación:"}
					value={data.numeroIdentificacion}
				/>
				<ReadOnlyTextBoxField
					labelWidth="100px"
					direction="row"
					textLabel={"Nombres:"}
					value={data.nombres}
				/>

				<ReadOnlyTextBoxField
					labelWidth="100px"
					direction="row"
					textLabel={"Apellidos:"}
					value={data.apellidos}
				/>
				<ReadOnlyTextBoxField
					labelWidth="100px"
					direction="row"
					textLabel={"Ocupación:"}
					value={data.ocupacion}
				/>
			</div>
			<div className={style.inputs}>
				<ReadOnlyTextBoxField
					labelWidth="100px"
					direction="row"
					textLabel={"Ingresos:"}
					value={data.ingresos}
				/>
				<ReadOnlyTextBoxField
					labelWidth="100px"
					direction="row"
					textLabel={"Otros Ingresos:"}
					value={data.otrosIngresos}
				/>
				<ReadOnlyTextBoxField
					labelWidth="100px"
					direction="row"
					textLabel={"Gastos Financieros:"}
					value={data.gastosFinancieros}
				/>

				<ReadOnlyTextBoxField
					labelWidth="100px"
					direction="row"
					textLabel={"Gastos de Manutención:"}
					value={data.gastosMantenimiento}
				/>
			</div>
			<div className={style.buttons} style={{ display: "flex", gap: "20px", padding: "20px 0px 0px" }}>
				<Button className="p-button-sm p-button-info mr-2" onClick={onClick}>
					Aceptar
				</Button>
				<Button className="p-button-sm p-button mr-2" onClick={onHideModal}>
					Cancelar
				</Button>
			</div>
		</>
	);
};
