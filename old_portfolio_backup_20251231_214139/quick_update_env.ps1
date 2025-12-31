# Update your .env file with actual values
$envPath = ".env"

if (Test-Path $envPath) {
    Write-Host "📝 Updating your .env file..." -ForegroundColor Cyan
    
    # Read current content
    $content = Get-Content $envPath -Raw
    
    # Your information (EDIT THESE!)
    $yourPrimaryEmail = "feroz.khan@yourdomain.com"  # CHANGE THIS!
    $yourBackupEmail = "your.backup@email.com"       # CHANGE THIS!
    
    # Your generated secret key (keep this!)
    $yourSecretKey = "BvVPeyiPq2w-8Sz2gSw8BvkiRPFVFUbRYJVqh_TnaIdAjpdvTKzquMAYnJXSGR--HhQ"
    
    # Replace placeholders
    $content = $content -replace "PRIMARY_ADMIN_EMAIL=your_real_email@domain\.com", "PRIMARY_ADMIN_EMAIL=$yourPrimaryEmail"
    $content = $content -replace "BACKUP_ADMIN_EMAIL=your_backup_email@domain\.com", "BACKUP_ADMIN_EMAIL=$yourBackupEmail"
    $content = $content -replace "SECRET_KEY=generate_new_ones_for_each_project", "SECRET_KEY=$yourSecretKey"
    
    # Write back
    $content | Out-File -FilePath $envPath -Encoding UTF8
    
    Write-Host "✅ .env file updated!" -ForegroundColor Green
    
    # Show what changed (safely)
    Write-Host "`n🔒 Your updated configuration:" -ForegroundColor Yellow
    $lines = $content -split "`n"
    foreach ($line in $lines) {
        if ($line -match "EMAIL" -or $line -match "KEY=" -and $line -notmatch "API_KEY") {
            $parts = $line -split "="
            if ($parts.Count -eq 2) {
                if ($parts[1] -match "@") {
                    $local, $domain = $parts[1] -split "@"
                    $masked = $local.Substring(0, [Math]::Min(3, $local.Length)) + "***@" + $domain
                    Write-Host "   $($parts[0])=$masked"
                } else {
                    Write-Host "   $($parts[0])=***$($parts[1].Substring($parts[1].Length-8))"
                }
            }
        }
    }
    
} else {
    Write-Host "❌ .env file not found!" -ForegroundColor Red
}
