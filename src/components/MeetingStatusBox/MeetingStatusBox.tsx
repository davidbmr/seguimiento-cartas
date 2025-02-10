import React from "react";
import { ContentBox } from "../ContentBox/ContentBox";
import style from "./MeetingStatusBox.module.css";

interface Props {
  status: string;
}

export const MeetingStatusBox = ({ status = "pendiente" }: Props) => {
  return (
    <>
      {status === "activa" && (
        <ContentBox
          additionalClassName={`${style.reunionProgramada__container} ${style.reunionProgramada__activa}`}
        >
          <div className={style.reunionProgramada__item}>
            <p>Actualmente tu reunión se encuentra programada</p>
            <p>|</p>
            <p>Día: 03/12/23</p>
            <p>|</p>
            <p>Hora: 15:00</p>
          </div>

          <div className={style.reunionProgramada__item}>
            <p>
              Enlace:{" "}
              <a
                className={style.reunionProgramada__item__link}
                href="https://www.google.com.pe"
                target="_blank"
              >
                www.zoom.com/url
              </a>
            </p>
          </div>
        </ContentBox>
      )}

      {status === "pendiente" && (
        <ContentBox
          additionalClassName={`${style.reunionProgramada__container} ${style.reunionProgramada__pendiente}`}
        >
          <div className={style.reunionProgramada__item}>
            <p>No se ha programado una reunión con tu contadora.</p>
          </div>
        </ContentBox>
      )}

      {status === "cancelada" && (
        <ContentBox
          additionalClassName={`${style.reunionProgramada__container} ${style.reunionProgramada__cancelada}`}
        >
          <div className={style.reunionProgramada__item}>
            <p>
              No se ha podido realizar la reunión, reprograma
              una nueva fecha con tu contadora.
            </p>
          </div>
        </ContentBox>
      )}
    </>
  );
};
