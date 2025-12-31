import os
from dotenv import load_dotenv

print("🔐 VERIFYING YOUR SECURE SETUP")
print("=" * 50)

# Load environment variables
load_dotenv()

# Get values
primary_email = os.getenv('PRIMARY_ADMIN_EMAIL', 'Not set')
secret_key = os.getenv('SECRET_KEY', 'Not set')
backup_email = os.getenv('BACKUP_ADMIN_EMAIL', 'Not set')

# Check what you have
print("\n📧 Current Configuration:")
print(f"   PRIMARY_ADMIN_EMAIL: {primary_email}")
print(f"   BACKUP_ADMIN_EMAIL: {backup_email}")
print(f"   SECRET_KEY length: {len(secret_key) if secret_key != 'Not set' else 0}")

# Security checks
print("\n🔍 Security Analysis:")
issues = []

# Check if using example emails
if "example.com" in primary_email:
    issues.append("⚠️  You're using example.com email for PRIMARY_ADMIN_EMAIL")
    print("   ❌ PRIMARY_ADMIN_EMAIL: Still using example.com (change this!)")

if "example.com" in backup_email:
    issues.append("⚠️  You're using example.com email for BACKUP_ADMIN_EMAIL")
    print("   ❌ BACKUP_ADMIN_EMAIL: Still using example.com (change this!)")

# Check secret key
if secret_key == "Not set" or "generate_" in secret_key:
    issues.append("❌ SECRET_KEY not properly set")
    print("   ❌ SECRET_KEY: Not set or using placeholder")
elif len(secret_key) < 32:
    issues.append("⚠️  SECRET_KEY might be too short")
    print(f"   ⚠️  SECRET_KEY: Length {len(secret_key)} (minimum 32 recommended)")
else:
    print(f"   ✅ SECRET_KEY: Secure (length: {len(secret_key)})")

# Recommendations
print("\n📝 Recommendations:")

if not issues:
    print("   ✅ Your setup looks good!")
    print("\n   Next steps:")
    print("   1. Test: python projects/security-examples/security_manager.py")
    print("   2. Test: python projects/security-examples/secure_config.py")
else:
    print("   ⚠️  Issues found:")
    for issue in issues:
        print(f"      - {issue}")
    
    print("\n   🔧 How to fix:")
    print("   1. Edit .env file:")
    print("      notepad .env")
    print("   2. Replace example.com with YOUR email")
    print("   3. Save and test again")

print("\n" + "=" * 50)
print("💡 Tip: Your .env file should look like this:")
print("""
PRIMARY_ADMIN_EMAIL=your_real_email@gmail.com
BACKUP_ADMIN_EMAIL=your_backup_email@gmail.com
SECRET_KEY=BvVPeyiPq2w-8Sz2gSw8BvkiRPFVFUbRYJVqh_TnaIdAjpdvTKzquMAYnJXSGR--HhQ
""")
