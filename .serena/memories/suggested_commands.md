# Suggested Commands for Development

## Core Development Commands
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## Common Git Commands
```bash
# Check status
git status

# Stage files
git add .

# Commit changes
git commit -m "message"

# Push to remote
git push origin main
```

## File System Commands (macOS/Darwin)
```bash
# List files and directories
ls -la

# Navigate directories
cd /path/to/directory

# Search for files
find . -name "*.tsx" -type f

# Search in files (using ripgrep if available)
rg "pattern" --type typescript

# Create directories
mkdir -p path/to/directory

# Copy files
cp source destination

# Move/rename files
mv old_name new_name
```

## Package Management
```bash
# Install dependencies
npm install

# Add new dependency
npm install package-name

# Add dev dependency
npm install -D package-name

# Remove dependency
npm uninstall package-name

# Check for outdated packages
npm outdated
```

## Development Workflow
1. Run `npm run dev` to start development server
2. Make changes to code
3. Run `npm run lint` to check for issues
4. Test changes in browser
5. Commit changes with descriptive messages