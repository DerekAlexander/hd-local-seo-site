# How to Read Your SEO Report: A Plain-English Guide

You just received an SEO report for your website. It's full of numbers, technical terms, and colorful charts. But what does any of it actually mean? And which numbers should you actually care about?

This guide walks you through the most common SEO metrics in everyday language so you can understand what's working and what needs fixing.

## Core Web Vitals: How Your Site Performs

Core Web Vitals are Google's way of measuring the user experience on your website. They directly affect your rankings and show up on almost every modern SEO report.

### Largest Contentful Paint (LCP)

**What it measures:** How fast the biggest thing on your page loads — usually a large image or a hero banner.

**The goal:** Under 2.5 seconds.

**Why it matters:** If your LCP is slow, visitors see a partially blank page while they wait. Many will leave before it finishes loading. This usually means your images are too large, your server is slow, or something is blocking the page from rendering.

**On your report:** A number in seconds. Under 2.5 is good (green). Between 2.5 and 4 needs improvement (yellow). Over 4 is poor (red).

### Interaction to Next Paint (INP)

**What it measures:** How quickly your site responds when someone clicks a button, fills out a form, or taps a menu.

**The goal:** Under 200 milliseconds.

**Why it matters:** A high INP means your site feels sluggish. Someone taps "Submit" and nothing happens for a beat — it feels broken even when it's working.

**On your report:** A number in milliseconds. Under 200ms is good. Over 500ms is poor.

### Cumulative Layout Shift (CLS)

**What it measures:** How much content moves around while your page loads.

**The goal:** Under 0.1.

**Why it matters:** You start reading an article on your phone, and the text suddenly jumps because an image loaded above it. That's bad CLS. It's frustrating for visitors and Google factors it into rankings.

**On your report:** A decimal number. Under 0.1 is good. Over 0.25 is poor.

**Key point:** Real user data (field data) matters more than simulated lab tests. PageSpeed Insights shows both — focus on the field data.

## Crawlability and Indexing: Can Google See You?

Before your site can rank, Google has to find it, read it, and store it. Your report might flag issues here.

### Pages Indexed

This is the number of pages Google has stored in its database. If a page isn't indexed, it will never appear in search results. Compare the pages you have to what Google has indexed. If you have 20 pages but Google only indexed 10, half your content is invisible.

### Orphan Pages

An orphan page has no other pages linking to it. Google discovers pages by following links, so pages without internal links may never be found. Every important page should be linked from at least one other page.

### Crawl Errors

These happen when Google tried to visit a page but ran into a problem — a missing page (404 error), a page blocked by robots.txt, or a server error. Any error listed here needs attention.

## On-Page SEO: What's on Your Pages

### Title Tags

The clickable headline in Google search results. One of the most important ranking factors.

**Check for:**
- **Length:** 50-60 characters. Longer gets cut off with "..." which hurts clicks.
- **Keyword placement:** Your main keyword should appear, ideally in the first 30 characters.
- **Uniqueness:** Every page needs a different title. Duplicates confuse Google.

### Meta Descriptions

The short text under your title in search results. Doesn't directly affect rankings, but strongly affects whether people click.

**Check for:**
- **Length:** 150-160 characters. Too short wastes space; too long gets cut off.
- **Keyword:** Including your keyword gets it bolded in results, drawing attention.
- **Call to action:** Phrases like "Learn how" or "Get started" increase clicks.
- Google rewrites descriptions sometimes, but well-written ones are used about 70% of the time.

### Headers (H1, H2, H3)

Headers organize your content. Google reads them to understand your page's topic.

**Check for:**
- **One H1 per page** — the main headline. Multiple H1s confuse the hierarchy.
- **H2s for sections, H3s for subsections** — proper structure helps Google and can earn featured snippets.
- **Keyword variations in headers** — don't repeat the same exact keyword; use related terms.

### Image Optimization

Google can't "see" images. It relies on text to understand them.

**Check for:**
- **Alt text:** Every image needs a descriptive alt text. "Golden retriever playing fetch" is good. "dog" is not. Include keywords only when natural — forced keywords can trigger penalties.
- **File names:** `roof-repair-process.jpg` tells Google something. `IMG_4532.jpg` tells it nothing.
- **File size:** Images over 100KB slow down your page. Compress them and use modern formats like WebP (25-35% smaller than JPEG).

## Keyword Performance

### Keyword Rankings

Where your site appears in Google for specific search terms. Position 1 is the top result; position 10 is the bottom of page one.

**What matters:** Positions 1-3 get the vast majority of clicks. Page 2 (positions 11-20) means you're close but getting very little traffic. Track your key terms over time — are they moving up or down?

### Keyword Density

How often your target keyword appears on a page. Keep it under 3% — modern Google detects unnatural repetition. Use related terms and variations to show topic depth.

## Security and Speed

### HTTPS

Your site must use HTTPS. The "Not Secure" warning scares visitors and hurts rankings. Mixed content (some resources loading through HTTP on an HTTPS page) breaks the padlock and needs fixing too.

### Server Response Time

TTFB (Time to First Byte) measures how fast your server responds — ideally under 200 milliseconds. If it's slow, your hosting may be the bottleneck.

## Reading Your Report: Priorities in Order

1. **Can Google find and index your pages?** If pages are missing, nothing else matters.
2. **Are Core Web Vitals passing?** Speed and stability directly affect rankings.
3. **Are title tags and meta descriptions well-written and unique?** These control what people see in search results.
4. **Are you moving up for target keywords?** This is the ultimate measure of progress.

SEO is a marathon. Your report gives you a snapshot of today. The goal is consistent improvement — faster pages, better content, higher rankings, and more customers finding you through search.
