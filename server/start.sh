#!/bin/bash
# Script de inicio para Render
# Usa npx para evitar problemas con pnpm/npm

echo "🔧 Instalando dependencias..."
npm install

echo "🔧 Generando Prisma Client..."
npx prisma generate

echo "🔧 Ejecutando migraciones..."
npx prisma migrate deploy

echo "🌱 Ejecutando seed..."
npx ts-node prisma/seed.ts || echo "Seed ya ejecutado o no aplicable"

echo "🚀 Iniciando servidor..."
node dist/main