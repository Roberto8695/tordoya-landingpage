import { API_BASE_URL } from "./constants";

export type ApiError = {
	message: string;
	status?: number;
};

async function parseJson(response: Response) {
	const text = await response.text();
	if (!text) {
		return null;
	}

	try {
		return JSON.parse(text);
	} catch {
		return null;
	}
}

export async function apiRequest<T>(
	path: string,
	options?: RequestInit,
): Promise<T> {
	const response = await fetch(`${API_BASE_URL}${path}`, {
		...options,
		headers: {
			"Content-Type": "application/json",
			...(options?.headers || {}),
		},
	});

	const data = await parseJson(response);

	if (!response.ok) {
		const message =
			data?.message || data?.error || "Ocurrio un error inesperado.";
		throw { message, status: response.status } as ApiError;
	}

	return data as T;
}
