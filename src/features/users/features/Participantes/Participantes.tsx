import React, { useEffect, useRef, useState } from "react";
import styles from "./Participantes.module.css"; // Archivo CSS Module
import { DataTable, DataTableExpandedRows } from "primereact/datatable";
import { Column } from "primereact/column";
import {
	FaIndustry,
	FaHandshake,
	FaMapMarkerAlt,
	FaPhone,
	FaEnvelope,
	FaGlobe,
	FaUserTie,
	FaCertificate,
	FaFacebook,
	FaLinkedin,
	FaTwitter,
} from "react-icons/fa";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { SelectField } from "@/components/SelectField/SelectField";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { UploadField } from "@/components/UploadField/UploadField";

interface Participante {
	id: number;
	nombre: string;
	cargo: string;
	empresa: string;
	logo: string;
	pais: string;
	sector: string;
	interes: string;
	telefono: string;
	email: string;
	direccion: string;
	sitioWeb: string;
	experiencia: number;
	certificaciones: string[];
	redes: {
		linkedin?: string;
		twitter?: string;
		facebook?: string;
	};
	estado: string;
	colorEstado: string;
}

const sectores = [
	{ name: "Todos", value: null },
	...[
		"Consumo Masivo",
		"Banca",
		"Finanzas",
		"Transporte Aéreo",
		"Tecnología / Delivery",
		"Retail",
		"Energía",
		"Tecnología",
	].map((s) => ({ name: s, value: s })),
];

const ciudades = [
	{ name: "Todas", value: null },
	...["Lima", "Arequipa", "Trujillo", "Cusco", "San Isidro"].map((c) => ({ name: c, value: c })),
];
export const Participantes = () => {
	const [expandedRows, setExpandedRows] = useState<DataTableExpandedRows | undefined>(undefined);
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedParticipant, setSelectedParticipant] = useState<Participante | null>(null);
	const [modalidad, setModalidad] = useState<string | null>(null);
	const [hora, setHora] = useState("");
	const toast = useRef<Toast>(null);
	const placeholderImage = "https://placehold.co/600x400";
	const [filterValues, setFilterValues] = useState({
		nombre: "",
		empresa: "",
		sector: undefined,
		ciudad: undefined,
		interes: "",
	});

	const handleFilterChange = (e: any) => {
		const { name, value } = e.target;
		setFilterValues((prev) => ({
			...prev,
			[name]: value || undefined,
		}));
	};

	const participantes: any = [
		{
			id: 1,
			nombre: "RIP-BCP-CAR-ED09-0001",
			cargo: "Gerente de Operaciones",
			empresa: "Alicorp",
			logo: "https://www.alicorp.com.pe/images/logo-alicorp-header.svg",
			pais: "Perú",
			sector: "Consumo Masivo",
			interes: "Expansión en nuevos mercados",
			telefono: "+51 987 654 321",
			email: "carlos.rodriguez@alicorp.com",
			direccion: "Av. Primavera 123, Trujillo",
			sitioWeb: "https://www.alicorp.com.pe",
			experiencia: 15,
			certificaciones: ["MBA en Negocios", "ISO 9001"],
			redes: { linkedin: "https://linkedin.com/in/carlos-rodriguez" },
			requiereRpta: "Si",
			estado: "PENDIENTE",
			colorEstado: "green",
			asunto: "Presentación de Entregable Nº01",
			proyecto: "RIPCONCIV",
		},
		{
			id: 2,
			nombre: "RIP-BCP-CAR-ED09-0002",
			cargo: "Directora de Innovación",
			empresa: "Interbank",
			logo: "https://cdn.worldvectorlogo.com/logos/interbank-2.svg",
			pais: "Perú",
			sector: "Banca",
			interes: "Innovación financiera",
			telefono: "+51 975 332 678",
			email: "maria.lopez@interbank.com",
			direccion: "Av. Javier Prado 456, Lima",
			sitioWeb: "https://www.interbank.com.pe",
			experiencia: 12,
			certificaciones: ["Scrum Master", "Fintech Leadership"],
			redes: {
				linkedin: "https://linkedin.com/in/maria-lopez",
				twitter: "https://twitter.com/marialopez",
			},
			requiereRpta: "Si",
			estado: "VENCIDO",
			colorEstado: "blue",
			asunto: "Presentación de Director de Proyecto, Juan Carlos Torres",
			proyecto: "RIPCONCIV",
		},
	];

	const obtenerCiudadDesdeDireccion = (direccion: any) => {
		const partes = direccion.split(",");
		return partes[partes.length - 1].trim();
	};

	const filteredData = participantes.filter((p: any) => {
		return (
			(!filterValues.nombre ||
				p.nombre.toLowerCase().includes(filterValues.nombre.toLowerCase())) &&
			(!filterValues.empresa ||
				p.empresa.toLowerCase().includes(filterValues.empresa.toLowerCase())) &&
			(!filterValues.sector || p.sector === filterValues.sector) &&
			(!filterValues.ciudad || obtenerCiudadDesdeDireccion(p.direccion) === filterValues.ciudad) &&
			(!filterValues.interes ||
				p.interes.toLowerCase().includes(filterValues.interes.toLowerCase()))
		);
	});

	const openModal = (participante: Participante) => {
		setSelectedParticipant(participante);
		setModalidad(null);
		setHora("");
		setModalVisible(true);
	};

	const sendRequest = () => {
		setModalVisible(false);
		toast.current?.show({
			severity: "success",
			summary: "Solicitud enviada",
			detail: "Tu solicitud ha sido enviada con éxito",
			life: 3000,
		});
	};

	return (
		<MainContentStructure titleText="Listado de Cartas Pendientes">
			<Toast ref={toast} />

			<div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
				<TextBoxField
					textLabel="Código Interno"
					name="nombre"
					value={filterValues.nombre}
					onChange={handleFilterChange}
				/>
				<TextBoxField
					textLabel="Proyecto"
					name="empresa"
					value={filterValues.empresa}
					onChange={handleFilterChange}
				/>

				<SelectField
					textLabel="Estado"
					name="ciudad"
					value={filterValues.ciudad}
					onChange={handleFilterChange}
					options={[
						{
							id: 1,
							name: "PENDIENTE",
						},
						{
							id: 2,
							name: "VENCIDO",
						},
					]}
				/>
			</div>
			<DataTable
				value={filteredData}
				// expandedRows={expandedRows}
				// onRowToggle={(e: any) => setExpandedRows(e.data)}
				// rowExpansionTemplate={rowExpansionTemplate}
				dataKey="id"
				tableStyle={{ minWidth: "60rem" }}
			>
				<Column field="nombre" header="Código Interno" sortable />
				<Column field="proyecto" header="Proyecto" sortable />
				<Column field="asunto" header="Asunto" sortable />
				<Column field="requiereRpta" header="Requiere RPTA." sortable />
				<Column field="estado" header="Estado" sortable />
				<Column
					header=""
					body={(rowData: Participante) => (
						<Button
							label="Enviar Respuesta"
							icon="pi pi-send"
							className="p-button-sm p-button-primary"
							onClick={() => openModal(rowData)}
						/>
					)}
				/>
			</DataTable>

			<Dialog
				header="Enviar solicitud de reunión"
				visible={modalVisible}
				style={{ width: "30vw" }}
				onHide={() => setModalVisible(false)}
			>
				{selectedParticipant && (
					<div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
						<p>
							<strong>Código Interno:</strong> {selectedParticipant.nombre}
						</p>

						<div style={{ marginBottom: "15px" }}>
							<label>
								<strong>Comentario:</strong>
							</label>
							<InputText
								value={hora}
								onChange={(e) => setHora(e.target.value)}
								style={{ width: "100%" }}
							/>
						</div>

						<UploadField />

						<Button
							label="Enviar Respuesta"
							icon="pi pi-check"
							className="p-button-success"
							onClick={sendRequest}
							disabled={!hora}
						/>
					</div>
				)}
			</Dialog>
		</MainContentStructure>
	);
};
