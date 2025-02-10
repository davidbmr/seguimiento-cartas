import React from "react";
import style from "./ParametrizadorRangos.module.css";
//import { Button } from "primereact/button";
import { NumberBoxField } from "@/components/NumberBoxField/NumberBoxField";
import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";
import { TextBoxField } from "@/components/TextBoxField/TextBoxField";
import { useMobile } from "@/hooks/useMobile";

export const ParametrizadorRangos = () => {
	const { isMobile } = useMobile();
	return (
		<MainContentStructure titleText="Parametrizador de Rangos">
			<hr />
			{isMobile ? (
				<>
					<div className={style.column}>
						<div className={style.column_block}>Mínimo</div>

						{data.map((item, key) => (
							<div key={key} className={style.rowItems}>
								<div className={style.block} style={{ backgroundColor: item.color }} key={key}>
									{item.name}
								</div>

								<NumberBoxField
									name=""
									value={item.min}
									onChange={() => {}}
									direction="row"
									key={key}
								/>
							</div>
						))}
					</div>
					<div className={style.column}>
						<div className={style.column_block}>Máximo</div>
						{data.map((item, key) => (
							<div key={key} className={style.rowItems}>
								<div className={style.block} style={{ backgroundColor: item.color }} key={key}>
									{item.name}
								</div>
								<NumberBoxField
									name=""
									value={item.max}
									onChange={() => {}}
									direction="row"
									key={key}
								/>
							</div>
						))}
					</div>
					<div className={style.column}>
						<div className={style.column_block}>Capacitación Mínima Esperada</div>
						{data.map((item, key) => (
							<div key={key} className={style.rowItems}>
								<div className={style.block} style={{ backgroundColor: item.color }} key={key}>
									{item.name}
								</div>
								<TextBoxField
									name=""
									value={item.capMin}
									onChange={() => {}}
									direction="row"
									key={key}
								/>
							</div>
						))}
					</div>
					<div className={style.column}>
						<div className={style.column_block}>Share of Wallet</div>
						{data.map((item, key) => (
							<div key={key} className={style.rowItems}>
								<div className={style.block} style={{ backgroundColor: item.color }} key={key}>
									{item.name}
								</div>
								<TextBoxField
									name=""
									value={item.share}
									onChange={() => {}}
									direction="row"
									key={key}
								/>
							</div>
						))}
					</div>
					<div className={style.column}>
						<div className={style.column_block}>Capacidad de Endeudamiento Máximo</div>
						{data.map((item, key) => (
							<div key={key} className={style.rowItems}>
								<div className={style.block} style={{ backgroundColor: item.color }} key={key}>
									{item.name}
								</div>
								<TextBoxField
									name=""
									value={item.capEndMax}
									onChange={() => {}}
									direction="row"
									key={key}
								/>
							</div>
						))}
					</div>
					<div className={style.column}>
						<div className={style.column_block}>Plazo Máximo Endeudamiento por Mes</div>
						{data.map((item, key) => (
							<div key={key} className={style.rowItems}>
								<div className={style.block} style={{ backgroundColor: item.color }} key={key}>
									{item.name}
								</div>
								<TextBoxField
									name=""
									value={item.plazoMaxEnd}
									onChange={() => {}}
									direction="row"
									key={key}
								/>
							</div>
						))}
					</div>
					<div className={style.column}>
						<div className={style.column_block}>Gastos de Manutencion</div>
						{data.map((item, key) => (
							<div key={key} className={style.rowItems}>
								<div className={style.block} style={{ backgroundColor: item.color }} key={key}>
									{item.name}
								</div>
								<TextBoxField
									name=""
									value={item.manutencion}
									onChange={() => {}}
									direction="row"
									key={key}
								/>
							</div>
						))}
					</div>
				</>
			) : (
				<div className={style.body}>
					<div>
						<div className={style.column} style={{ gap: "20px" }}>
							<div style={{ width: "100px" }}></div>
							<div className={style.column}>
								<div className={style.column_block}>Mínimo</div>
								<div className={style.column_block}>Máximo</div>
								<div className={style.column_block}>Capacitación Mínima Esperada</div>
								<div className={style.column_block}>Share of Wallet</div>
								<div className={style.column_block}>Capacidad de Endeudamiento Máximo</div>
								<div className={style.column_block}>Plazo Máximo Endeudamiento por Mes</div>
								<div className={style.column_block}>Gastos de Manutencion</div>
							</div>
						</div>
						{data &&
							data.map((data, key) => (
								<div className={style.content} key={key}>
									<div className={style.block} style={{ backgroundColor: data.color }}>
										{data.name}
									</div>
									<div className={style.inputs}>
										<NumberBoxField name="" value={data.min} onChange={() => {}} direction="row" />
										<NumberBoxField name="" value={data.max} onChange={() => {}} direction="row" />
										<TextBoxField name="" value={data.capMin} onChange={() => {}} direction="row" />
										<TextBoxField name="" value={data.share} onChange={() => {}} direction="row" />
										<TextBoxField
											name=""
											value={data.capEndMax}
											onChange={() => {}}
											direction="row"
										/>
										<TextBoxField
											name=""
											value={data.plazoMaxEnd}
											onChange={() => {}}
											direction="row"
										/>
										<TextBoxField
											name=""
											value={data.manutencion}
											onChange={() => {}}
											direction="row"
										/>
									</div>
								</div>
							))}
					</div>
				</div>
			)}
			{/* <div className={style.button}>
				<Button>Guardar</Button>
			</div> */}
		</MainContentStructure>
	);
};
const data = [
	// {
	// 	min: "4305.16",
	// 	capMin: "4",
	// 	share: "45%",
	// 	capEndMax: "40%",
	// 	plazoMaxEnd: "240",
	// 	manutencion: "30%",
	// 	max: "",
	// 	name: "V.I.P.",
	// 	color: "#0ddb1e",
	// },
	{
		min: "0",
		max: "4450",
		capMin: "1",
		share: "100%",
		capEndMax: "15%",
		plazoMaxEnd: "48",
		manutencion: "48%",
		name: "Bajo",
		color: "#f21b1b",
	},
	{
		min: "4451",
		capMin: "1.5",
		share: "80%",
		capEndMax: "30%",
		plazoMaxEnd: "72",
		manutencion: "40%",
		max: "6860",
		name: "Medio",
		color: "#edd605",
	},
	{
		min: "6861",
		capMin: "2",
		share: "60%",
		capEndMax: "35%",
		plazoMaxEnd: "240",
		manutencion: "32%",
		max: "18000",
		name: "Medio - Alto",
		color: "#edd605",
	},
	{
		min: "18001",
		capMin: "4",
		share: "45%",
		capEndMax: "40%",
		plazoMaxEnd: "240",
		manutencion: "30%",
		max: "",
		name: "Alto",
		color: "#0ddb1e",
	},
];
