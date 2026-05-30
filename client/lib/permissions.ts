export type UserRole = "ADMIN" | "EDITOR" | string;

export function canAccessAdmin(role: UserRole): boolean {
	return role === "ADMIN";
}
