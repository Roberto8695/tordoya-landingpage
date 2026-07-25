export type CountryId = "mexico" | "peru" | "bolivia";

export interface CountryContact {
	address: string;
	phone: string;
	email: string;
	whatsapp: string;
}

export const COUNTRY_CONTACTS: Record<CountryId, CountryContact> = {
	mexico: {
		address:
			"Av. Río Mixcoac 39, esq. Calle Ceres, CP 03940, Col. Crédito Constructor, Benito Juárez, CDMX.",
		phone: "+52 1 55 4715 7971",
		email: "mexico@ultrasonidodiagnosticotordoya.com",
		whatsapp: "5215547157971",
	},
	peru: {
		address: "Av. Principal 123, San Isidro, Lima, Perú.",
		phone: "+51 900 944 014",
		email: "peru@ultrasonidodiagnosticotordoya.com",
		whatsapp: "51900944014",
	},
	bolivia: {
		address: "Calle Potosí 456, Zona Central, La Paz, Bolivia.",
		phone: "+591 (Pendiente)",
		email: "bolivia@ultrasonidodiagnosticotordoya.com",
		whatsapp: "",
	},
};