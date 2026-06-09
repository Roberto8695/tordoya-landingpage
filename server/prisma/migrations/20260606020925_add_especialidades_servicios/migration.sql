-- CreateTable
CREATE TABLE "especialidades" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "icon" TEXT NOT NULL DEFAULT 'HiOutlineViewList',
    "color" TEXT NOT NULL DEFAULT 'primary',
    "imagen" TEXT NOT NULL,
    "orden" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "especialidades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "servicios" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "precio" DECIMAL(10,2),
    "duracionMinutos" INTEGER,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "orden" INTEGER NOT NULL DEFAULT 0,
    "especialidadId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "servicios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "especialidades_slug_key" ON "especialidades"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "servicios_slug_key" ON "servicios"("slug");

-- AddForeignKey
ALTER TABLE "servicios" ADD CONSTRAINT "servicios_especialidadId_fkey" FOREIGN KEY ("especialidadId") REFERENCES "especialidades"("id") ON DELETE CASCADE ON UPDATE CASCADE;
