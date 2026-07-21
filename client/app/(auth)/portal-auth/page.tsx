import Image from "next/image";
import LoginBackground from "../../../components/auth/LoginBackground";
import LoginCard from "../../../components/auth/LoginCard";
import LoginForm from "../../../components/auth/LoginForm";
import SecurityBadge from "../../../components/auth/SecurityBadge";

export default function PortalAuthPage() {
	return (
		<main className="relative h-full overflow-hidden bg-[--color-primary] text-white">
			<LoginBackground />
			<div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col px-6 py-16 sm:px-10 lg:flex-row lg:items-center lg:gap-10">
				<section className="relative flex flex-1 flex-col justify-center gap-10">
					<SecurityBadge />
					<div className="space-y-6">
						<div className="flex items-center gap-4">
							<Image
								src="/image/logo-white.webp"
								alt="Tordoya"
								width={180}
								height={46}
								className="h-11 w-auto"
								priority
							/>
							
						</div>
						<h2 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
							Accede al panel administrativo de la página con seguridad reforzada.
						</h2>
						
					</div>
					
				</section>

				<section className="mt-12 w-full max-w-xl lg:mt-0 lg:flex-1">
					<LoginCard>
						<LoginForm />
					</LoginCard>
				</section>
			</div>
		</main>
	);
}
