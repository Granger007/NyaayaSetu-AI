Write-Host "Starting NyayaSetu-AI..."

# Check if npm is installed
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "npm could not be found. Please install Node.js." -ForegroundColor Red
    exit 1
}

# Start frontend
Write-Host "Starting frontend development server..."
cd frontend
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing frontend dependencies..."
    npm install
}
npm run dev
