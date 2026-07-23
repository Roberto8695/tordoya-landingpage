"use client";

import { useState } from "react";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import SelectCountry from "@/components/SelectCountry";

export default function ChangeCountryButton() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<button
				type="button"
				onClick={() => setIsOpen(true)}
				className="fixed bottom-24 right-4 z-40 inline-flex items-center gap-2 rounded-full border border-white/15 bg-primary px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-secondary sm:right-6 sm:px-5"
				aria-label="Cambiar de país"
			>
				<HiOutlineGlobeAlt size={18} />
				<span>Cambiar de país</span>
			</button>
			<SelectCountry open={isOpen} onOpenChange={setIsOpen} />
		</>
	);
}