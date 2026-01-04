#!/bin/bash

# BenchBarrier - Netlify Deployment Script
# This script automates the deployment process to Netlify

set -e  # Exit on error

echo "🚀 BenchBarrier - Netlify Deployment"
echo "===================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Installing dependencies...${NC}"
    npm install
    echo -e "${GREEN}✓ Dependencies installed${NC}"
    echo ""
fi

# Build the project
echo -e "${BLUE}🔨 Building project...${NC}"
npm run build

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Build successful${NC}"
    echo ""
else
    echo -e "${RED}✗ Build failed${NC}"
    exit 1
fi

# Check if dist folder exists
if [ ! -d "dist" ]; then
    echo -e "${RED}✗ dist folder not found${NC}"
    exit 1
fi

# Display build info
echo -e "${BLUE}📊 Build Information:${NC}"
echo "   Output directory: dist/"
echo "   Total size: $(du -sh dist | cut -f1)"
echo "   Files: $(find dist -type f | wc -l)"
echo ""

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo -e "${YELLOW}⚠️  Netlify CLI not found${NC}"
    echo "   Installing Netlify CLI globally..."
    npm install -g netlify-cli
    echo -e "${GREEN}✓ Netlify CLI installed${NC}"
    echo ""
fi

# Check if user is logged in to Netlify
echo -e "${BLUE}🔐 Checking Netlify authentication...${NC}"
if netlify status &> /dev/null; then
    echo -e "${GREEN}✓ Already logged in to Netlify${NC}"
else
    echo -e "${YELLOW}⚠️  Not logged in to Netlify${NC}"
    echo "   Opening browser for authentication..."
    netlify login
fi
echo ""

# Ask deployment type
echo -e "${BLUE}📤 Deployment Options:${NC}"
echo "   1) Production deployment (live site)"
echo "   2) Draft deployment (preview URL)"
echo "   3) Manual deployment (drag & drop instructions)"
echo ""
read -p "Select option (1-3): " deploy_option

case $deploy_option in
    1)
        echo ""
        echo -e "${BLUE}🚀 Deploying to production...${NC}"
        netlify deploy --prod --dir=dist
        
        if [ $? -eq 0 ]; then
            echo ""
            echo -e "${GREEN}✓ Deployment successful!${NC}"
            echo ""
            echo -e "${GREEN}🎉 Your site is now live!${NC}"
            echo ""
            echo "Next steps:"
            echo "  • Test your live site"
            echo "  • Set up custom domain (if needed)"
            echo "  • Configure environment variables"
            echo "  • Enable analytics"
            echo ""
        else
            echo -e "${RED}✗ Deployment failed${NC}"
            exit 1
        fi
        ;;
    2)
        echo ""
        echo -e "${BLUE}🚀 Creating draft deployment...${NC}"
        netlify deploy --dir=dist
        
        if [ $? -eq 0 ]; then
            echo ""
            echo -e "${GREEN}✓ Draft deployment successful!${NC}"
            echo ""
            echo "You can preview your site at the URL above."
            echo "When ready, deploy to production with:"
            echo "  netlify deploy --prod"
            echo ""
        else
            echo -e "${RED}✗ Deployment failed${NC}"
            exit 1
        fi
        ;;
    3)
        echo ""
        echo -e "${BLUE}📋 Manual Deployment Instructions:${NC}"
        echo ""
        echo "1. Go to: https://app.netlify.com/drop"
        echo "2. Drag and drop the 'dist' folder onto the page"
        echo "3. Get your instant preview URL"
        echo ""
        echo "Or use Netlify Dashboard:"
        echo "1. Go to: https://app.netlify.com"
        echo "2. Click 'Add new site' → 'Deploy manually'"
        echo "3. Drag and drop the 'dist' folder"
        echo ""
        echo -e "${GREEN}✓ Build ready in: ./dist/${NC}"
        ;;
    *)
        echo -e "${RED}Invalid option${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${BLUE}📚 Documentation:${NC}"
echo "   • Full guide: NETLIFY_DEPLOYMENT.md"
echo "   • Refactoring notes: REFACTORING_SUMMARY.md"
echo "   • Quick deploy: QUICK_DEPLOY.md"
echo ""
echo -e "${GREEN}✓ Deployment process complete${NC}"
