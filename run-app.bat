@echo off
echo ========================================
echo    Civic Issue Reporter - Starting
echo ========================================
echo.

echo Starting Backend Server...
cd backend
start "Backend" cmd /k "npm start"

echo.
echo Starting Frontend Server...
cd ..\civic-issue-frontend
start "Frontend" cmd /k "npm run dev"

echo.
echo ========================================
echo    Servers are starting...
echo ========================================
echo.
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:5000
echo.
echo Please wait a few seconds for servers to start
echo Then open: http://localhost:5173
echo.
pause
