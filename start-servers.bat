@echo off
echo ========================================
echo    Starting Civic Issue Reporter
echo ========================================
echo.

echo Step 1: Starting Backend Server...
cd backend
start "Backend Server" cmd /k "echo Starting backend... && npm start"

echo.
echo Step 2: Waiting for backend to start...
timeout /t 5 /nobreak > nul

echo.
echo Step 3: Starting Frontend Server...
cd ..\civic-issue-frontend
start "Frontend Server" cmd /k "echo Starting frontend... && npm run dev"

echo.
echo ========================================
echo    Servers are starting...
echo ========================================
echo.
echo Please wait 10-15 seconds for both servers to start
echo.
echo Then try these URLs:
echo   - Main App: http://localhost:5173
echo   - Test Page: test-app.html (double-click this file)
echo   - Backend API: http://localhost:5000
echo.
echo If the main app doesn't work, use the test page!
echo.
pause
