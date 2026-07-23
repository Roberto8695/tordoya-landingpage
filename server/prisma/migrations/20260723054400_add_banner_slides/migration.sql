-- CreateTable
CREATE TABLE "banner_slides" (
    "id" TEXT NOT NULL,
    "badge" TEXT NOT NULL DEFAULT '',
    "title" TEXT NOT NULL DEFAULT '',
    "subtitle" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "bullets" JSONB NOT NULL DEFAULT '[]',
    "cta1" JSONB NOT NULL DEFAULT '{"label":"Agenda tu cita","href":"#contacto","style":"primary"}',
    "cta2" JSONB,
    "imageDesktop" TEXT NOT NULL DEFAULT '',
    "imageMobile" TEXT NOT NULL DEFAULT '',
    "theme" TEXT NOT NULL DEFAULT 'corporate',
    "layout" TEXT NOT NULL DEFAULT 'text-left-image-right',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "orden" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "banner_slides_pkey" PRIMARY KEY ("id")
);
