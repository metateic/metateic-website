# Metateic Website

A modern, responsive website for Metateic built with Jekyll and deployed to GitHub Pages.

## Quick Start

### Local Development

1. **Install Ruby and Bundler** (if not already installed):
   ```bash
   # macOS (using Homebrew)
   brew install ruby
   gem install bundler
   ```

2. **Install dependencies**:
   ```bash
   bundle install
   ```

3. **Run the development server**:
   ```bash
   bundle exec jekyll serve
   ```

4. **View the site**: Open [http://localhost:4000](http://localhost:4000) in your browser

### Configuration

All site content and configuration is managed in `_data/strings.yml`. Edit this file to update:
- Site title, description, and company info
- Navigation links
- Section content (Intro, About, Services, etc.)
- Contact form labels and messages
- EmailJS configuration

## Deployment to GitHub Pages

### Prerequisites

1. Repository must be public (for free GitHub Pages) or you have GitHub Pro/Team
2. GitHub Pages enabled in repository settings

### Setup Steps

1. **Enable GitHub Pages**:
   - Go to repository **Settings** → **Pages**
   - Under "Source", select **GitHub Actions** (not "Deploy from a branch")

2. **Configure EmailJS** (for contact form):
   - Sign up at [https://www.emailjs.com](https://www.emailjs.com) (free tier: 200 emails/month)
   - Set up an email service (Gmail recommended)
   - Create an email template with variables: `{{firstName}}`, `{{lastName}}`, `{{email}}`, `{{phone}}`, `{{message}}`, `{{mailingList}}`
   - Get your Service ID, Template ID, and Public Key

3. **Add GitHub Secrets**:
   - Go to **Settings** → **Secrets and variables** → **Actions**
   - Add these secrets:
     - `CONTACT_EMAIL`: Your email address
     - `EMAILJS_PUBLIC_KEY`: Your EmailJS Public Key
     - `EMAILJS_SERVICE_ID`: Your EmailJS Service ID
     - `EMAILJS_TEMPLATE_ID`: Your EmailJS Template ID

4. **Push to main branch**:
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

The GitHub Actions workflow will automatically build and deploy your site.

### View Your Site

After deployment, your site will be available at:
- `https://[your-username].github.io/[repository-name]/`
- Or your custom domain if configured

## Project Structure

```
.
├── _data/
│   └── strings.yml          # All site content and configuration
├── _layouts/
│   └── default.html         # Jekyll layout
├── assets/
│   ├── css/
│   │   └── site.css         # All styles
│   ├── js/
│   │   └── site.js          # JavaScript functionality
│   └── images/               # Site images
├── .github/
│   └── workflows/
│       └── deploy.yml        # GitHub Actions deployment workflow
├── index.html                # Main page
└── _config.yml               # Jekyll configuration
```

## Customization

### Update Content

Edit `_data/strings.yml` to change any text, labels, or configuration values.

### Update Styles

Edit `assets/css/site.css` to modify colors, fonts, spacing, etc.

### Update Email Configuration

The contact form email is configured in:
- `_data/strings.yml` → `contact.emailjs` (for EmailJS)
- GitHub Secrets (for production deployment)

## Technologies

- **Jekyll** - Static site generator
- **GitHub Pages** - Hosting
- **EmailJS** - Contact form email service
- **Vanilla JavaScript** - No frameworks required

## License

All rights reserved.
