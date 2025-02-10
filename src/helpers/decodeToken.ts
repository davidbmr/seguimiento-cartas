import { jwtDecode } from "jwt-decode";

// Define el tipo del payload del token
interface JwtPayload {
	exp: number; // Tiempo de expiración en formato UNIX
}

export const checkTokenExpiry = (token: string): number | null => {
	try {
		// Decodificar el token
		const decoded = jwtDecode<JwtPayload>(token);

		// Validar que `exp` exista
		if (!decoded.exp) {
			console.error("El token no contiene un campo de expiración (exp).");
			return null;
		}

		// Obtener el tiempo actual y la fecha de expiración del token
		const currentTime = Math.floor(Date.now() / 1000); // En segundos
		const expiryTime = decoded.exp;

		// Calcular el tiempo restante
		const timeLeft = expiryTime - currentTime;

		if (timeLeft > 0) {
			console.log(`El token expira en ${timeLeft} segundos (${Math.ceil(timeLeft / 60)} minutos).`);
		} else {
			console.log("El token ya ha expirado.");
		}

		return timeLeft; // Retornar el tiempo restante
	} catch (error) {
		console.error("Error al decodificar el token:", error instanceof Error ? error.message : error);
		return null;
	}
};
