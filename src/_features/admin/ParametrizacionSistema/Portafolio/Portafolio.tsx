import React from "react";
import style from "./Portfolio.module.css";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { useMobile } from "@/hooks/useMobile";
//import { Button } from "primereact/button";

export const Portafolio = () => {
	const { isMobile } = useMobile();
	return (
		<MainContentStructure titleText="Ponderación de portafolio según segmento">
			{isMobile ? (
				<>
					<div className={style.column}>
						<div className={style.column_block}>Total Cartera</div>

						{data.map((item, key) => (
							<div key={key} className={style.rowItems}>
								<div className={style.block} style={{ backgroundColor: item.color }} key={key}>
									{item.name}
								</div>

								<TextBoxField name="" value={item.Tcartera} onChange={() => {}} direction="row" />
							</div>
						))}
					</div>
					<div className={style.column}>
						<div className={style.column_block}>Total Capacitaciones Vista</div>

						{data.map((item, key) => (
							<div key={key} className={style.rowItems}>
								<div className={style.block} style={{ backgroundColor: item.color }} key={key}>
									{item.name}
								</div>

								<TextBoxField
									name=""
									value={item.TCapacitacionesVista}
									onChange={() => {}}
									direction="row"
								/>
							</div>
						))}
					</div>
					<div className={style.column}>
						<div className={style.column_block}>Total Capacitaciones Plazo</div>

						{data.map((item, key) => (
							<div key={key} className={style.rowItems}>
								<div className={style.block} style={{ backgroundColor: item.color }} key={key}>
									{item.name}
								</div>

								<TextBoxField
									name=""
									value={item.TCapacitacionesPlata}
									onChange={() => {}}
									direction="row"
								/>
							</div>
						))}
					</div>
					<div className={style.column}>
						<div className={style.column_block}>TOTAL</div>

						{data.map((item, key) => (
							<div key={key} className={style.rowItems}>
								<div className={style.block} style={{ backgroundColor: item.color }} key={key}>
									{item.name}
								</div>

								<TextBoxField name="" value={item.Total} onChange={() => {}} direction="row" />
							</div>
						))}
					</div>
				</>
			) : (
				<>
					<div className={style.body}>
						<div className={style.column} style={{ gap: "20px" }}>
							<div style={{ width: "100px" }}></div>
							<div className={style.column}>
								<div className={style.column_block}>Total Cartera</div>
								<div className={style.column_block}>Total Capacitaciones Vista</div>
								<div className={style.column_block}>Total Capacitaciones Plazo</div>
								<div className={style.column_block}>TOTAL</div>
							</div>
						</div>
					</div>
					<div>
						{data &&
							data.map((data, key) => (
								<div className={style.content} key={key}>
									<div className={style.block} style={{ backgroundColor: data.color }}>
										{data.name}
									</div>
									<div className={style.inputs}>
										<TextBoxField
											name=""
											value={data.Tcartera}
											onChange={() => {}}
											direction="row"
										/>
										<TextBoxField
											name=""
											value={data.TCapacitacionesVista}
											onChange={() => {}}
											direction="row"
										/>
										<TextBoxField
											name=""
											value={data.TCapacitacionesPlata}
											onChange={() => {}}
											direction="row"
										/>
										<TextBoxField
											name=""
											value={data.Total}
											onChange={() => {}}
											direction="row"
											disabled
										/>
									</div>
								</div>
							))}
					</div>
				</>
			)}

			{/* <div className={style.button}>
				<Button>Guardar</Button>
			</div> */}
		</MainContentStructure>
	);
};

const data = [
	{
		name: "Bajo",
		color: "#f21b1b",
		Tcartera: "95%",
		TCapacitacionesVista: "5%",
		TCapacitacionesPlata: "0%",
		Total: "100%",
	},
	{
		name: "Medio",
		color: "#edd605",
		Tcartera: "90%",
		TCapacitacionesVista: "10%",
		TCapacitacionesPlata: "0%",
		Total: "100%",
	},
	{
		name: "Medio - Alto",
		color: "#edd605",
		Tcartera: "75%",
		TCapacitacionesVista: "10%",
		TCapacitacionesPlata: "15%",
		Total: "100%",
	},
	{
		name: "Alto",
		color: "#0ddb1e",
		Tcartera: "60%",
		TCapacitacionesVista: "25%",
		TCapacitacionesPlata: "15%",
		Total: "100%",
	},
	// {
	// 	name: "V.I.P.",
	// 	color: "#0ddb1e",
	// 	Tcartera: "60%",
	// 	TCapacitacionesVista: "25%",
	// 	TCapacitacionesPlata: "15%",
	// 	Total: "100%",
	// },
];
