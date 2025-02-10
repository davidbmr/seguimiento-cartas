import React, { useState } from "react";
import { DataTable } from "@/components/DataTable/DataTable";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";
import { Button } from "primereact/button";

const SolicitudesReuniones = () => {
  const [solicitudes, setSolicitudes] = useState([
    {
      id: 1,
      nombre: "María López",
      empresa: "Interbank",
      logo: "https://cdn.worldvectorlogo.com/logos/interbank-2.svg",
      fecha: "10/02/2025",
      hora: "10:30 AM",
      estado: "Pendiente",
    },
    {
      id: 2,
      nombre: "José Gutiérrez",
      empresa: "BBVA Perú",
      logo: "https://www.bbva.com/wp-content/uploads/2019/04/Logo-BBVA.jpg",
      fecha: "12/02/2025",
      hora: "03:00 PM",
      estado: "Pendiente",
    },
    {
      id: 3,
      nombre: "Elena Ramírez",
      empresa: "Latam Airlines",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Latam-logo_-v_%28Indigo%29.svg",
      fecha: "15/02/2025",
      hora: "11:00 AM",
      estado: "Pendiente",
    },
  ]);

  const actualizarEstado = (id: any, nuevoEstado: any) => {
    setSolicitudes((prev) =>
      prev.map((sol) => (sol.id === id ? { ...sol, estado: nuevoEstado } : sol))
    );
  };

  // Columnas de la tabla
  const columns = [
    {
      campo: "logo",
      nombre: "Empresa",
      body: (rowData: any) => (
        <img
          src={rowData.logo}
          alt={rowData.empresa}
          style={{ width: 50, height: 50, borderRadius: "5px" }}
        />
      ),
    },
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
      sortable:false,
      body: (rowData: any) =>
        rowData.estado === "Pendiente" ? (
          <div style={{ display: "flex", gap: "10px" }}>
            <Button
              className="p-button-success p-button-rounded"
              icon="pi pi-check"
              onClick={() => actualizarEstado(rowData.id, "Aceptada")}
            />
            <Button
              className="p-button-danger p-button-rounded"
              icon="pi pi-times"
              onClick={() => actualizarEstado(rowData.id, "Rechazada")}
            />
          </div>
        ) : (
          <span style={{ color: "#ccc" }}>-</span> // Muestra un guion en lugar de "false"
        ),
    },
  ];

  return (
    <MainContentStructure>
      <h2>Solicitudes de Reuniones</h2>

      {/* Tabla de Solicitudes */}
      <DataTable columns={columns} data={solicitudes} isHeaderActive={false} />
    </MainContentStructure>
  );
};

export default SolicitudesReuniones;
