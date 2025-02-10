import React from "react";
import { Calendar } from "primereact/calendar";
import { InputLabel } from "@mui/material";
import style from "./PrimeCalendar.module.css";
import { addLocale, locale } from "primereact/api";

const PrimeCalendar = ( { value, onChange, textLabel = "", width = "100%", addText = false, name = ""} ) => {
  // addLocale("es", {
  //   firstDayOfWeek: 1,
  //   dayNames: [
  //     "Domingo",
  //     "Lunes",
  //     "Martes",
  //     "Miércoles",
  //     "Jueves",
  //     "Viernes",
  //     "Sábado",
  //   ],
  //   dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
  //   dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
  //   monthNames: [
  //     "Enero",
  //     "Febrero",
  //     "Marzo",
  //     "Abril",
  //     "Mayo",
  //     "Junio",
  //     "Julio",
  //     "Agosto",
  //     "Septiembre",
  //     "Octubre",
  //     "Noviembre",
  //     "Diciembre",
  //   ],
  //   monthNamesShort: [
  //     "Ene",
  //     "Feb",
  //     "Mar",
  //     "Abr",
  //     "May",
  //     "Jun",
  //     "Jul",
  //     "Ago",
  //     "Sep",
  //     "Oct",
  //     "Nov",
  //     "Dic",
  //   ],
  //   today: "Hoy",
  //   clear: "Limpiar",
  // });

  // locale("es");

  return (
    <div className={style.column__item} style={{ width }}>
      { addText && <InputLabel> { textLabel } </InputLabel> }
      <Calendar value={value} onChange={onChange} showIcon locale="es" name={name}/>
    </div>
  );
};

export default PrimeCalendar;
