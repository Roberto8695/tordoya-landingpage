#!/bin/bash
# Script de inicio para Render
# Ejecuta migraciones de Prisma y luego inicia el servidor

echo "🔧 Ejecutando migraciones de Prisma..."
npx prisma generate
npx prisma migrate deploy

echo "🌱 Ejecutando seed..."
npx ts-node prisma/seed.ts || echo "Seed ya ejecutado o no aplicable"

echo "🚀 Iniciando servidor..."
node dist/main