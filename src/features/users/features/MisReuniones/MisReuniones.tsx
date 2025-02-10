import React, { useState } from "react";
import { DataTable } from "@/components/DataTable/DataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";
import { Button } from "primereact/button";
import { FaVideo } from "react-icons/fa";

const MisReuniones = () => {
  const [reuniones, setReuniones] = useState([
    {
      id: 1,
      participante: "María López",
      empresa: "Interbank",
      logo: "https://cdn.worldvectorlogo.com/logos/interbank-2.svg",
      fecha: "10/02/2025",
      hora: "10:30 AM",
      modalidad: "Virtual",
      zoomLink: "https://zoom.us/j/123456789",
      estado: "Confirmada",
    },
    {
      id: 2,
      participante: "José Gutiérrez",
      empresa: "BBVA Perú",
      logo: "https://www.bbva.com/wp-content/uploads/2019/04/Logo-BBVA.jpg",
      fecha: "12/02/2025",
      hora: "03:00 PM",
      modalidad: "Presencial",
      estado: "Confirmada",
    },
    {
      id: 3,
      participante: "Elena Ramírez",
      empresa: "Latam Airlines",
      logo: "https://app.zoom.us/wc/74905401445/start?fromPWA=1&pwd=x7rBgO2bXRUx3gg27QXVvzfuL8up03.1",
      fecha: "15/02/2025",
      hora: "11:00 AM",
      modalidad: "Virtual",
      zoomLink:
        "https://app.zoom.us/wc/74905401445/start?fromPWA=1&pwd=x7rBgO2bXRUx3gg27QXVvzfuL8up03.1",
      estado: "Confirmada",
    },
  ]);

  const [solicitudes, setSolicitudes] = useState([
    {
      id: 1,
      nombre: "Carlos Rodríguez",
      empresa: "Alicorp",
      logo: "https://www.alicorp.com.pe/images/logo-alicorp-header.svg",
      fecha: "18/02/2025",
      hora: "02:00 PM",
      estado: "Pendiente",
      modalidad: "Presencial",
    },
    {
      id: 2,
      nombre: "Ana García",
      empresa: "Google Perú",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
      fecha: "20/02/2025",
      hora: "09:00 AM",
      estado: "Pendiente",
      modalidad: "Virtual",
      zoomLink:
        "https://us04web.zoom.us/j/74905401445?pwd=x7rBgO2bXRUx3gg27QXVvzfuL8up03.1",
    },
  ]);

  const aceptarReunion = (id: number) => {
    setSolicitudes((prev) =>
      prev.map((sol) => (sol.id === id ? { ...sol, estado: "Aceptada" } : sol))
    );

    const solicitudAceptada = solicitudes.find((sol) => sol.id === id);
    if (solicitudAceptada) {
      setReuniones((prev: any) => [
        ...prev,
        {
          id: solicitudAceptada.id,
          participante: solicitudAceptada.nombre,
          empresa: solicitudAceptada.empresa,
          logo: solicitudAceptada.logo,
          fecha: solicitudAceptada.fecha,
          hora: solicitudAceptada.hora,
          modalidad: solicitudAceptada.modalidad,
          zoomLink: solicitudAceptada.zoomLink || null,
          estado: "Confirmada",
        },
      ]);
    }
  };

  const rechazarReunion = (id: number) => {
    setSolicitudes((prev) =>
      prev.map((sol) => (sol.id === id ? { ...sol, estado: "Rechazada" } : sol))
    );
  };

  const reunionesColumns = [
    { campo: "participante", nombre: "Participante" },
    { campo: "empresa", nombre: "Empresa" },
    { campo: "fecha", nombre: "Fecha" },
    { campo: "hora", nombre: "Hora" },
    { campo: "modalidad", nombre: "Modalidad" },
    {
      campo: "estado",
      nombre: "Estado",
      body: (rowData: any) => (
        <span
          style={{
            padding: "5px 10px",
            borderRadius: "5px",
            color: "#fff",
            backgroundColor:
              rowData.estado === "Pendiente"
                ? "orange"
                : rowData.estado === "Confirmada"
                ? "green"
                : "red",
          }}
        >
          {rowData.estado}
        </span>
      ),
    },
    {
      campo: "acciones",
      nombre: "",
      sortable: false,
      body: (rowData: any) =>
        rowData.modalidad === "Virtual" && rowData.zoomLink ? (
          <Button
            className="p-button-info p-button-rounded"
            icon={<FaVideo />}
            onClick={() => window.open(rowData.zoomLink, "_blank")}
          />
        ) : (
          <span style={{ color: "#ccc" }}>-</span>
        ),
    },
  ];

  const solicitudesColumns = [
    { campo: "nombre", nombre: "Nombre" },
    { campo: "empresa", nombre: "Empresa" },
    { campo: "fecha", nombre: "Fecha" },
    { campo: "hora", nombre: "Hora" },
    {
      campo: "estado",
      nombre: "Estado",
      body: (rowData: any) => (
        <span
          style={{
            padding: "5px 10px",
            borderRadius: "5px",
            color: "#fff",
            backgroundColor:
              rowData.estado === "Pendiente"
                ? "orange"
                : rowData.estado === "Aceptada"
                ? "green"
                : "red",
          }}
        >
          {rowData.estado}
        </span>
      ),
    },
    {
      campo: "acciones",
      nombre: "",
      sortable: false,
      body: (rowData: any) =>
        rowData.estado === "Pendiente" ? (
          <div style={{ display: "flex", gap: "10px" }}>
            <Button
              className="p-button-success p-button-rounded"
              icon="pi pi-check"
              onClick={() => aceptarReunion(rowData.id)}
            />
            <Button
              className="p-button-danger p-button-rounded"
              icon="pi pi-times"
              onClick={() => rechazarReunion(rowData.id)}
            />
          </div>
        ) : (
          <span style={{ color: "#ccc" }}>-</span>
        ),
    },
  ];

  return (
    <MainContentStructure>
      <h2>Mis Reuniones</h2>
      <DataTable
        columns={reunionesColumns}
        data={reuniones}
        isHeaderActive={false}
      />

      <h2 style={{ marginTop: "40px" }}>Solicitudes de Reuniones</h2>
      <DataTable
        columns={solicitudesColumns}
        data={solicitudes}
        isHeaderActive={false}
      />
    </MainContentStructure>
  );
};

export default MisReuniones;
