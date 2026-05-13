"use client";

import Image from "next/image";
import Link from "next/link";
import { HiOutlineMail, HiOutlineLocationMarker, HiOutlinePhone } from "react-icons/hi";

const navLinks = [
	{ label: "Inicio", href: "#inicio" },
	{ label: "Nosotros", href: "#nosotros" },
	{ label: "Servicios", href: "#servicios" },
	{ label: "Contáctanos", href: "#contacto" },
];

export default function Footer() {
	return (
		<footer className="mt-auto border-t border-white/20 bg-primary text-white">
			<div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
				<div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1fr] lg:items-start">
					<div>
						<Link href="#inicio" className="inline-flex items-center rounded-xl  px-3 py-2 shadow-sm">
							<Image
								src="/image/logo-white.webp"
								alt="Tordoya"
								width={180}
								height={60}
								className="h-10 w-auto"
								priority={false}
							/>
						</Link>

						<p className="mt-4 max-w-md text-sm leading-6 text-white/80">
							Servicios avanzados de imagenología médica y diagnóstico con tecnología de vanguardia
						</p>

						<div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold text-white">
							<span className="rounded-full bg-white/12 px-4 py-2">Calidad</span>
							<span className="rounded-full bg-white/12 px-4 py-2">Precisión</span>
							<span className="rounded-full bg-white/12 px-4 py-2">Confianza</span>
						</div>
					</div>

					<div>
						<h3 className="text-lg font-black text-white">Explora</h3>
						<ul className="mt-5 space-y-3 text-sm">
							{navLinks.map((link) => (
								<li key={link.label}>
									<a
										href={link.href}
										className="inline-flex items-center text-white/80 transition-colors duration-200 hover:text-white"
									>
										{link.label}
									</a>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h3 className="text-lg font-black text-white">Contacto</h3>

						<ul className="mt-5 space-y-4 text-sm text-white/80">
							<li className="flex items-start gap-3">
								<span className="mt-0.5 flex h-9 w-17 items-center justify-center rounded-lg bg-white/12 text-white">
									<HiOutlineLocationMarker size={18} />
								</span>
								<span>Av. Río Mixcoac 39, esq. Calle Ceres, CP 03940, Col. Crédito Constructor, Benito Juárez, CDMX.</span>
							</li>
							<li className="flex items-start gap-3">
								<span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg bg-white/12 text-white">
									<HiOutlinePhone size={18} />
								</span>
								<span>+52 1 55 4715 7971</span>
							</li>
							<li className="flex items-start gap-3">
								<span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg bg-white/12 text-white">
									<HiOutlineMail size={18} />
								</span>
								<span>diagnosticoultrasonidotordoya@gmail.com</span>
							</li>
						</ul>
					</div>
				</div>

				<div className="mt-12 flex flex-col gap-4 border-t border-white/20 pt-6 text-sm text-white/80 md:flex-row md:items-center md:justify-between">
					<p>© {new Date().getFullYear()} Tordoya. Todos los derechos reservados.</p>
					<p className="text-white/75">
						Soluciones integrales en diagnóstico por ultrasonido.
					</p>
				</div>
			</div>
		</footer>
	);
}
