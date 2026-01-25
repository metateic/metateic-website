# GitHub Pages Deployment Setup

## Prerequisites

1. Your repository must be public (for free GitHub Pages) or you have GitHub Pro/Team
2. GitHub Pages must be enabled in your repository settings

## Setup Steps

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under "Source", select **GitHub Actions** (not "Deploy from a branch")
4. Save the settings

### 2. Set Up EmailJS (for Direct Email Sending)

The contact form uses EmailJS to send emails directly without requiring users to open their email client.

1. **Create EmailJS Account**:
   - Go to [https://www.emailjs.com](https://www.emailjs.com)
   - Sign up for a free account (200 emails/month free)

2. **Set Up Email Service**:
   - Go to **Email Services** in your EmailJS dashboard
   - Click **Add New Service**
   - Choose your email provider (Gmail, Outlook, etc.)
   - Follow the setup instructions
   - Note your **Service ID**

3. **Create Email Template**:
   - Go to **Email Templates** in your EmailJS dashboard
   - Click **Create New Template**
   - Use these template variables:
     - `{{from_name}}` - Sender's name
     - `{{from_email}}` - Sender's email
     - `{{phone}}` - Phone number
     - `{{mailing_list}}` - Mailing list preference
     - `{{message}}` - Message content
   - Set the **To Email** to your contact email
   - Set the **Subject** to: "New Contact Form Submission from Metateic Website"
   - Note your **Template ID**

4. **Get Your Public Key**:
   - Go to **Account** → **General** in EmailJS dashboard
   - Copy your **Public Key**

5. **Add GitHub Secrets**:
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Secrets and variables** → **Actions**
   - Add these secrets:
     - `CONTACT_EMAIL`: Your email address (e.g., `contact@metateic.ca`)
     - `EMAILJS_PUBLIC_KEY`: Your EmailJS Public Key
     - `EMAILJS_SERVICE_ID`: Your EmailJS Service ID
     - `EMAILJS_TEMPLATE_ID`: Your EmailJS Template ID

### 3. Push to Main Branch

The workflow will automatically run when you push to the `main` branch:

```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

### 4. View Your Site

After the workflow completes, your site will be available at:
- `https://[your-username].github.io/[repository-name]/`
- Or your custom domain if configured

## Workflow Details

The workflow:
- Builds your Jekyll site
- Injects the `CONTACT_EMAIL` secret into `_data/strings.yml` and `_config.yml`
- Injects EmailJS configuration (public key, service ID, template ID) from secrets
- Deploys to GitHub Pages

## How It Works

When users submit the contact form:
1. The form validates the input
2. EmailJS sends the email directly to your configured address
3. Users see a success message without needing to open their email client
4. You receive the email with all form details

## Manual Deployment

You can also trigger the workflow manually:
1. Go to **Actions** tab in your repository
2. Select **Deploy to GitHub Pages** workflow
3. Click **Run workflow**

## Troubleshooting

- **Workflow fails**: Check the Actions tab for error messages
- **Email not updating**: Verify the secret names match exactly (case-sensitive)
- **Site not appearing**: Ensure GitHub Pages is set to use "GitHub Actions" as the source
- **Form not sending emails**: 
  - Verify all EmailJS secrets are set correctly
  - Check EmailJS dashboard for service status
  - Check browser console for error messages
  - Ensure your EmailJS template variables match the form fields
