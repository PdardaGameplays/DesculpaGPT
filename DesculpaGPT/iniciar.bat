@echo off
chcp 65001 > nul
title DesculpaGPT — Iniciando...
cls
echo ========================================================
echo        🛡️  DesculpaGPT — Inteligência Artificial  🛡️
echo ========================================================
echo.
echo Iniciando o DesculpaGPT no seu navegador...
echo.

where python >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    python server.py
) else (
    echo Python não detectado no PATH, abrindo diretamente o arquivo HTML...
    start "" "%~dp0index.html"
)
pause
