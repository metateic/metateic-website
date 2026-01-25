# Formspree Setup Instructions

## Quick Setup

1. Go to [https://formspree.io](https://formspree.io) and create a free account
2. Create a new form and get your form endpoint URL (looks like: `https://formspree.io/f/YOUR_FORM_ID`)
3. Replace `YOUR_FORM_ID` in `index.html` with your actual Formspree form ID

## Update the Form Action

In `index.html`, find this line:
```html
<form class="contact-form reveal" id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

Replace `YOUR_FORM_ID` with your actual Formspree form ID.

## Alternative: Use EmailJS (Client-Side)

If you prefer a client-side solution, you can use EmailJS instead:

1. Sign up at [https://www.emailjs.com](https://www.emailjs.com)
2. Set up an email service
3. Get your Service ID, Template ID, and Public Key
4. Update the form JavaScript to use EmailJS

## Alternative: Keep mailto (Simple but Limited)

The current form uses `mailto:` which opens the user's email client. This works but has limitations:
- Requires user to have email client configured
- Less professional experience
- No spam protection

Formspree is recommended for a better user experience.
