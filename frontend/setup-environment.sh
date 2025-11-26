#!/bin/bash
# Setup script to copy environment.example.ts to environment.ts

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_DIR="$SCRIPT_DIR/src/environments"

echo "🔧 Setting up Angular environment files..."

# Copy example files if they don't exist
if [ ! -f "$ENV_DIR/environment.ts" ]; then
  cp "$ENV_DIR/environment.example.ts" "$ENV_DIR/environment.ts"
  echo "✅ Created environment.ts from example"
  echo "⚠️  Please update environment.ts with your Auth0 credentials"
else
  echo "ℹ️  environment.ts already exists"
fi

if [ ! -f "$ENV_DIR/environment.prod.ts" ]; then
  cp "$ENV_DIR/environment.example.ts" "$ENV_DIR/environment.prod.ts"
  # Update production flag
  sed -i 's/production: false/production: true/' "$ENV_DIR/environment.prod.ts"
  echo "✅ Created environment.prod.ts from example"
  echo "⚠️  Please update environment.prod.ts with your Auth0 credentials"
else
  echo "ℹ️  environment.prod.ts already exists"
fi

echo ""
echo "📝 Next steps:"
echo "1. Edit frontend/src/environments/environment.ts"
echo "2. Replace YOUR_AUTH0_DOMAIN with your Auth0 domain"
echo "3. Replace YOUR_AUTH0_CLIENT_ID with your client ID"
echo "4. Replace YOUR_AUTH0_API_IDENTIFIER with your API identifier (optional)"
echo ""
echo "🔗 Get credentials from: https://manage.auth0.com/dashboard"
