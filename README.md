# Your Name — Portfolio

A dark, animated, responsive one-page portfolio for a photographer / videographer / web & Python developer.
Built with plain HTML, CSS and JavaScript — no build step, no frameworks.

## Signature design idea

The whole visual system is built around a **camera aperture**: the hero photo sits inside an animated
aperture ring, the preloader is an opening iris, section eyebrows are labeled like f-stops
(`f/1 — HOME`, `f/2 — ABOUT`...), and the nav marker echoes the same shape. It's meant to tie the
photography and development sides of the work together rather than using generic numbered badges.

## Quick start

1. Unzip the folder.
2. Open `index.html` directly in a browser — everything is static, no server or build tools required.
3. To edit content, edit the text directly inside `index.html`.

## File structure

```
portfolio/
├── index.html          → all page markup & content
├── css/style.css        → design tokens (colors, fonts) + all styling
├── js/script.js          → preloader, typing effect, nav, reveal animations,
│                          counters, skill bars, lightbox gallery, testimonial
│                          slider, contact form handling
├── images/               → placeholder SVGs (profile, projects, gallery, clients)
├── cv/My_CV.pdf          → placeholder résumé (replace with your real PDF)
└── README.md
```

## Customize

- **Name & copy** — search `index.html` for "Your Name" and the hero/about text and replace with your own.
- **Colors** — all colors are CSS variables at the top of `css/style.css` under `:root`
  (`--blue`, `--purple`, `--cyan`, `--ink`, etc). Change once, updates everywhere.
- **Typing roles** — edit the `roles` array near the top of `js/script.js`.
- **Images** — replace files in `images/` with your own photos, keeping the same filenames
  (or update the `src` attributes in `index.html`). `profile.svg` → your headshot,
  `project1–6.svg` → project screenshots, `gallery1–8.svg` → photography samples.
- **Résumé** — replace `cv/My_CV.pdf` with your real CV, same filename, or update the two
  `href="cv/My_CV.pdf"` links in `index.html`.
- **Social links & contact info** — update the `href="#"` placeholders in the hero, footer
  and contact section, plus the phone/email/WhatsApp number in the Contact section.

## Wiring up the contact form (EmailJS)

The form works out of the box in "demo" mode (it shows a success message but doesn't send anything).
To make it send real emails:

1. Create a free account at [emailjs.com](https://www.emailjs.com) and set up an Email Service + Template.
2. Add the SDK to `index.html`, just before `<script src="js/script.js">`:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
   ```
3. In `js/script.js`, fill in your own IDs:
   ```js
   const YOUR_EMAILJS_PUBLIC_KEY = 'your_public_key';
   const YOUR_EMAILJS_SERVICE_ID = 'your_service_id';
   const YOUR_EMAILJS_TEMPLATE_ID = 'your_template_id';
   ```
4. Uncomment the `emailjs.init(...)` line near the top of the contact-form section in `js/script.js`.

## Notes

- Respects `prefers-reduced-motion` — animations are disabled for users who request it.
- Uses Font Awesome (CDN) for icons and Google Fonts (Space Grotesk, Poppins, JetBrains Mono).
- Fully responsive down to small mobile widths, with a slide-in nav menu below 720px.
- Deploy anywhere that serves static files: GitHub Pages, Netlify, Vercel, or any basic web host.
