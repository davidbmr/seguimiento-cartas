export const validateEntry = (e: string) => {
	const value = parseInt(e);
	switch (value !== 0) {
		case value <= 4450:
			return { color: "#f21b1b", text: "BAJO" };
		case value <= 6860:
			return { color: "#edd605", text: "MEDIO" };
		case value <= 18000:
			return { color: "#edd605", text: "MEDIO-ALTO" };
		case value > 18001:
			return { color: "#0ddb1e", text: "ALTO" };
		// case value > 30000:
		// 	return { color: "#0ddb1e", text: "V.I.P" };
		default:
			return { color: "#b5b5b5", text: "No Registra" };
	}
};

// -Bajo: Ingresos hasta Bs 4.450
// -Medio: Ingresos desde Bs 4.451 hasta 6.930
// -Medio Alto: Desde Bs 6.931 hasta Bs 20.790
// -Alto: Ingresos superiores a Bs 20.791

// ultimo update:
// Bajo: Ingresos hasta Bs 4.450
// Medio: Ingresos desde Bs 4.451 hasta 6.860
// Medio Alto: Desde Bs 6.861 hasta Bs 18.000
// Alto: Ingresos superiores a Bs 18.001