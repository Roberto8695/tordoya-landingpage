"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import useDetectCountry from "../hooks/useDetectCountry";

type CountryOption = {
	id: "mexico" | "bolivia" | "peru";
	name: string;
	flagSrc: string;
};

const countryOptions: CountryOption[] = [
	{ id: "mexico", name: "Mexico", flagSrc: "/image/mexico.png" },
	{ id: "bolivia", name: "Bolivia", flagSrc: "/image/bolivia.png" },
	{ id: "peru", name: "Peru", flagSrc: "/image/peru.png" },
];

export default function SelectCountry() {
	const [isOpen, setIsOpen] = useState(true);
	const [selectedCountry, setSelectedCountry] = useState<CountryOption["id"] | null>(null);
	const [highlightedCountry, setHighlightedCountry] = useState<CountryOption["id"] | null>(null);
	const detectedCountry = useDetectCountry();

	useEffect(() => {
		if (!isOpen) {
			document.body.style.overflow = "";
			return;
		}

		document.body.style.overflow = "hidden";

		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	const handleSelectCountry = (countryId: CountryOption["id"]) => {
		setSelectedCountry(countryId);
		setIsOpen(false);
	};

	useEffect(() => {
		if (detectedCountry) {
			setHighlightedCountry(detectedCountry);
		}
	}, [detectedCountry]);

	if (!isOpen) {
		return null;
	}

	return (
		<div className="fixed inset-0 z-100 flex items-center justify-center bg-primary/70 px-4 backdrop-blur-sm">
			<div className="w-full max-w-xl rounded-3xl border border-white/20 bg-white p-6 shadow-2xl sm:p-8">
				<div className="text-center">
					<p className="text-xs font-semibold uppercase tracking-[0.25em] text-secondary/80">
						Bienvenido
					</p>
					<h2 className="mt-2 text-3xl font-bold text-primary sm:text-4xl">
						Selecciona tu pais
					</h2>
					<p className="mt-3 text-sm text-foreground/65 sm:text-base">
						Accede a los servicios de tu sede más cercana
					</p>
				</div>

				<div className="mt-8 grid gap-3">
					{countryOptions.map((country) => {
						const isSelected = selectedCountry === country.id;
						const isHighlighted = highlightedCountry === country.id;

						return (
							<button
								key={country.id}
								type="button"
								onClick={() => handleSelectCountry(country.id)}
								className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3.5 text-left transition-all duration-200 sm:px-5 ${
									isSelected
										? "border-accent bg-accent/10"
										: isHighlighted
										? "border-accent/40 bg-accent/6 ring-2 ring-accent/20"
										: "border-primary/15 bg-white hover:border-secondary/40 hover:bg-secondary/5"
								}`}
								aria-label={`Seleccionar ${country.name}`}>
								<div className="flex items-center gap-3">
									<span className="overflow-hidden rounded-sm border border-primary/10 shadow-sm" aria-hidden="true">
										<Image
											src={country.flagSrc}
											alt={`Bandera de ${country.name}`}
											width={40}
											height={28}
											className="h-7 w-10 object-cover"
										/>
									</span>
									<span className="text-base font-semibold text-primary sm:text-lg">
										{country.name}
									</span>
									{isHighlighted && !isSelected && (
										<span className="ml-3 inline-flex items-center rounded-full bg-accent/10 px-2 py-1 text-xs font-medium text-accent">
											Detectado
										</span>
									)}
								</div>

								<span className="rounded-full bg-primary/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
									Entrar
								</span>
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
}
