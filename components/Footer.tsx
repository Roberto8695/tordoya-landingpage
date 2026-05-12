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
		<footer className="mt-auto border-t border-primary/10 bg-linear-to-b from-white to-light/70 text-foreground">
			<div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
				<div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1fr] lg:items-start">
					<div>
						<Link href="#inicio" className="inline-flex items-center gap-3">
							<Image
								src="/image/logo_h.webp"
								alt="Tordoya"
								width={180}
								height={60}
								className="h-10 w-auto"
								priority={false}
							/>
						</Link>

						<p className="mt-4 max-w-md text-sm leading-6 text-foreground/75">
							Servicios avanzados de imagenología médica y diagnóstico con tecnología de vanguardia
						</p>

						<div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold text-primary/80">
							<span className="rounded-full bg-primary/5 px-4 py-2">Calidad</span>
							<span className="rounded-full bg-secondary/5 px-4 py-2">Precisión</span>
							<span className="rounded-full bg-accent/10 px-4 py-2">Confianza</span>
						</div>
					</div>

					<div>
						<h3 className="text-lg font-black text-primary">Explora</h3>
						<ul className="mt-5 space-y-3 text-sm">
							{navLinks.map((link) => (
								<li key={link.label}>
									<a
										href={link.href}
										className="inline-flex items-center text-foreground/75 transition-colors duration-200 hover:text-secondary"
									>
										{link.label}
									</a>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h3 className="text-lg font-black text-primary">Contacto</h3>

						<ul className="mt-5 space-y-4 text-sm text-foreground/75">
							<li className="flex items-start gap-3">
								<span className="mt-0.5 flex h-9 w-17 items-center justify-center rounded-lg bg-primary/10 text-primary">
									<HiOutlineLocationMarker size={18} />
								</span>
								<span>Av. Río Mixcoac 39, esq. Calle Ceres, CP 03940, Col. Crédito Constructor, Benito Juárez, CDMX.</span>
							</li>
							<li className="flex items-start gap-3">
								<span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
									<HiOutlinePhone size={18} />
								</span>
								<span>+52 1 55 4715 7971</span>
							</li>
							<li className="flex items-start gap-3">
								<span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
									<HiOutlineMail size={18} />
								</span>
								<span>diagnosticoultrasonidotordoya@gmail.com</span>
							</li>
						</ul>
					</div>
				</div>

				<div className="mt-12 flex flex-col gap-4 border-t border-primary/10 pt-6 text-sm text-foreground/70 md:flex-row md:items-center md:justify-between">
					<p>© {new Date().getFullYear()} Tordoya. Todos los derechos reservados.</p>
					<p className="text-foreground/60">
						Soluciones integrales en diagnóstico por ultrasonido.
					</p>
				</div>
			</div>
		</footer>
	);
}
