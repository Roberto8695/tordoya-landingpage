import Sidebar from "@/components/dashboard/Sidebar";

export default function BitacoraPage() {
  return (
    <div className="flex min-h-screen bg-light">
      <Sidebar currentPath="/admin/bitacora" />
      <main className="flex-1 overflow-auto">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary/70">
              Sistema
            </p>
            <h1 className="mt-1 text-3xl font-semibold text-primary">Bitácora</h1>
            <p className="mt-1 text-base text-foreground/70">
              Revisa el historial de acciones y eventos del sistema.
            </p>
          </div>

          <div className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-primary">Módulo en construcción</h2>
            <p className="mt-2 text-sm text-foreground/70">
              Esta sección ya está habilitada. Aquí podrás ver auditoría y actividad reciente.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
