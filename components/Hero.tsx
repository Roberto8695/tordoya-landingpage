"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const slides = [
	{
		eyebrow: "Estrategia comercial",
		title: "Impulsa tu negocio con una presencia que convierte",
		description:
			"Creamos experiencias claras, visuales y orientadas a resultados para que tu marca destaque desde el primer impacto.",
		cta: "Conocer más",
		href: "#servicios",
		image: "/image/logo_tordoya.webp",
		accent: "from-[#01155a]/95 to-[#155bb3]/90",
	},
	{
		eyebrow: "Diseño premium",
		title: "Un hero inmersivo, limpio y directo al mensaje",
		description:
			"La sección principal ocupa toda la pantalla con una estructura moderna, pensada para enganchar sin distraer.",
		cta: "Ver nosotros",
		href: "#nosotros",
		image: "/image/logo_h.webp",
		accent: "from-[#0b2d7a]/95 to-[#00b7fa]/80",
	},
	{
		eyebrow: "Atención cercana",
		title: "Tres mensajes, una misma meta: generar confianza",
		description:
			"Rotamos contenido clave dentro de un slider para reforzar tu propuesta de valor sin salir del primer pantallazo.",
		cta: "Contactar ahora",
		href: "#contacto",
		image: "/image/icono.webp",
		accent: "from-[#01155a]/95 to-[#1a1a2e]/90",
	},
];

export default function Hero() {
	const [activeSlide, setActiveSlide] = useState(0);

	useEffect(() => {
		const interval = window.setInterval(() => {
			setActiveSlide((currentSlide) => (currentSlide + 1) % slides.length);
		}, 6000);

		return () => window.clearInterval(interval);
	}, []);

	return (
		<section
			id="inicio"
			className="relative h-screen overflow-hidden bg-[--color-primary] text-white"
		>
			{slides.map((slide, index) => {
				const isActive = index === activeSlide;

				return (
					<div
						key={slide.title}
						className={`absolute inset-0 transition-opacity duration-700 ${
							isActive ? "opacity-100" : "pointer-events-none opacity-0"
						}`}
						aria-hidden={!isActive}
					>
						<div
							className={`absolute inset-0 bg-gradient-to-br ${slide.accent}`}
						/>
						<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.18),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(0,183,250,0.22),_transparent_32%)]" />

						<div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-4 pt-32 sm:pt-24 md:pt-16 lg:pt-0 sm:px-6 lg:px-8">
							<div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-[1.2fr_0.8fr]">
								<div className="max-w-3xl">
									<span className="mb-4 sm:mb-6 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-base font-semibold tracking-[0.2em] uppercase text-white/90 backdrop-blur-sm">
										{slide.eyebrow}
									</span>
									<h1 className="max-w-4xl text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight text-balance">
										{slide.title}
									</h1>
									<p className="mt-4 sm:mt-8 max-w-2xl text-base sm:text-lg md:text-xl lg:text-2xl leading-6 sm:leading-8 text-white/85">
										{slide.description}
									</p>

									<div className="mt-6 sm:mt-10 flex flex-col gap-3 sm:gap-5 sm:flex-row sm:items-center">
										<a
											href={slide.href}
											className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 sm:px-10 sm:py-5 text-base sm:text-lg font-bold text-[--color-primary] shadow-xl shadow-black/20 transition-transform duration-200 hover:-translate-y-0.5"
										>
											{slide.cta}
										</a>
										<a
											href="#contacto"
											className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-3 sm:px-10 sm:py-5 text-base sm:text-lg font-semibold text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/20"
										>
											Agenda tu cita
										</a>
									</div>
								</div>

								<div className="relative mx-auto w-full max-w-md lg:max-w-none">
									<div className="absolute inset-0 rounded-[2rem] bg-white/10 blur-3xl" />
									<div className="relative overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] border border-white/15 bg-white/10 p-4 sm:p-6 shadow-2xl shadow-black/20 backdrop-blur-md">
										<div className="flex items-center justify-between gap-2">
										<span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-white/70\">
											Slide {String(index + 1).padStart(2, "0")}
										</span>
										<span className="rounded-full bg-white/15 px-2.5 py-0.5 sm:px-3 sm:py-1 text-xs font-semibold text-white/80\">
											100vh
										</span>
										</div>

										<div className="mt-4 sm:mt-8 flex items-center justify-center rounded-[1rem] sm:rounded-[1.5rem] bg-white/10 p-4 sm:p-8\">
											<Image
												src={slide.image}
												alt={slide.title}
												width={520}
												height={520}
												className="h-32 w-auto object-contain sm:h-56 md:h-72 lg:h-96\"
												priority={isActive}
											/>
										</div>

										<div className="mt-6 grid grid-cols-3 gap-3">
											{slides.map((otherSlide, otherIndex) => {
												const isCurrent = otherIndex === activeSlide;

												return (
													<button
														key={otherSlide.title}
														type="button"
														onClick={() => setActiveSlide(otherIndex)}
														className={`h-2 rounded-full transition-all duration-200 ${
															isCurrent ? "bg-white" : "bg-white/30 hover:bg-white/50"
														}`}
														aria-label={`Ir al slide ${otherIndex + 1}`}
														aria-pressed={isCurrent}
													/>
												);
											})}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				);
			})}
		</section>
	);
}
