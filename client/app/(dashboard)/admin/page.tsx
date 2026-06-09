import Sidebar from "@/components/dashboard/Sidebar";

export default function AdminPage() {
	return (
		<div className="flex min-h-screen bg-light">
			<Sidebar currentPath="/admin" />
			<main className="flex-1 overflow-auto">
				<div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-8">
					{/* Header */}
					<div className="flex items-center justify-between">
						<div>
							<p className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary/70">
								Panel
							</p>
							<h1 className="mt-1 text-3xl font-semibold text-primary">Dashboard</h1>
							<p className="mt-1 text-base text-foreground/70">
								Resumen general de la operación clínica.
							</p>
						</div>
					</div>

					{/* Grid de tarjetas de resumen */}
					<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{/* Card: Pacientes */}
						<div className="rounded-xl border border-primary/10 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md">
							<div className="flex items-center justify-between">
								<span className="text-sm font-medium text-foreground/60">Pacientes</span>
								<span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
									+12%
								</span>
							</div>
							<p className="mt-2 text-3xl font-bold text-primary">1,248</p>
							<p className="mt-1 text-xs text-foreground/50">Últimos 30 días</p>
						</div>

						{/* Card: Citas */}
						<div className="rounded-xl border border-primary/10 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md">
							<div className="flex items-center justify-between">
								<span className="text-sm font-medium text-foreground/60">Citas</span>
								<span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent">
									Hoy
								</span>
							</div>
							<p className="mt-2 text-3xl font-bold text-primary">24</p>
							<p className="mt-1 text-xs text-foreground/50">8 pendientes de confirmar</p>
						</div>

						{/* Card: Estudios */}
						<div className="rounded-xl border border-primary/10 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md sm:col-span-2 lg:col-span-1">
							<div className="flex items-center justify-between">
								<span className="text-sm font-medium text-foreground/60">Estudios</span>
								<span className="rounded-full bg-secondary/10 px-2.5 py-0.5 text-xs font-semibold text-secondary">
									Semanal
								</span>
							</div>
							<p className="mt-2 text-3xl font-bold text-primary">89</p>
							<p className="mt-1 text-xs text-foreground/50">Esta semana</p>
						</div>
					</div>

					{/* Sección de actividad reciente */}
					<div className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm">
						<h2 className="text-lg font-semibold text-primary">Actividad reciente</h2>
						<div className="mt-4 space-y-3">
							{[
								{ action: "Nuevo paciente registrado", detail: "María García", time: "Hace 15 min" },
								{ action: "Cita confirmada", detail: "Ultrasonido abdominal - #1024", time: "Hace 32 min" },
								{ action: "Resultados publicados", detail: "Dr. López - Doppler carotídeo", time: "Hace 1h" },
								{ action: "Pago registrado", detail: "Factura #F-2024-089", time: "Hace 2h" },
							].map((item, i) => (
								<div
									key={i}
									className="flex items-center justify-between rounded-lg border border-primary/5 bg-primary/[0.02] px-4 py-3 transition-colors duration-200 hover:bg-primary/[0.05]"
								>
									<div>
										<p className="text-sm font-medium text-foreground">{item.action}</p>
										<p className="text-xs text-foreground/50">{item.detail}</p>
									</div>
									<span className="shrink-0 text-xs text-foreground/40">{item.time}</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}