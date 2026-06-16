-- CreateTable
CREATE TABLE "config_nosotros" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL DEFAULT 'Quiénes somos',
    "descripcion" TEXT NOT NULL DEFAULT 'En Tordoya combinamos experiencia clínica y tecnología para ofrecer diagnósticos precisos y un trato humano. Nuestra misión y visión guían cada decisión estratégica y operativa.',
    "misionTitulo" TEXT NOT NULL DEFAULT 'Misión',
    "misionDescripcion" TEXT NOT NULL DEFAULT 'Ofrecer servicios de ultrasonido e imagen diagnóstica con el rigor de la alta especialidad y la accesibilidad que cada paciente merece.',
    "misionIcono" TEXT NOT NULL DEFAULT 'HiOutlineLightBulb',
    "visionTitulo" TEXT NOT NULL DEFAULT 'Visión',
    "visionDescripcion" TEXT NOT NULL DEFAULT 'Liderar el diagnóstico por imagen en Bolivia, Perú y México, siendo el aliado que conecta a médicos y pacientes con la información que necesitan para actuar a tiempo.',
    "visionIcono" TEXT NOT NULL DEFAULT 'HiOutlineEye',
    "valoresTitulo" TEXT NOT NULL DEFAULT 'Nuestros valores',
    "valoresDescripcion" TEXT NOT NULL DEFAULT 'Compromiso, excelencia y cercanía. Trabajamos con calidad humana y protocolos que garantizan resultados reproducibles.',
    "valores" JSONB NOT NULL DEFAULT '[{"icono":"HiSparkles","titulo":"Calidad","subtitulo":"Protocolos validados"},{"icono":"HiOutlineEye","titulo":"Precisión","subtitulo":"Lecturas confiables"},{"icono":"HiOutlineLightBulb","titulo":"Innovación","subtitulo":"Mejora continua"}]',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "config_nosotros_pkey" PRIMARY KEY ("id")
);
