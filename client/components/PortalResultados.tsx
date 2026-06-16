"use client";

import { useEffect, useState } from "react";
import { FaLock } from "react-icons/fa";

export default function PortalResultados() {
	const [folioInput, setFolioInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState("");
	const [messageType, setMessageType] = useState<"success" | "error" | "">("");
	const [activeIndicator, setActiveIndicator] = useState(0);

	useEffect(() => {
		const interval = window.setInterval(() => {
			setActiveIndicator((prev) => (prev + 1) % 3);
		}, 6000);

		return () => window.clearInterval(interval);
	}, []);

	const handleVerResultados = async (e: React.FormEvent) => {
		e.preventDefault();
		
		if (!folioInput.trim()) {
			setMessageType("error");
			setMessage("Por favor ingresa un número de folio válido");
			setTimeout(() => setMessage(""), 5000);
			return;
		}

		setIsLoading(true);
		
		// Simular búsqueda de resultados
		setTimeout(() => {
			setIsLoading(false);
			// Aquí iría la redirección real a tu portal
			window.open(`https://tuportal.com/resultados?folio=${folioInput}`, "_blank");
			setMessageType("success");
			setMessage("¡Redirigiendo a tus resultados...");
			setFolioInput("");
			setTimeout(() => setMessage(""), 3000);
		}, 1500);
	};

	const handleWhatsApp = () => {
		const telefono = "573001234567"; // Reemplaza con tu número
		const mensaje = encodeURIComponent(
			`Hola, me gustaría solicitar mis resultados médicos. Mi número de folio es: ${folioInput || "[No especificado]"}`
		);
		window.open(`https://wa.me/${telefono}?text=${mensaje}`, "_blank");
	};

	return (
		<section
			id="resultados"
			className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,var(--color-primary)_0%,#09429a_48%,#0d5ab8_100%)] py-16 text-white sm:py-20 lg:py-24"
		>
			{/* Gradientes animados de fondo */}
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.16),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(0,183,250,0.18),_transparent_32%)]" />

			<div className="pointer-events-none absolute top-20 right-10 h-72 w-72 rounded-full bg-[--color-accent]/10 blur-3xl opacity-20" />
			<div className="pointer-events-none absolute bottom-20 left-10 h-96 w-96 rounded-full bg-[--color-secondary]/15 blur-3xl opacity-15" />

			<div className="relative mx-auto flex max-w-4xl flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
				{/* Badge */}
				<span className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-4 py-2 text-sm font-semibold tracking-[0.2em] uppercase text-white/88 backdrop-blur-md transition-all duration-300 hover:bg-white/15 hover:border-white/25">
					<FaLock size={14} className="text-white/90" aria-hidden="true" />
					Portal seguro
				</span>

				{/* Títulos */}
				<h1 className="mt-7 text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
					Accede a tus resultados
				</h1>

				<p className="mt-5 text-base leading-8 text-white/82 sm:text-lg">
					Ingresa tu número de folio para ver de forma segura tus resultados diagnósticos
				</p>

				{/* Card Principal */}
				<div className="mx-auto mt-12 max-w-lg rounded-[2rem] border border-white/16 bg-white/10 p-6 text-left shadow-2xl shadow-black/20 backdrop-blur-2xl transition-all duration-300 hover:border-white/25 hover:bg-white/15 sm:p-8">
					
					{/* Encabezado Card */}
					<div className="flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[--color-accent]">
						<FaLock size={14} className="text-[--color-accent]" aria-hidden="true" />
						Portal seguro
					</div>

					{/* Formulario */}
					<form onSubmit={handleVerResultados} className="mt-6 space-y-4">
						<div>
							<label className="block text-sm font-semibold text-white/92 mb-2">
								Número de Folio / Número de Paciente
							</label>

							<div className="relative group">
								<div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[--color-accent]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur" />
								<div className="relative flex items-center gap-3 rounded-2xl border border-white/12 bg-[linear-gradient(180deg,rgba(248,249,250,0.98),rgba(235,241,252,0.98))] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] transition-all duration-300 group-hover:border-white/25">
									<input
										type="text"
										placeholder="Ej: TOR-2024-12345"
										value={folioInput}
										onChange={(e) => setFolioInput(e.target.value)}
										className="w-full bg-transparent text-[15px] text-[#23324d] outline-none placeholder:text-[#8f9bb3] font-medium"
									/>
									<svg className="h-5 w-5 shrink-0 text-[#90a0bb] transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" aria-hidden="true">
										<path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
										<circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
									</svg>
								</div>
							</div>
						</div>

						{/* Botón Ver Resultados */}
						<button
							type="submit"
							disabled={isLoading}
							className="group mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3.5 text-[15px] font-bold text-white shadow-[0_14px_35px_rgba(0,80,179,0.32)] transition-all duration-300 hover:bg-[#003f8f] hover:shadow-[0_20px_50px_rgba(0,63,143,0.45)] disabled:cursor-not-allowed disabled:opacity-50 hover:scale-105 active:scale-95"
						>
							{isLoading ? (
								<>
									<svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
										<circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.25" />
										<path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
									</svg>
									Buscando...
								</>
							) : (
								<>
									<svg className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" aria-hidden="true">
										<path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
									</svg>
									Ver Resultados
								</>
							)}
						</button>
					</form>

					{/* Divider */}
					<div className="mt-6 flex items-center gap-4 text-white/38">
						<div className="h-px flex-1 bg-white/20" />
						<span className="text-sm font-medium">o</span>
						<div className="h-px flex-1 bg-white/20" />
					</div>

					{/* Botón WhatsApp */}
					<button
						onClick={handleWhatsApp}
						className="group mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-white/18 bg-gradient-to-r from-white/12 to-white/8 px-6 py-3.5 text-[15px] font-semibold text-white/95 backdrop-blur-md transition-all duration-300 hover:from-white/20 hover:to-white/15 hover:border-white/30 hover:shadow-[0_8px_20px_rgba(0,183,250,0.2)] hover:scale-105 active:scale-95"
					>
						<svg className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" aria-hidden="true">
							<path
								d="M12 20.5c4.7 0 8.5-3.3 8.5-7.4S16.7 5.7 12 5.7 3.5 9 3.5 13.1c0 1.4.5 2.8 1.4 4l-.9 3.2 3.3-1.1c1.2.8 2.7 1.3 4.7 1.3Z"
								stroke="currentColor"
								strokeWidth="1.6"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
						Solicitar por WhatsApp
					</button>

					{/* Mensaje de estado */}
					{message && (
						<div
							className={`mt-6 flex items-center gap-2 rounded-2xl border px-4 py-3 text-left text-sm leading-5 transition-all duration-300 ${
								messageType === "success"
									? "border-green-500/30 bg-green-500/10 text-green-200"
									: "border-red-500/30 bg-red-500/10 text-red-200"
							}`}
						>
							<svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
								{messageType === "success" ? (
									<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
								) : (
									<path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
								)}
							</svg>
							{message}
						</div>
					)}

					{/* Security Message */}
					<div className="mt-6 flex items-start gap-3 rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-left text-[12px] leading-5 text-white/72 transition-all duration-300 hover:border-white/15 hover:bg-white/8">
						<FaLock size={16} className="mt-0.5 text-white/70 flex-shrink-0" aria-hidden="true" />
						<p>
							Con TORDOYA tu información médica es mas que segura 
						</p>
					</div>
				</div>

				
			</div>
		</section>
	);
}
