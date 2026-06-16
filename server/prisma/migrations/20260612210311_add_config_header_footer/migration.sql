-- CreateTable
CREATE TABLE "config_header" (
    "id" TEXT NOT NULL,
    "logo" TEXT NOT NULL DEFAULT '/image/logo_h.webp',
    "ctaText" TEXT NOT NULL DEFAULT 'Agenda tu cita',
    "ctaLink" TEXT NOT NULL DEFAULT '#contacto',
    "navItems" JSONB NOT NULL DEFAULT '[{"label":"Inicio","href":"#inicio"},{"label":"Nosotros","href":"#nosotros"},{"label":"Servicios","href":"#servicios"},{"label":"Contáctanos","href":"#contacto"}]',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "config_header_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "config_footer" (
    "id" TEXT NOT NULL,
    "logo" TEXT NOT NULL DEFAULT '/image/logo-white.webp',
    "description" TEXT NOT NULL DEFAULT 'Servicios avanzados de imagenología médica y diagnóstico con tecnología de vanguardia',
    "tags" JSONB NOT NULL DEFAULT '["Calidad","Precisión","Confianza"]',
    "navItems" JSONB NOT NULL DEFAULT '[{"label":"Inicio","href":"#inicio"},{"label":"Nosotros","href":"#nosotros"},{"label":"Servicios","href":"#servicios"},{"label":"Contáctanos","href":"#contacto"}]',
    "contactAddress" TEXT NOT NULL DEFAULT 'Av. Río Mixcoac 39, esq. Calle Ceres, CP 03940, Col. Crédito Constructor, Benito Juárez, CDMX.',
    "contactPhone" TEXT NOT NULL DEFAULT '+52 1 55 4715 7971',
    "contactEmail" TEXT NOT NULL DEFAULT 'diagnosticoultrasonidotordoya@gmail.com',
    "copyrightText" TEXT NOT NULL DEFAULT '© {year} Tordoya. Todos los derechos reservados.',
    "copyrightSubtext" TEXT NOT NULL DEFAULT 'Soluciones integrales en diagnóstico por ultrasonido.',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "config_footer_pkey" PRIMARY KEY ("id")
);
