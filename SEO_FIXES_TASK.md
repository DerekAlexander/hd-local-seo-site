# HD Local SEO - SEO Fix Batch

Apply all changes below to the repo at `/home/hydrodub/Studio/app_nextjs/`

## 1. Delete duplicate layout file
- **DELETE** `app/layout.js` 
- **KEEP** `app/layout.jsx` (this is the correct one with "HydrodubShop - San Antonio Local SEO")

## 2. Update layout.jsx - improve metadata and add OG tags
**File:** `app/layout.jsx`

Replace the metadata export with:
```jsx
export const metadata = {
  title: 'HydrodubShop SEO - San Antonio Local SEO Services',
  description: 'San Antonio local SEO services for contractors and small businesses. SEO audits, website builds, and ongoing optimization. Get found on Google Maps and local search.',
  openGraph: {
    title: 'HydrodubShop SEO - San Antonio Local SEO Services',
    description: 'San Antonio local SEO services for contractors and small businesses. SEO audits, website builds, and ongoing optimization.',
    url: 'https://hydrodubshopseo.com',
    siteName: 'HydrodubShop SEO',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HydrodubShop SEO - San Antonio Local SEO Services',
    description: 'San Antonio local SEO services for contractors and small businesses.',
  },
  alternates: {
    canonical: 'https://hydrodubshopseo.com',
  },
};
```

## 3. Add page-specific metadata to articles page
**File:** `app/articles/page.jsx`

Add this export before the default function:
```jsx
export const metadata = {
  title: 'SEO Articles & Guides - HydrodubShop SEO',
  description: 'Free SEO guides and articles for local businesses. Learn about local SEO, Google Business Profile, backlinks, schema markup, and more.',
  alternates: {
    canonical: 'https://hydrodubshopseo.com/articles',
  },
};
```

## 4. Rewrite Hero H1 to target local SEO keywords
**File:** `components/sections/Hero.jsx`

Change line 63-65:
```jsx
// FROM:
<h1 className={styles.heroHeading}>
  Ready To See Where your Business stands?
</h1>

// TO:
<h1 className={styles.heroHeading}>
  San Antonio Local SEO Services That Get You Found
</h1>
```

Also change the subtext on line 62:
```jsx
// FROM:
<p className={styles.heroSubtext}>Start with an audit.</p>

// TO:
<p className={styles.heroSubtext}>Free SEO audit for your business.</p>
```

## 5. Add id="about" to AboutUs section
**File:** `components/sections/AboutUs.jsx`

Change line 7:
```jsx
// FROM:
<section className={styles.section}>

// TO:
<section id="about" className={styles.section}>
```

Also wrap the text in proper heading + paragraph structure. Replace lines 8-26 with:
```jsx
<div className={styles.goldBlock}>
  <h2 className={styles.aboutTitle}>About HydrodubShop SEO</h2>
  <p className={styles.aboutText}>
    We are a small local team in San Antonio, an SEO agency focused on
    connecting you with leads, phone calls, and clients.
  </p>
  <p className={styles.aboutText}>
    We audit your online presence, find what&apos;s broken, then fix it.
    We don&apos;t just leave after. Our team makes consistent updates to
    keep you visible in the Google rankings.
  </p>
  <p className={styles.aboutText}>
    We stand apart through consistency and dedicated support. You&apos;re
    not another number to us - you&apos;re a human being trying to be successful.
  </p>
  <div className={styles.mapWrapper}>
```

## 6. Add LocalBusiness JSON-LD schema to homepage
**File:** `app/page.jsx`

Add this before the return statement in the Home function:
```jsx
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'HydrodubShop SEO',
  description: 'San Antonio local SEO services for contractors and small businesses.',
  url: 'https://hydrodubshopseo.com',
  telephone: '',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'San Antonio',
    addressRegion: 'TX',
    addressCountry: 'US',
  },
  areaServed: {
    '@type': 'City',
    name: 'San Antonio',
  },
  serviceType: ['SEO Services', 'Local SEO', 'Website Design', 'SEO Audits'],
};
```

Then add this inside the `<main>` tag, right after the opening `<main>`:
```jsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
```

## 7. Fix Footer
**File:** `components/layout/Footer.jsx`

Change copyright line 27:
```jsx
// FROM:
Copyright © 2025 HydrodubShop LLC- All Rights Reserved.

// TO:
Copyright © 2026 HydrodubShop LLC - All Rights Reserved.
```

Remove or fix the dead `#portfolio` link. Change line 24:
```jsx
// FROM:
<a href="#portfolio" className={styles.link}>portfolio</a>

// TO:
<a href="#services" className={styles.link}>services</a>
```

## 8. Fix articles page - remove broken Read More links
**File:** `app/articles/page.jsx`

Change the Read More link (line 70) from `href="#"` to just remove it or comment it out since the articles don't exist yet:
```jsx
// Remove the <a href="#">Read More</a> line entirely, or change to:
<span className={styles.readMore}>Coming Soon</span>
```

## Summary of files changed:
- DELETE: `app/layout.js`
- EDIT: `app/layout.jsx`
- EDIT: `app/page.jsx` (add JSON-LD)
- EDIT: `app/articles/page.jsx` (add metadata + fix links)
- EDIT: `components/sections/Hero.jsx` (rewrite H1)
- EDIT: `components/sections/AboutUs.jsx` (add id, heading, proper paragraphs)
- EDIT: `components/layout/Footer.jsx` (copyright, fix links)
