# 🚀 Deployment Guide

This guide will help you deploy the Enshitification Portal to Netlify in just a few minutes.

## Option 1: One-Click Deploy (Easiest) ⚡

1. **Click the Deploy to Netlify button** in the README.md
2. **Sign in to Netlify** (or create a free account)
3. **Click "Connect to GitHub"** and authorize Netlify
4. **Choose a repository name** (or use the default)
5. **Click "Save & Deploy"**
6. **Wait 2-3 minutes** for the build to complete
7. **Your site is live!** 🎉

Your site will be available at `https://your-site-name.netlify.app`

## Option 2: Deploy from GitHub (Recommended for existing repos)

### Step 1: Fork or Clone the Repository

If you haven't already:
```bash
git clone https://github.com/bruhdev1290/Enshitification-V2.git
cd Enshitification-V2
```

### Step 2: Push to Your GitHub Account

If you cloned:
```bash
# Create a new repo on GitHub, then:
git remote set-url origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git push -u origin main
```

### Step 3: Connect to Netlify

1. Go to [Netlify](https://app.netlify.com/)
2. Click **"Add new site"** → **"Import an existing project"**
3. Click **"Deploy with GitHub"**
4. Authorize Netlify to access your GitHub account
5. Select your repository from the list

### Step 4: Configure Build Settings

Netlify will automatically detect the settings from `netlify.toml`, but verify:

- **Build command**: `npm install && npm run build`
- **Publish directory**: `dist`
- **Node version**: `18` (set in netlify.toml)

### Step 5: Deploy

1. Click **"Deploy site"**
2. Wait for the build to complete (usually 2-3 minutes)
3. Your site is now live! 🎉

## Option 3: Deploy via Netlify CLI

For advanced users who prefer command-line deployment:

### Step 1: Install Netlify CLI

```bash
npm install -g netlify-cli
```

### Step 2: Login to Netlify

```bash
netlify login
```

This will open your browser to authorize the CLI.

### Step 3: Initialize Netlify

In your project directory:
```bash
netlify init
```

Follow the prompts:
- Choose "Create & configure a new site"
- Select your team
- Choose a site name (or let Netlify generate one)
- Build command: `npm run build`
- Publish directory: `dist`

### Step 4: Deploy

```bash
netlify deploy --prod
```

Your site will be built and deployed automatically!

## Post-Deployment Configuration

### Custom Domain

1. In Netlify dashboard, go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Enter your domain name
4. Follow DNS configuration instructions

### Environment Variables (if needed in future)

1. Go to **Site settings** → **Environment variables**
2. Click **"Add a variable"**
3. Set your key-value pairs

### Enable HTTPS

HTTPS is automatically enabled on Netlify! No configuration needed.

## Continuous Deployment

Once connected to GitHub, Netlify automatically:
- ✅ Deploys on every push to main branch
- ✅ Creates preview deployments for pull requests
- ✅ Runs build checks before deploying
- ✅ Provides deployment logs

## Troubleshooting

### Build Fails

1. Check the deploy logs in Netlify dashboard
2. Common issues:
   - Node version mismatch (ensure Node 18+ in netlify.toml)
   - Missing dependencies (run `npm install` locally to verify)
   - Build errors (run `npm run build` locally to test)

### Site Not Loading

1. Verify the publish directory is set to `dist`
2. Check that the build completed successfully
3. Review the deploy log for errors

### 404 Errors on Refresh

The `netlify.toml` includes a redirect rule to handle this. If you still see 404s:
1. Verify `netlify.toml` exists in your repo
2. Check the redirects section is present

## Testing Before Deployment

Always test locally before deploying:

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview the production build
npm run preview
```

Visit `http://localhost:4173` to verify everything works.

## Performance Tips

- ✅ **Already optimized**: The build is configured for production
- ✅ **Automatic compression**: Netlify serves gzipped files
- ✅ **CDN**: Global CDN is included free with Netlify
- ✅ **Caching**: Static assets are cached automatically

## Need Help?

- 📖 [Netlify Documentation](https://docs.netlify.com/)
- 💬 [Netlify Community](https://answers.netlify.com/)
- 🐛 [Open an issue](https://github.com/bruhdev1290/Enshitification-V2/issues)

---

**Happy Deploying!** 🚀
