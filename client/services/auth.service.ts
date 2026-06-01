import { apiRequest } from "@/lib/api-client";
import { saveAuthToken } from "@/lib/auth";

export type LoginPayload = {
	email: string;
	password: string;
};

export type LoginResponse = {
	ok: boolean;
	message?: string;
	token?: string;
	user?: {
		email: string;
		role: string;
	};
};

export async function login(payload: LoginPayload): Promise<LoginResponse> {
	const data = await apiRequest<LoginResponse>("/auth/login", {
		method: "POST",
		body: JSON.stringify(payload),
	});

	if (data?.token) {
		saveAuthToken(data.token);
	}

	return data;
}
