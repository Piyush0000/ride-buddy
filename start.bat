@echo off
echo ========================================
echo    RideBuddy - College Cab Sharing Platform
echo ========================================
echo.
echo Starting development server...
echo.
echo Make sure you have Node.js installed before running this script.
echo.
echo Press any key to continue...
pause >nul

cd /d D:\ride-buddy

echo Installing dependencies...
npm install

echo.
echo Starting development server...
echo The application will be available at http://localhost:5175
echo.
echo Press Ctrl+C to stop the server
echo.

npm run dev

pause