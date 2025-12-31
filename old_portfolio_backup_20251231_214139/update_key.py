import os

# Your generated key from PowerShell
generated_key = "BvVPeyiPq2w-8Sz2gSw8BvkiRPFVFUbRYJVqh_TnaIdAjpdvTKzquMAYnJXSGR--HhQ"

# Read current .env file
env_file = ".env"
if os.path.exists(env_file):
    with open(env_file, 'r') as f:
        lines = f.readlines()
    
    # Update SECRET_KEY line
    updated_lines = []
    for line in lines:
        if line.startswith('SECRET_KEY='):
            updated_lines.append(f'SECRET_KEY={generated_key}\n')
        else:
            updated_lines.append(line)
    
    # Write back
    with open(env_file, 'w') as f:
        f.writelines(updated_lines)
    
    print(f"✅ Updated SECRET_KEY in .env file")
    print(f"🔐 New key: ***{generated_key[-8:]}")
else:
    print("❌ .env file not found. Create it first from .env.example")
