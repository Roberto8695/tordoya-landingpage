"use client";

import { useSyncExternalStore, useCallback } from "react";
import type { CountryId } from "@/data/country-data";

const STORAGE_KEY = "tordoya_country";
const COUNTRY_CHANGE_EVENT = "tordoya-country-change";

function getSnapshot(): CountryId | null {
	if (typeof window === "undefined") return null;
	return (window.localStorage.getItem(STORAGE_KEY) as CountryId | null) ?? null;
}

function subscribe(callback: () => void): () => void {
	const handler = () => callback();
	window.addEventListener(COUNTRY_CHANGE_EVENT, handler);
	window.addEventListener("storage", handler);
	return () => {
		window.removeEventListener(COUNTRY_CHANGE_EVENT, handler);
		window.removeEventListener("storage", handler);
	};
}

export function useCountry() {
	const country = useSyncExternalStore(subscribe, getSnapshot);

	const setCountry = useCallback((countryId: CountryId) => {
		window.localStorage.setItem(STORAGE_KEY, countryId);
		window.dispatchEvent(new CustomEvent(COUNTRY_CHANGE_EVENT, { detail: countryId }));
	}, []);

	return { country, setCountry };
}