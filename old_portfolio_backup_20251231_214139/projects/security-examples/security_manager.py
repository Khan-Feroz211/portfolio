"""
Security Best Practices Implementation
Author: Feroz Khan
Preventing JetForm-like access issues
"""

import os
from datetime import datetime
import hashlib
import json

class SecurityManager:
    """Manage system security and access control"""
    
    def __init__(self):
        self.admin_users = self.load_admin_users()
        self.backup_location = "secure_backups/"
        
    def load_admin_users(self):
        """Load admin users from environment or config file"""
        # Never hardcode credentials!
        admins = []
        
        # Load from environment variables
        primary_admin = os.getenv('PRIMARY_ADMIN_EMAIL', 'admin1@example.com')
        if primary_admin:
            admins.append({
                "email": primary_admin,
                "role": "super_admin",
                "created": datetime.now().isoformat()
            })
        
        # Always have at least 2 backup methods
        backup_admin = os.getenv('BACKUP_ADMIN_EMAIL', 'admin2@example.com')
        if backup_admin:
            admins.append({
                "email": backup_admin,
                "role": "admin",
                "created": datetime.now().isoformat()
            })
        
        return admins
    
    def create_backup(self):
        """Create encrypted backup of admin credentials"""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        backup_data = {
            "admins": self.admin_users,
            "backup_time": timestamp,
            "system": "Security Backup"
        }
        
        # Encrypt and save
        encrypted = self.encrypt_data(json.dumps(backup_data))
        
        # Save to secure location
        backup_file = f"{self.backup_location}admin_backup_{timestamp}.enc"
        
        # Create directory if it doesn't exist
        os.makedirs(self.backup_location, exist_ok=True)
        
        with open(backup_file, 'wb') as f:
            f.write(encrypted)
        
        print(f"[SECURITY] Backup created: {backup_file}")
        return backup_file
    
    def encrypt_data(self, data):
        """Simple encryption example (use proper encryption in production)"""
        # This is a simplified example
        # In real systems, use libraries like cryptography
        return hashlib.sha256(data.encode()).digest()
    
    def verify_access(self, user_email, action):
        """Verify user has permission for action"""
        user = next((u for u in self.admin_users if u["email"] == user_email), None)
        
        if not user:
            print(f"[SECURITY] Access denied: User {user_email} not found")
            return False
        
        # Log the access attempt
        self.log_access(user_email, action)
        
        return True
    
    def log_access(self, user, action):
        """Log all access attempts"""
        log_entry = {
            "user": user,
            "action": action,
            "timestamp": datetime.now().isoformat(),
            "ip": "127.0.0.1"  # In real app, get actual IP
        }
        
        # Create logs directory if it doesn't exist
        os.makedirs("logs", exist_ok=True)
        
        with open("logs/access_logs.json", "a") as f:
            f.write(json.dumps(log_entry) + "\n")
        
        print(f"[LOG] {user} performed {action}")

class EmergencyAccess:
    """Emergency access procedures"""
    
    @staticmethod
    def emergency_recovery():
        """Procedure to regain access if locked out"""
        print("[EMERGENCY] Recovery procedure initiated")
        
        steps = [
            "1. Try backup admin account",
            "2. Use SSH key access if available",
            "3. Restore from latest backup",
            "4. Contact secondary admin",
            "5. Use database direct access"
        ]
        
        for step in steps:
            print(step)
        
        return steps

# Example usage
def demonstrate_security():
    print("Security Best Practices Demonstration")
    print("=" * 50)
    
    # Initialize security manager
    security = SecurityManager()
    
    # Create backup
    security.create_backup()
    
    # Test access verification
    print("\nTesting access control:")
    security.verify_access("admin1@example.com", "login")
    security.verify_access("unknown@example.com", "login")
    
    # Show emergency procedures
    print("\nEmergency Recovery Procedures:")
    EmergencyAccess.emergency_recovery()
    
    print("\n" + "=" * 50)
    print("Key Takeaways:")
    print("- Always have multiple admin accounts")
    print("- Regular automated backups")
    print("- Log all access attempts")
    print("- Test recovery procedures regularly")
    print("=" * 50)

if __name__ == "__main__":
    demonstrate_security()
