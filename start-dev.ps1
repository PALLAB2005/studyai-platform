$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Start-Process powershell -ArgumentList '-NoExit', '-Command', "Set-Location '$root'; npm run server"
npm run dev