import React, { useEffect, useState } from "react";
import axios from "axios";

import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";
import { CustomButton } from "@/components/CustomButton/CustomButton";

import { PrimeModal } from "@/primeComponents/PrimeModal/PrimeModal";
import { useModal } from "@/hooks/useModal";
import { DateField } from "@/components/DateField/DateField";
import { ProgressSpinnerComp } from "@/components/ProgressSpinner/ProgressSpinnerComp";
import { url } from "@/connections/mainApi";

export const SegmentadorMasivo = () => {
	const addModal = useModal();
	const [isLoading, setIsLoading] = useState(false);

	const onLoader = async () => {
		setIsLoading(true);

		try {
			await axios.post(`${url}/segmentacion`);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (isLoading) {
			setTimeout(() => {
				setIsLoading(!isLoading);
				alert("Proceso de segmentación masiva completado");
			}, 5000);
		}
	}, [isLoading]);

	if (isLoading) {
		return <ProgressSpinnerComp duration="5s" />;
	}
	return (
		<>
			<MainContentStructure titleText="Segmentador Masivo">
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "1fr 1fr",
						gap: "20px",
						paddingTop: "15px",
					}}
				>
					<CustomButton
						text={"Segmentación masiva"}
						backgroundButton="var(--primary-color-app)"
						colorP="#fff"
						onClick={onLoader}
					/>

					<CustomButton
						text={"Segmentación clientes nuevos"}
						backgroundButton="var(--primary-color-app)"
						colorP="#fff"
						onClick={addModal.onVisibleModal}
					/>
				</div>
			</MainContentStructure>
			<PrimeModal
				header={"Seleccionar Período"}
				onHideModal={addModal.onHideModal}
				modalStatus={addModal.modalStatus}
				width={430}
			>
				<div>
					<div style={{ display: "flex", gap: "5px" }}>
						<DateField textLabel="Desde:" type="mes" />
						<DateField textLabel="Hasta:" type="mes" />
					</div>
					<div
						style={{ display: "flex", justifyContent: "start", width: "200px", paddingTop: "20px" }}
					>
						<CustomButton
							text={"Continuar"}
							backgroundButton="var(--primary-color-app)"
							colorP="#fff"
							onClick={onLoader}
						/>
					</div>
				</div>
			</PrimeModal>
		</>
	);
};
