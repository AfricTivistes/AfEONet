# Decap CMS Setup for AfEONet

## Overview

AfEONet is now configured with Decap CMS for content management. This allows non-technical users to edit content through a user-friendly web interface.

## Configuration Files Created

- `public/admin/index.html` - Admin interface entry point
- `public/admin/config.yml` - CMS configuration with all collections
- `public/admin/preview.css` - Custom preview styles matching AfEONet design
- `app/admin/page.tsx` - NextJS page that redirects to admin interface
- `scripts/dev-cms.js` - Development script to run both servers
- `public/uploads/` - Directory for media file uploads

## Content Collections Configured

### 1. News Articles (`content/news/`)
- **Fields**: title, description, date, category, author, featured, image, tags
- **Format**: MDX with frontmatter
- **Widget**: Code editor for MDX safety

### 2. Reports (`content/reports/`)
- **Fields**: id, title, date, country, status, summary, downloadUrl, authors, tags
- **Format**: MDX with frontmatter
- **Widget**: Code editor for MDX safety

### 3. Security Alerts (`content/alerts/`)
- **Fields**: id, title, date, country, status, description, severity, region, tags
- **Format**: MDX with frontmatter
- **Widget**: Code editor for MDX safety

### 4. About Sections (`content/about/`)
- **Fields**: title, description, section, body
- **Format**: MDX with React components
- **Widget**: Code editor with MDX syntax highlighting

### 5. Static Pages (`content/pages/`)
- **Fields**: title, description, hero, mission, features, news, cta, impact sections
- **Format**: Markdown with structured frontmatter
- **Widget**: Standard markdown editor

## Development Setup

### Prerequisites

1. Node.js and npm installed
2. Project repository on GitHub
3. Local git repository initialized

### Local Development

#### Option 1: Automatic (Recommended)
```bash
# Run the development script that starts both servers
node scripts/dev-cms.js
```

#### Option 2: Manual
```bash
# Terminal 1: Start Next.js
npm run dev

# Terminal 2: Start Decap CMS proxy server
npx decap-server
```

### Access Points

- **Website**: http://localhost:5000
- **Admin Panel**: http://localhost:5000/admin
- **CMS Proxy**: http://localhost:8081 (automatic)

## Production Deployment Setup

### Option 1: Netlify (Recommended - Easiest)

1. **Deploy to Netlify**:
   - Connect your GitHub repository to Netlify
   - Deploy your site

2. **Update Configuration**:
   Edit `public/admin/config.yml` and update:
   ```yaml
   site_url: "https://your-site-name.netlify.app"
   display_url: "https://your-site-name.netlify.app"
   local_backend: false  # Disable for production
   ```

3. **Enable Authentication**:
   - Go to Netlify Dashboard > Site Settings > Identity
   - Click "Enable Identity"
   - Under "Registration", choose "Invite only" (recommended)
   - Under "Services", enable "Git Gateway"
   - Optionally enable external providers (Google, GitHub, etc.)

4. **Invite Users**:
   - Go to Identity tab in Netlify Dashboard
   - Click "Invite users" and add email addresses of content editors

### Option 2: Vercel/Other Hosts (Advanced)

If you prefer Vercel or other hosting:

1. **Change backend in `config.yml`**:
   ```yaml
   backend:
     name: github
     repo: your-username/your-repo-name
     branch: main
     base_url: https://your-oauth-proxy.vercel.app
     auth_endpoint: /auth
   ```

2. **Deploy OAuth Proxy**:
   - Deploy a separate OAuth service (e.g., `decap-cms-github-oauth`)
   - Configure with your GitHub OAuth app credentials

3. **Update site URLs**:
   ```yaml
   site_url: "https://your-site.vercel.app"
   display_url: "https://your-site.vercel.app"
   local_backend: false
   ```

### Deployment Notes

- **For Netlify**: Use git-gateway backend (current configuration)
- **For Vercel**: Requires additional OAuth proxy setup

## Content Management Guidelines

### For MDX Files (News, Reports, Alerts, About)

When editing MDX content in the CMS:

1. **Frontmatter**: Use the form fields provided
2. **Content**: Use the code editor with MDX syntax
3. **React Components**: You can use custom components like:
   - `<DimensionGrid>` and `<DimensionCard>`
   - `<HeroSection>`
   - `<Button>`, `<Card>`, etc.

### For Markdown Files (Pages)

Use the structured form fields for sections like hero, mission, features, etc.

### Media Files

- Upload images through the media library
- Images are stored in `public/uploads/`
- Reference images in content as `/uploads/filename.jpg`

## Security Notes

- Admin interface is publicly accessible but requires authentication
- Authentication is handled by your chosen backend (GitHub, Netlify, etc.)
- Content changes require proper git repository permissions
- Local development uses file system access (no authentication needed)

## Troubleshooting

### Common Issues

1. **Admin panel shows login error**
   - Check if `decap-server` is running locally
   - Verify backend configuration in `config.yml`

2. **Content not saving**
   - Ensure git repository is properly initialized
   - Check file permissions in content directories

3. **Preview not showing correctly**
   - Verify `preview.css` is loading
   - Check MDX component imports

### Development Tips

1. Test locally before deploying to production
2. Always backup content before major changes
3. Use git branches for experimental configurations
4. Keep the CMS configuration synced with your content structure

## Support

For Decap CMS documentation: https://decapcms.org/docs/
For issues specific to this setup, check the project documentation or open an issue in the repository.