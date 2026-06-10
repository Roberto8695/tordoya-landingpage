#!/bin/bash
set -e

echo "=== INICIO DEL DEPLOY ==="
echo "Directorio actual: $(pwd)"
echo "Contenido:"
ls -la

echo ""
echo "🔧 Paso 1: Instalar dependencias..."
npm install --include=dev

echo ""
echo "🔧 Paso 2: Generar Prisma Client..."
npx prisma generate

echo ""
echo "🔧 Paso 3: Compilar TypeScript..."
npx nest build

echo ""
echo "🔧 Paso 4: Ejecutar migraciones..."
npx prisma migrate deploy

echo ""
echo "🌱 Paso 5: Sembrar datos..."
npx ts-node prisma/seed.ts || echo "Seed ya ejecutado"

echo ""
echo "🚀 Paso 6: Iniciar servidor..."
ls -la dist/ | head -20
node dist/main