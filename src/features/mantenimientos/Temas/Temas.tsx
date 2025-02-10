import React, { useState } from "react";
import { DataTable } from "@/components/DataTable/DataTable";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { SelectField } from "@/components/SelectField/SelectField";
import styles from "./Temas.module.css";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";
import { useNavigate } from "react-router-dom";

export const Temas: React.FC = () => {
	const navigate = useNavigate();

	const handleClientRedirect = (rowData: number) => {
		navigate("/proyecto");
	};

	const [modalVisible, setModalVisible] = useState<boolean>(false);

	// Estado centralizado con formValues
	const [formValues, setFormValues] = useState({
		participante1: "",
		participante2: "",
		fecha: "",
		hora: "",
		duracion: "",
		modalidad: "",
	});

	// Lista de participantes interesados en reunirse
	const listadoProyectos: any = [
		{
			id: 1,
			nombre: "Tema A",
		},
		{
			id: 2,
			nombre: "Tema B",
		},
	];

	// Columnas de la tabla de interesados
	const columnsInteresados = [{ campo: "nombre", nombre: "Nombre" }];

	const handleInputChange = (name: string, value: string) => {
		setFormValues({ ...formValues, [name]: value });
	};

	const handleOpenModal = () => {
		setModalVisible(true);
	};

	// Resetear el formulario
	const resetForm = () => {
		setFormValues({
			participante1: "",
			participante2: "",
			fecha: "",
			hora: "",
			duracion: "",
			modalidad: "",
		});
	};

	return (
		<MainContentStructure titleText="Listado de Temas">
			<div className={styles.tableContainer}>
				<DataTable
					columns={columnsInteresados}
					data={listadoProyectos || []}
					textAddButton="Agregar Tema"
					// onAddModal={handleOpenModal}
				/>
			</div>

			<Dialog
				header="Nuevo Tema"
				visible={modalVisible}
				style={{ width: "40vw" }}
				onHide={() => setModalVisible(false)}
			>
				<div className={styles.modalContent}>
					<TextBoxField
						textLabel="Nombre del Proyecto"
						value={formValues.hora}
						name="hora"
						onChange={(e) => handleInputChange("hora", e.target.value)}
					/>
					<SelectField
						textLabel="Seleccionar Empresa"
						value={formValues.participante1}
						name="participante1"
						options={listadoProyectos.map((p: any) => ({
							label: p.nombre,
							value: p.nombre,
						}))}
						optionLabel="label"
						onChange={(e) => handleInputChange("participante1", e.value)}
					/>

					<SelectField
						textLabel="Seleccionar Entidad Pública"
						value={formValues.participante2}
						name="participant2"
						optionLabel="label"
						options={listadoProyectos
							.filter((p: any) => p.nombre !== formValues.participante1)
							.map((p: any) => ({ label: p.nombre, value: p.nombre }))}
						onChange={(e) => handleInputChange("participante2", e.value)}
					/>

					<Button
						label="Crear Proyecto"
						icon="pi pi-check"
						className="p-button-success"
						onClick={() => {}}
						disabled={!formValues.participante1 || !formValues.participante2}
					/>
				</div>
			</Dialog>

			<ConfirmDialog />
		</MainContentStructure>
	);
};
