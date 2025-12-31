"""
Secure Configuration Manager
NEVER put real credentials in this file!
"""

import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    """Application configuration - loads from environment variables"""
    
    # Admin emails (loaded from .env)
    PRIMARY_ADMIN_EMAIL = os.getenv('PRIMARY_ADMIN_EMAIL', 'admin@example.com')
    BACKUP_ADMIN_EMAIL = os.getenv('BACKUP_ADMIN_EMAIL', 'backup@example.com')
    
    # Secret key (CRITICAL - never hardcode!)
    SECRET_KEY = os.getenv('SECRET_KEY', 'default-dev-key-change-in-production')
    
    # Database
    DATABASE_URL = os.getenv('DATABASE_URL', 'sqlite:///dev.db')
    
    # API Keys
    WEATHER_API_KEY = os.getenv('WEATHER_API_KEY', '')
    
    # Security settings
    DEBUG = os.getenv('DEBUG', 'False').lower() == 'true'
    
    @classmethod
    def validate(cls):
        """Validate that required environment variables are set"""
        required = ['SECRET_KEY', 'PRIMARY_ADMIN_EMAIL']
        missing = []
        
        for var in required:
            if not getattr(cls, var) or getattr(cls, var).startswith('default'):
                missing.append(var)
        
        if missing:
            print(f"⚠️  WARNING: Missing environment variables: {missing}")
            print("Please create a .env file with these variables")
            return False
        
        # Warn if using default secret key
        if cls.SECRET_KEY == 'default-dev-key-change-in-production':
            print("⚠️  WARNING: Using default secret key. Change in production!")
        
        return True
    
    @classmethod
    def print_safe_config(cls):
        """Print configuration without exposing secrets"""
        config = {
            'PRIMARY_ADMIN_EMAIL': cls.PRIMARY_ADMIN_EMAIL[:3] + '***' if cls.PRIMARY_ADMIN_EMAIL else 'Not set',
            'BACKUP_ADMIN_EMAIL': cls.BACKUP_ADMIN_EMAIL[:3] + '***' if cls.BACKUP_ADMIN_EMAIL else 'Not set',
            'SECRET_KEY': '***' + cls.SECRET_KEY[-4:] if cls.SECRET_KEY else 'Not set',
            'DATABASE_URL': cls.DATABASE_URL[:20] + '***' if cls.DATABASE_URL else 'Not set',
            'DEBUG': cls.DEBUG,
            'IS_VALID': cls.validate()
        }
        
        print("🔒 Current Configuration (Safe View):")
        for key, value in config.items():
            print(f"  {key}: {value}")

# Example usage
if __name__ == "__main__":
    print("Testing secure configuration...")
    Config.print_safe_config()
    
    print("\n📝 To set up your environment:")
    print("1. Copy .env.example to .env")
    print("2. Edit .env with your REAL values")
    print("3. Run: python -c 'from config import Config; Config.validate()'")
    print("\n⚠️  NEVER commit .env to version control!")
