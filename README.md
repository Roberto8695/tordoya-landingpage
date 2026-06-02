# Tordoya App

Monorepo con cliente (Next.js) y servidor (NestJS + Prisma).

## Requisitos

- Node.js 20+ (recomendado)
- pnpm
- Postgres

## Estructura

- client: Next.js App Router
- server: NestJS + Prisma

## Configuracion de base de datos

1) Levanta Postgres local y crea la base de datos:

- Database: tordoya_db
- Usuario: postgres
- Password: password
- Puerto: 5433

2) Crea el archivo server/.env con:

```
PORT=5000
JWT_SECRET=mi_super_secreto_temporal
DATABASE_URL="postgresql://postgres:password@localhost:5433/tordoya_db"
```

## Instalacion

Desde la raiz:

```
pnpm install
```

## Prisma (migraciones y tablas)

```
cd server
npx prisma generate
npx prisma migrate dev
```

Esto crea las tablas segun el schema y aplica las migraciones.

## Ejecutar en desarrollo

Servidor:

```
cd server
pnpm start:dev
```

Cliente:

```
cd client
pnpm dev
```

## Login demo

El login se conecta al backend en http://localhost:5000.
Asegura que el cliente tenga NEXT_PUBLIC_API_URL si usas otro puerto.

Ejemplo en client/.env.local:

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```
