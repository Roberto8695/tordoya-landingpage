import { AUTH_TOKEN_KEY } from "./constants";
import { getStorageItem, removeStorageItem, setStorageItem } from "./storage";

export function saveAuthToken(token: string): void {
	setStorageItem(AUTH_TOKEN_KEY, token);
}

export function getAuthToken(): string | null {
	return getStorageItem(AUTH_TOKEN_KEY);
}

export function clearAuthToken(): void {
	removeStorageItem(AUTH_TOKEN_KEY);
}
