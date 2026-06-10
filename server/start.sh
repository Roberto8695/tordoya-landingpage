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
echo "Contenido de dist/:"
ls -la dist/
echo ""
echo "Buscando archivo principal..."
find dist/ -name "main*" -type f 2>/dev/null | head -10

# Intentar varias ubicaciones posibles
if [ -f "dist/main.js" ]; then
  echo "✅ main.js en dist/"
  node dist/main.js
elif [ -f "dist/main" ]; then
  echo "✅ main en dist/"
  node dist/main
elif [ -f "dist/src/main.js" ]; then
  echo "✅ main.js en dist/src/"
  node dist/src/main.js
elif [ -f "dist/src/main" ]; then
  echo "✅ main en dist/src/"
  node dist/src/main
else
  echo "❌ No se encontró el archivo principal"
  echo "Buscando archivos .js en dist/..."
  find dist/ -name "*.js" -type f 2>/dev/null | head -20
  exit 1
fi
