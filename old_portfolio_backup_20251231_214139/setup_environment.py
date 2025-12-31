#!/usr/bin/env python
"""
Personal Setup Script - FOR YOUR EYES ONLY!
This creates your actual .env file with real values
DO NOT COMMIT THIS FILE OR .env TO GITHUB!
"""

import getpass
import secrets
import os

def generate_secret_key():
    """Generate a secure random secret key"""
    return secrets.token_urlsafe(50)

def get_email_input(prompt, default=None):
    """Safely get email input"""
    email = input(f"{prompt} [{default}]: ").strip()
    return email if email else default

def main():
    print("=" * 60)
    print("PERSONAL ENVIRONMENT SETUP")
    print("=" * 60)
    print("⚠️  This script creates files with YOUR REAL credentials")
    print("⚠️  NEVER commit these files to GitHub!")
    print("=" * 60)
    
    # Get user information
    print("\nEnter your information:")
    primary_email = get_email_input("Primary admin email", "your_email@gmail.com")
    backup_email = get_email_input("Backup admin email", "backup_email@gmail.com")
    
    # Generate secure keys
    print("\n🔐 Generating secure keys...")
    secret_key = generate_secret_key()
    
    # Create .env file
    env_content = f"""# SECURE ENVIRONMENT VARIABLES
# DO NOT SHARE OR COMMIT TO GITHUB!

# Admin emails
PRIMARY_ADMIN_EMAIL={primary_email}
BACKUP_ADMIN_EMAIL={backup_email}

# Secret keys
SECRET_KEY={secret_key}
DATABASE_URL=sqlite:///portfolio.db

# Development settings
DEBUG=True
ENVIRONMENT=development
"""
    
    # Write .env file
    with open('.env', 'w') as f:
        f.write(env_content)
    
    # Create .gitignore if it doesn't exist
    if not os.path.exists('.gitignore'):
        with open('.gitignore', 'w') as f:
            f.write('.env\n')
    
    print("\n✅ Setup complete!")
    print(f"📁 Created: .env file with your configuration")
    print(f"🔐 Secret key generated: ***{secret_key[-8:]}")
    print("\n⚠️  IMPORTANT:")
    print("1. .env file contains YOUR REAL credentials")
    print("2. .gitignore should include '.env'")
    print("3. NEVER commit .env to version control!")
    print("4. Backup your .env file securely")
    
    # Show safe next steps
    print("\n🎯 Next steps:")
    print("1. Test: python projects/security-examples/secure_config.py")
    print("2. Run: python projects/security-examples/security_manager.py")
    print("3. Verify: python test_portfolio.py")

if __name__ == "__main__":
    main()
