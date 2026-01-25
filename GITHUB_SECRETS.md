# GitHub Secrets to Create

Add these secrets in your GitHub repository:

**Settings** → **Secrets and variables** → **Actions** → **New repository secret**

## Required Secrets

### 1. CONTACT_EMAIL
- **Name**: `CONTACT_EMAIL`
- **Value**: `liam.maguire@metateic.com`
- **Description**: Email address where contact form submissions will be sent

### 2. EMAILJS_PUBLIC_KEY
- **Name**: `EMAILJS_PUBLIC_KEY`
- **Value**: `EWsnORZJOpKwys_Nq`
- **Description**: Your EmailJS Public Key (found in EmailJS Account → General)

### 3. EMAILJS_SERVICE_ID
- **Name**: `EMAILJS_SERVICE_ID`
- **Value**: `service_61xlks5`
- **Description**: Your EmailJS Service ID (found in EmailJS Email Services)

### 4. EMAILJS_TEMPLATE_ID
- **Name**: `EMAILJS_TEMPLATE_ID`
- **Value**: `template_hx27po9`
- **Description**: Your EmailJS Template ID (found in EmailJS Email Templates)

## How to Add Secrets

1. Go to your GitHub repository
2. Click **Settings**
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Enter the **Name** (exactly as shown above, case-sensitive)
6. Enter the **Value** (from the list above)
7. Click **Add secret**
8. Repeat for all 4 secrets

## Verification

After adding the secrets, the GitHub Actions workflow will automatically inject these values into your site during deployment. The secrets are never exposed in the repository code.
