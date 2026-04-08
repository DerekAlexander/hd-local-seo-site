# Contractor SEO Landing Page

A modern, responsive Next.js landing page for contractor SEO services (roofing, HVAC, plumbing, etc.).

## Features

- ✅ **Hero Section** — Eye-catching hero with background image
- ✅ **SEO Education** — 3-column education cards explaining SEO value
- ✅ **Pricing Cards** — Three service tiers (Audit, Optimization, Full Program)
- ✅ **SEO Score Tool** — Interactive website analyzer with mock results
- ✅ **Contact Form** — Email lead capture with validation
- ✅ **Fully Responsive** — Mobile-first design
- ✅ **Next.js 14** — App router, optimized images, modern tooling

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Email (Optional)
Edit `.env.local` to enable email notifications:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-specific-password
```

**Gmail Setup:**
1. Enable 2-factor authentication on your Google account
2. Generate an [App Password](https://support.google.com/accounts/answer/185833)
3. Use that password in SMTP_PASSWORD

**Alternative:** Use [Resend](https://resend.com), [SendGrid](https://sendgrid.com), or any SMTP service.

### 3. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000`

### 4. Build for Production
```bash
npm run build
npm start
```

## Project Structure

```
app_nextjs/
├── app/
│   ├── page.jsx              # Main landing page
│   ├── layout.js             # Root layout
│   ├── globals.css           # Global styles
│   └── api/
│       └── contact/route.js  # Email API endpoint
│
├── components/
│   ├── ui/
│   │   ├── Button.jsx        # Reusable button
│   │   ├── FormInput.jsx     # Form input component
│   │   └── Section.jsx       # Section wrapper
│   │
│   └── sections/
│       ├── Hero.jsx
│       ├── SEOEducation.jsx
│       ├── PricingCards.jsx
│       ├── SEOScoreTool.jsx
│       └── ContactForm.jsx
│
├── public/
│   └── images/               # All image assets here
│
└── package.json
```

## Components

### Hero
- Full-width hero with background image
- Headline, subheading, CTA button
- Scrolls to pricing section on click

### SEO Education
- 3-column card layout
- Icon + title + description per card
- Bottom text + illustration
- Educational content about SEO for contractors

### Pricing Cards
- 3 service tiers
- Feature lists per tier
- CTA buttons link to contact form

### SEO Score Tool
- Website URL input
- Generates mock SEO score (50-90)
- Shows recommendations
- No backend required (placeholder analysis)

### Contact Form
- Name, email, message fields
- Validates input
- Sends email to hydrodub@gmail.com
- Success/error messages
- Privacy disclaimer

## Customization

### Change Business Info
Edit text in `/components/sections/` files:
- Hero headline/subheading
- Pricing tiers and features
- Email recipient in `app/api/contact/route.js`

### Change Colors
Edit CSS modules in `/components/` — look for:
- `#1e1e1e` (dark text)
- `#1b3400` (green accent)
- `#f5f5f5` (light gray background)

### Add Your Images
Images go in `/public/images/`:
- Already there: 24 assets from Figma
- Next.js `Image` component auto-optimizes

### Change Fonts
Currently using Inter from Google Fonts. Edit `app/layout.js` to use another font.

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Other Platforms
- Build: `npm run build`
- Start: `npm start`
- Port: 3000 (configurable)

### Environment Variables
On your hosting platform, set:
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASSWORD`
- `SMTP_FROM`

## API Routes

### POST `/api/contact`
Sends contact form submission via email.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I'm interested in SEO services"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

**Error Cases:**
- Missing fields → 400
- Invalid email → 400
- Email service error → 500 (still logs locally)

## Performance

- **Image Optimization:** Next.js Image component + public/images
- **CSS Modules:** Scoped CSS, no conflicts
- **Bundle Size:** ~50KB gzipped (without dependencies)
- **Core Web Vitals:** Optimized for mobile

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### Images not loading
- Check image paths in `/public/images/`
- Verify image filenames match component imports

### Email not sending
- Check `.env.local` SMTP configuration
- Verify Gmail App Password (if using Gmail)
- Check server logs for errors
- Form still succeeds locally (logged to console)

### Styling issues
- Clear cache: `npm run build`
- Check CSS module imports
- Verify class names match

## Future Enhancements

- [ ] Add blog section
- [ ] Integrate real SEO analysis (PageSpeed, Lighthouse)
- [ ] Add testimonials/case studies
- [ ] Implement booking system
- [ ] Add analytics tracking (Google Analytics, Mixpanel)
- [ ] A/B testing variants
- [ ] Customer dashboard

## Support

For questions or issues:
1. Check `.env.local` configuration
2. Review console errors (`npm run dev`)
3. Test API with curl: `curl -X POST http://localhost:3000/api/contact`

---

**Built with Next.js 14, React 18, CSS Modules**
