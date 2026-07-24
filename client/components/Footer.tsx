"use client";

import Image from "next/image";
import Link from "next/link";
import { HiOutlineMail, HiOutlineLocationMarker, HiOutlinePhone } from "react-icons/hi";
import { useSiteConfig } from "@/features/configuraciones/site-config-context";

export default function Footer() {
	const { config } = useSiteConfig();
	const { footer } = config;

	const copyrightText = footer.copyrightText.replace(
		"{year}",
		new Date().getFullYear().toString()
	);

	return (
		<footer className="mt-auto border-t border-white/20 bg-primary text-white">
			<div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
				<div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1fr] lg:items-start">
					<div>
						<Link href={footer.navItems[0]?.href || "#inicio"} className="inline-flex items-center rounded-xl px-3 py-2 shadow-sm">
							<Image
								src={footer.logo}
								alt="Tordoya"
								width={180}
								height={60}
								className="h-10 w-auto"
								priority={false}
							/>
						</Link>

						<p className="mt-4 max-w-md text-sm leading-6 text-white/80">
							{footer.description}
						</p>

						<div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold text-white">
							{footer.tags.map((tag) => (
								<span key={tag} className="rounded-full bg-white/12 px-4 py-2">
									{tag}
								</span>
							))}
						</div>
					</div>

					<div>
						<h3 className="text-lg font-black text-white">Explora</h3>
						<ul className="mt-5 space-y-3 text-sm">
							{footer.navItems.map((link) => (
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
								<span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg bg-white/12 text-white">
									<HiOutlineLocationMarker size={18} />
								</span>
								<span>{footer.contact.address}</span>
							</li>
							<li className="flex items-start gap-3">
								<span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg bg-white/12 text-white">
									<HiOutlinePhone size={18} />
								</span>
								<span>{footer.contact.phone}</span>
							</li>
							<li className="flex items-start gap-3">
								<span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg bg-white/12 text-white">
									<HiOutlineMail size={18} />
								</span>
								<span>{footer.contact.email}</span>
							</li>
						</ul>
					</div>
				</div>

				<div className="mt-12 flex flex-col gap-4 border-t border-white/20 pt-6 text-sm text-white/80 md:flex-row md:items-center md:justify-between">
					<p>{copyrightText}</p>
					<p className="text-white/75">
						{footer.copyrightSubtext}
					</p>
				</div>
			</div>
		</footer>
	);
}
