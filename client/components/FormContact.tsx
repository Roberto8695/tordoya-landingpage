"use client";

import { useState } from "react";

const phoneCodes = [
	{ value: "+52", label: "MX +52" },
	{ value: "+57", label: "CO +57" },
	{ value: "+51", label: "PE +51" },
	{ value: "+591", label: "BO +591" },
];

export default function FormContact() {
	const [status, setStatus] = useState<"idle" | "sent">("idle");
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		phoneCode: "+52",
		phone: "",
		message: "",
	});

	const whatsappNumber = "525547157971";

	const handleChange = (
		field: keyof typeof formData,
		value: string,
	) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const fullName = formData.fullName.trim();
		const email = formData.email.trim();
		const phone = formData.phone.trim();
		const message = formData.message.trim();

		if (!fullName || !email || !phone || !message) {
			setStatus("idle");
			return;
		}

		const text = [
			"Hola, quisiera más información.",
			`Nombre: ${fullName}`,
			`Correo: ${email}`,
			`Teléfono: ${formData.phoneCode} ${phone}`,
			`Mensaje: ${message}`,
		].join("\n");

		const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
		window.open(whatsappUrl, "_blank", "noopener,noreferrer");
		setStatus("sent");
	};

	return (
		<section
			id="contacto"
			className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_100%)] py-16 sm:py-20 lg:py-24"
		>
			<div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top,_rgba(0,183,250,0.14),_transparent_60%)]" />

			<div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-2xl text-center">
                    
					<span className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-accent/40 px-4 py-2 text-sm font-light tracking-[0.2em] uppercase text-acent/88 backdrop-blur-md transition-all duration-300 hover:bg-white/15 hover:border-white/25">
					<span className="h-2 w-2 rounded-full bg-[--color-accent] shadow-[0_0_18px_rgba(0,183,250,0.8)] animate-pulse" />
					CONTÁCTANOS
				</span>
					<h2 className="mt-3 text-4xl font-bold tracking-tight text-primary sm:text-5xl">
						¿Tienes alguna duda?
					</h2>
					<p className="mt-4 text-base leading-7 text-foreground/60 sm:text-lg">
						Escríbenos y nuestro equipo te responderá a la brevedad.
					</p>
				</div>

				<div className="mt-12 rounded-[2rem] border border-primary/10 bg-white p-6 shadow-[0_18px_50px_rgba(1,21,90,0.08)] sm:p-8 lg:p-10">
					<form onSubmit={handleSubmit} className="space-y-5">
						<div className="space-y-2.5">
							<label htmlFor="fullName" className="text-sm font-semibold text-primary">
								Nombre completo
							</label>
							<input
								id="fullName"
								name="fullName"
								type="text"
								placeholder="Tu nombre"
								value={formData.fullName}
								onChange={(e) => handleChange("fullName", e.target.value)}
								className="h-12 w-full rounded-xl border border-primary/12 bg-white px-4 text-[15px] text-foreground outline-none transition-all duration-200 placeholder:text-[#b9c5d8] focus:border-accent focus:ring-4 focus:ring-accent/10"
							/>
						</div>

						<div className="space-y-2.5">
							<label htmlFor="email" className="text-sm font-semibold text-primary">
								Correo electrónico
							</label>
							<input
								id="email"
								name="email"
								type="email"
								placeholder="correo@ejemplo.com"
								value={formData.email}
								onChange={(e) => handleChange("email", e.target.value)}
								className="h-12 w-full rounded-xl border border-primary/12 bg-white px-4 text-[15px] text-foreground outline-none transition-all duration-200 placeholder:text-[#b9c5d8] focus:border-accent focus:ring-4 focus:ring-accent/10"
							/>
						</div>

						<div className="space-y-2.5">
							<label htmlFor="phone" className="text-sm font-semibold text-primary">
								Número de teléfono
							</label>
							<div className="grid grid-cols-[104px_1fr] gap-2 sm:grid-cols-[110px_1fr]">
								<div className="relative">
									<select
										id="phoneCode"
										name="phoneCode"
										value={formData.phoneCode}
										onChange={(e) => handleChange("phoneCode", e.target.value)}
										className="h-12 w-full appearance-none rounded-xl border border-primary/12 bg-white px-3 pr-9 text-[15px] text-foreground outline-none transition-all duration-200 focus:border-accent focus:ring-4 focus:ring-accent/10"
									>
										{phoneCodes.map((code) => (
											<option key={code.value} value={code.value}>
												{code.label}
											</option>
										))}
									</select>
									<svg
										className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#90a0bb]"
										viewBox="0 0 20 20"
										fill="none"
										aria-hidden="true"
									>
										<path
											d="M5.5 7.5L10 12l4.5-4.5"
											stroke="currentColor"
											strokeWidth="1.7"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</div>

								<input
									id="phone"
									name="phone"
									type="tel"
									inputMode="tel"
									placeholder="1234567890"
									value={formData.phone}
									onChange={(e) => handleChange("phone", e.target.value)}
									className="h-12 w-full rounded-xl border border-primary/12 bg-white px-4 text-[15px] text-foreground outline-none transition-all duration-200 placeholder:text-[#b9c5d8] focus:border-accent focus:ring-4 focus:ring-accent/10"
								/>
							</div>
						</div>

						<div className="space-y-2.5">
							<label htmlFor="message" className="text-sm font-semibold text-primary">
								Mensaje
							</label>
							<textarea
								id="message"
								name="message"
								placeholder="¿En qué podemos ayudarte?"
								rows={6}
								value={formData.message}
								onChange={(e) => handleChange("message", e.target.value)}
								className="w-full resize-none rounded-xl border border-primary/12 bg-white px-4 py-3 text-[15px] text-foreground outline-none transition-all duration-200 placeholder:text-[#b9c5d8] focus:border-accent focus:ring-4 focus:ring-accent/10"
							/>
						</div>

						<button
							type="submit"
							className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_16px_36px_rgba(0,183,250,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0aa8e4] hover:shadow-[0_20px_44px_rgba(0,183,250,0.34)]"
						>
							<span className="mr-2 text-base leading-none">✈</span>
							Enviar mensaje
						</button>

						{status === "sent" && (
							<p className="rounded-xl border border-accent/20 bg-accent/8 px-4 py-3 text-sm text-secondary">
								Tu mensaje quedó listo. Si quieres, ahora conecto este formulario a WhatsApp o a un correo real.
							</p>
						)}
					</form>
				</div>
			</div>
		</section>
	);
}
