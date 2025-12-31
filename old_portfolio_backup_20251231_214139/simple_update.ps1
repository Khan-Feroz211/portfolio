# Simple .env updater
$envFile = ".env"

if (Test-Path $envFile) {
    Write-Host "Updating your .env file..." -ForegroundColor Cyan
    
    # ASK FOR YOUR EMAILS
    Write-Host "`nPlease enter your email addresses:" -ForegroundColor Yellow
    $primary = Read-Host "Your primary email (e.g., feroz.khan@gmail.com)"
    $backup = Read-Host "Your backup email (press Enter to skip)"
    
    if (-not $backup) {
        $backup = "$($primary.Split('@')[0]).backup@$($primary.Split('@')[1])"
    }
    
    # Your generated key
    $secretKey = "BvVPeyiPq2w-8Sz2gSw8BvkiRPFVFUbRYJVqh_TnaIdAjpdvTKzquMAYnJXSGR--HhQ"
    
    # Create new .env content
    $newContent = @"
# ENVIRONMENT VARIABLES
# KEEP PRIVATE - NEVER SHARE!

# Admin emails
PRIMARY_ADMIN_EMAIL=$primary
BACKUP_ADMIN_EMAIL=$backup

# Secret keys
SECRET_KEY=$secretKey
FLASK_SECRET_KEY=$secretKey

# Database
DATABASE_URL=sqlite:///portfolio.db

# API Keys (Optional)
WEATHER_API_KEY=your_weather_api_key_here

# Development settings
DEBUG=False
ENVIRONMENT=production

# Generated on: $(Get-Date)
"@
    
    # Save to file
    $newContent | Out-File -FilePath $envFile -Encoding UTF8
    
    Write-Host "`n✅ .env file updated successfully!" -ForegroundColor Green
    
    # Show safe preview
    Write-Host "`n🔒 Safe preview:" -ForegroundColor Cyan
    $lines = $newContent -split "`n"
    foreach ($line in $lines) {
        if ($line -match "EMAIL" -or ($line -match "KEY=" -and $line -notmatch "API_KEY")) {
            $parts = $line -split "="
            if ($parts.Count -eq 2) {
                if ($parts[1] -match "@") {
                    $local, $domain = $parts[1] -split "@"
                    $masked = $local.Substring(0, [Math]::Min(3, $local.Length)) + "***@" + $domain
                    Write-Host "   $($parts[0])=$masked"
                } elseif ($parts[0] -match "KEY") {
                    Write-Host "   $($parts[0])=***$($parts[1].Substring($parts[1].Length-8))"
                }
            }
        }
    }
    
} else {
    Write-Host "❌ .env file not found!" -ForegroundColor Red
}
