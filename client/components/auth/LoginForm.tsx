"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, type MotionProps } from "framer-motion";
import type { ComponentPropsWithoutRef } from "react";
import {
	HiOutlineEye,
	HiOutlineEyeOff,
	HiOutlineLockClosed,
	HiOutlineMail,
} from "react-icons/hi";
import { login } from "@/services/auth.service";

type FormState = {
	email: string;
	password: string;
};

type MotionLabelProps = ComponentPropsWithoutRef<"label"> & MotionProps;
type MotionButtonProps = ComponentPropsWithoutRef<"button"> & MotionProps;
type MotionDivProps = ComponentPropsWithoutRef<"div"> & MotionProps;

const MotionLabel = motion.label as unknown as React.FC<MotionLabelProps>;
const MotionButton = motion.button as unknown as React.FC<MotionButtonProps>;
const MotionDiv = motion.div as unknown as React.FC<MotionDivProps>;

export default function LoginForm() {
	const router = useRouter();
	const [formState, setFormState] = useState<FormState>({ email: "", password: "" });
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);

	const containerVariants = {
		hidden: { opacity: 0, y: 14 },
		show: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.45, ease: "easeOut", staggerChildren: 0.08 },
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 10 },
		show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
	};

	const handleChange = (field: keyof FormState, value: string) => {
		setFormState((prev) => ({ ...prev, [field]: value }));
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setErrorMessage(null);
		setSuccessMessage(null);

		if (!formState.email.trim() || !formState.password.trim()) {
			setErrorMessage("Completa el correo y la contrasena para continuar.");
			return;
		}

		setIsLoading(true);

		try {
			const data = await login({
				email: formState.email,
				password: formState.password,
			});

			if (!data?.ok) {
				setErrorMessage(data?.message || "Credenciales invalidas.");
				return;
			}

			setSuccessMessage("Acceso correcto. Bienvenido al panel.");

			// Redirigir al dashboard después de 800ms para que el usuario vea el mensaje de éxito
			setTimeout(() => {
				router.push("/admin");
			}, 800);
		} catch {
			setErrorMessage("No se pudo conectar con el servidor.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-6">
			<MotionDiv variants={containerVariants} initial="hidden" animate="show" className="flex flex-col gap-6">
				<MotionDiv variants={itemVariants} className="flex flex-col items-start gap-4">
					<div className="flex items-center gap-3">
						<Image
							src="/image/logo-white.webp"
							alt="Tordoya"
							width={132}
							height={32}
							className="h-8 w-auto"
							priority
						/>
						
					</div>

					<div>
						<h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
							Portal Administrativo Seguro
						</h1>
						
					</div>
				</MotionDiv>

				<div className="space-y-4">
					<MotionLabel
						variants={itemVariants}
						className="flex flex-col gap-2 text-sm font-medium text-white/80"
					>
					Correo
						<div className="group flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-white shadow-[inset_0_1px_2px_rgba(0,0,0,0.25)] transition-all duration-200 hover:border-white/25 hover:bg-white/10 focus-within:border-[--color-accent] focus-within:bg-white/10 focus-within:shadow-[0_0_0_3px_rgba(0,183,250,0.18)]">
							<HiOutlineMail className="h-5 w-5 text-white/60 transition group-focus-within:text-white/90" aria-hidden="true" />
						<input
							type="email"
							required
							placeholder="example@gmail.com"
							value={formState.email}
							onChange={(event) => handleChange("email", event.target.value)}
								className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
							aria-label="Correo corporativo"
						/>
					</div>
				</MotionLabel>

					<MotionLabel
						variants={itemVariants}
						className="flex flex-col gap-2 text-sm font-medium text-white/80"
					>
					Contraseña
						<div className="group flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-white shadow-[inset_0_1px_2px_rgba(0,0,0,0.25)] transition-all duration-200 hover:border-white/25 hover:bg-white/10 focus-within:border-[--color-accent] focus-within:bg-white/10 focus-within:shadow-[0_0_0_3px_rgba(0,183,250,0.18)]">
							<HiOutlineLockClosed className="h-5 w-5 text-white/60 transition group-focus-within:text-white/90" aria-hidden="true" />
						<input
							type={showPassword ? "text" : "password"}
							required
							placeholder="Contraseña"
							value={formState.password}
							onChange={(event) => handleChange("password", event.target.value)}
							className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
							aria-label="Contrasena"
						/>
						<button
							type="button"
							onClick={() => setShowPassword((prev) => !prev)}
								className="rounded-full p-1 text-white/60 transition hover:text-white"
							aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
						>
							{showPassword ? (
								<HiOutlineEyeOff className="h-5 w-5" />
							) : (
								<HiOutlineEye className="h-5 w-5" />
							)}
						</button>
					</div>
					</MotionLabel>
				</div>

				{errorMessage && (
					<div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
						{errorMessage}
					</div>
				)}

				{successMessage && (
					<div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
						{successMessage}
					</div>
				)}

				<MotionButton
					variants={itemVariants}
					whileHover={{ scale: 1.02, y: -1 }}
					whileTap={{ scale: 0.98 }}
					type="submit"
					disabled={isLoading}
					className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-[linear-gradient(120deg,#00b7fa_0%,#55d7ff_45%,#00b7fa_100%)] px-6 py-3 text-sm font-semibold text-primary shadow-[0_16px_45px_rgba(0,183,250,0.45)] transition-all duration-300 hover:shadow-[0_24px_65px_rgba(0,183,250,0.6)] disabled:cursor-not-allowed disabled:opacity-60"
				>
					<span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
						<span className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.55),transparent_55%)]" />
					</span>
				{isLoading ? (
					<>
						<span className="h-4 w-4 animate-spin rounded-full border-2 border-[#01155a] border-t-transparent" />
						Validando acceso...
					</>
				) : (
					<>
						Ingresar al panel
						<span className="text-base transition-transform duration-300 group-hover:translate-x-1">
							→
						</span>
					</>
				)}
				</MotionButton>

				<p className="text-xs text-white/55">
					Acceso exclusivo para personal autorizado.
				</p>
			</MotionDiv>
		</form>
	);
}