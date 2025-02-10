import React, { useState } from "react";
import { DataTable } from "@/components/DataTable/DataTable";
import { SelectField } from "@/components/SelectField/SelectField";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";

const participantes = [
  {
    id: 1,
    nombre: "Carlos Rodríguez",
    cargo: "Gerente de Operaciones",
    empresa: "Alicorp",
    logo: "https://www.alicorp.com.pe/images/logo-alicorp-header.svg",
    ciudad: "Lima",
    sector: "Consumo Masivo",
    interes: "Expansión en nuevos mercados",
  },
  {
    id: 2,
    nombre: "María López",
    cargo: "Directora de Innovación",
    empresa: "Interbank",
    logo: "https://cdn.worldvectorlogo.com/logos/interbank-2.svg",
    ciudad: "Arequipa",
    sector: "Banca",
    interes: "Innovación financiera",
  },
  {
    id: 3,
    nombre: "José Gutiérrez",
    cargo: "Director Financiero",
    empresa: "BBVA Perú",
    logo: "https://www.bbva.com/wp-content/uploads/2019/04/Logo-BBVA.jpg",
    ciudad: "Trujillo",
    sector: "Finanzas",
    interes: "Financiación de startups",
  },
  {
    id: 4,
    nombre: "Elena Ramírez",
    cargo: "Gerente de Alianzas Estratégicas",
    empresa: "Latam Airlines",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Latam-logo_-v_%28Indigo%29.svg",
    ciudad: "Cusco",
    sector: "Transporte Aéreo",
    interes: "Alianzas estratégicas",
  },
  {
    id: 5,
    nombre: "Fernando Vega",
    cargo: "CEO",
    empresa: "Rappi Perú",
    logo: "https://about.rappi.com/sites/default/files/styles/max_650x650/public/2023-07/logomarca_rappi.png?itok=ICkrbpOw",
    ciudad: "Lima",
    sector: "Tecnología / Delivery",
    interes: "Expansión en nuevas ciudades",
  },
];


const sectores = [{ name: "Todos", value: null }, ...["Consumo Masivo", "Banca", "Finanzas", "Transporte Aéreo", "Tecnología / Delivery"].map(s => ({ name: s, value: s }))];
const ciudades = [{ name: "Todas", value: null }, ...["Lima", "Arequipa", "Trujillo", "Cusco"].map(c => ({ name: c, value: c }))];

const Busqueda = () => {
  const [filterValues, setFilterValues] = useState({
    nombre: "",
    empresa: "",
    sector: undefined,
    ciudad: undefined,
    interes: "",
  });

 
  const handleFilterChange = (e:any) => {
    const { name, value } = e.target;
    setFilterValues((prev) => ({
      ...prev,
      [name]: value || undefined, 
    }));
  };


  const filteredData = participantes.filter((p) => {
    return (
      (!filterValues.nombre || p.nombre.toLowerCase().includes(filterValues.nombre.toLowerCase())) &&
      (!filterValues.empresa || p.empresa.toLowerCase().includes(filterValues.empresa.toLowerCase())) &&
      (!filterValues.sector || p.sector === filterValues.sector) &&
      (!filterValues.ciudad || p.ciudad === filterValues.ciudad) &&
      (!filterValues.interes || p.interes.toLowerCase().includes(filterValues.interes.toLowerCase()))
    );
  });


  const columns = [
    {
      campo: "logo",
      nombre: "Empresa",
      body: (rowData:any) => <img src={rowData.logo} alt="logo" style={{ width: 50, height: 50 }} />,
    },
    { campo: "nombre", nombre: "Nombre" },
    { campo: "cargo", nombre: "Cargo" },
    { campo: "empresa", nombre: "Empresa" },
    { campo: "ciudad", nombre: "Ciudad" },
    { campo: "sector", nombre: "Sector" },
    { campo: "interes", nombre: "Interés" },
  ];

  return (
    <MainContentStructure>
      <h2>Busqueda de Participantes</h2>

      {/* Filtros */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <TextBoxField
          textLabel="Nombre"
          name="nombre"
          value={filterValues.nombre}
          onChange={handleFilterChange}
        />
        <TextBoxField
          textLabel="Empresa"
          name="empresa"
          value={filterValues.empresa}
          onChange={handleFilterChange}
        />
        <SelectField
          textLabel="Sector"
          name="sector"
          value={filterValues.sector}
          onChange={handleFilterChange}
          options={sectores}
        />
        <SelectField
          textLabel="Ciudad"
          name="ciudad"
          value={filterValues.ciudad}
          onChange={handleFilterChange}
          options={ciudades}
        />
        <TextBoxField
          textLabel="Interés"
          name="interes"
          value={filterValues.interes}
          onChange={handleFilterChange}
        />
      </div>

      {/* Tabla */}
      <DataTable columns={columns} data={filteredData} isHeaderActive={false}/>
    </MainContentStructure>
  );
};

export default Busqueda;
