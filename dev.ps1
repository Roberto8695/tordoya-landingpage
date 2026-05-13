# Script para abrir pnpm dev en Chrome automáticamente, sin VS Code
Write-Host "Iniciando servidor de desarrollo..." -ForegroundColor Cyan

# Cierra procesos previos que puedan ocupar el puerto 3000
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 1

# Lanza pnpm dev desde cmd.exe para que Windows resuelva el comando correctamente
$env:BROWSER = "none"
$devProcess = Start-Process -FilePath "cmd.exe" -ArgumentList '/c "pnpm dev"' -PassThru -WindowStyle Hidden

# Espera un poco a que Next arranque
Write-Host "Esperando a que el servidor esté listo..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Abre Chrome externo directamente
Write-Host "Abriendo Chrome..." -ForegroundColor Green
$chromePath = "C:\Program Files\Google\Chrome\Application\chrome.exe"
if (Test-Path $chromePath) {
	Start-Process -FilePath $chromePath -ArgumentList "http://localhost:3000"
} else {
	Start-Process -FilePath "chrome" -ArgumentList "http://localhost:3000"
}

Write-Host "Servidor ejecutándose en http://localhost:3000" -ForegroundColor Green
Wait-Process -Id $devProcess.Id
