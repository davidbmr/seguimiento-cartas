import React from "react";
import styles from "./MiPerfil.module.css"; // Archivo CSS Module
import { FaEdit, FaCamera, FaIndustry, FaMapMarkerAlt, FaPhone, FaEnvelope, FaGlobe, FaUserTie, FaCertificate, FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { CustomButton } from "@/components/CustomButton/CustomButton";
import { FiEdit } from "react-icons/fi";

const MiPerfil = () => {
  const usuario = {
    nombre: "Carlos Rodríguez",
    cargo: "Gerente de Operaciones",
    empresa: "Alicorp",
    logoEmpresa: "https://www.alicorp.com.pe/images/logo-alicorp-header.svg",
    fotoPerfil: "https://placehold.co/150x150", // Placeholder para foto de perfil
    ciudad: "Lima, Perú",
    telefono: "+51 987 654 321",
    email: "carlos.rodriguez@alicorp.com",
    sitioWeb: "https://www.alicorp.com.pe",
    experiencia: 15,
    certificaciones: ["MBA en Negocios", "ISO 9001"],
    redes: {
      linkedin: "https://linkedin.com/in/carlos-rodriguez",
      twitter: "https://twitter.com/carlosrodriguez",
      facebook: "https://facebook.com/carlosrodriguez",
    },
  };

  return (
    <div className={styles.perfilContainer}>
      {/* Sección de Perfil */}
      <div className={styles.perfilCard}>
        <div className={styles.fotoContainer}>
          <img src={usuario.fotoPerfil} alt="Foto de Perfil" className={styles.fotoPerfil} />
          
        </div>
        <h2>{usuario.nombre} </h2>
        <p><FaUserTie className={styles.icon} /> {usuario.cargo}</p>
        <p><FaMapMarkerAlt className={styles.icon} /> {usuario.ciudad}</p>
        <p><FaPhone className={styles.icon} /> {usuario.telefono}</p>
        <p><FaEnvelope className={styles.icon} /> {usuario.email}</p>
        <p><FaGlobe className={styles.icon} /> <a href={usuario.sitioWeb} target="_blank" rel="noopener noreferrer">{usuario.sitioWeb}</a></p>
      </div>

      {/* Sección de Empresa */}
      {/* <div className={styles.empresaCard}>
        <h3>Empresa</h3>
        <img src={usuario.logoEmpresa} alt={usuario.empresa} className={styles.logoEmpresa} />
      
      </div> */}

      {/* Sección de Certificaciones */}
      <div className={styles.certificacionesCard}>
        <h3>Certificaciones</h3>
        <ul>
          {usuario.certificaciones.map((cert, index) => (
            <li key={index}><FaCertificate className={styles.icon} /> {cert}</li>
          ))}
        </ul>
      </div>

      {/* Sección de Redes Sociales */}
      <div className={styles.redesCard}>
        <h3>Redes Sociales</h3>
        <div className={styles.redesLinks}>
          {usuario.redes.linkedin && <a href={usuario.redes.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin className={styles.icon} /></a>}
          {usuario.redes.twitter && <a href={usuario.redes.twitter} target="_blank" rel="noopener noreferrer"><FaTwitter className={styles.icon} /></a>}
          {usuario.redes.facebook && <a href={usuario.redes.facebook} target="_blank" rel="noopener noreferrer"><FaFacebook className={styles.icon} /></a>}
        </div>
      </div>

      <CustomButton text="Editar Perfil" icon={<FiEdit/>}/>
    </div>
  );
};

export default MiPerfil;
