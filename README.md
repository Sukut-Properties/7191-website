# 71-91, LLC Website

Informational website for 71-91, LLC, a construction material disposal site in Corona, CA.

**Live Site:** https://7191dumpsite.com

## Features

- Responsive single-page design (mobile-first)
- Real-time Open/Closed status indicator
- Interactive price calculator
- FAQ accordion
- Email newsletter signup (Mailerlite integration)
- Downloadable PDF price list

## Tech Stack

- HTML5
- CSS3 (custom properties, flexbox, grid)
- Vanilla JavaScript
- Google Fonts (Inter)

## Hosting

- **Domain:** Namecheap
- **Hosting:** Netlify (free tier)
- **SSL:** Let's Encrypt (auto-provisioned by Netlify)

## Local Development

Simply open `index.html` in a browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve
```

## Deployment

This repo is connected to Netlify for **continuous deployment**. Any push to the `master` branch automatically builds and publishes to production at https://7191dumpsite.com — no manual steps required.

To deploy changes:

1. Commit locally
2. `git push origin master`
3. Netlify picks up the push and publishes within ~1 minute

## Business Hours

Current hours: **Mon–Fri 6:00 AM – 3:30 PM**, Saturday by request, Sunday closed. The site does not list a separate last-load cutoff.

Hours appear in three places. Update all of them together:

1. `index.html` – hero line (`.hero-hours`)
2. `index.html` – Hours of Operation table (`.hours-table`)
3. `script.js` – `openTime` / `closeTime` and the "Open Now" message in `updateStatus()` (drives the Open/Closed badge, Pacific time)

## Files

- `index.html` - Main HTML structure
- `styles.css` - All styling
- `script.js` - Interactive functionality
- `2026-Price-List.pdf` - Downloadable price sheet

## Contact

- **Field Contact:** Max - (714) 318-7949
- **Office:** Jeff - (714) 460-1015
- **Location:** 11901 Highway 71, Corona, CA 92881
