# Personal Website

A responsive personal portfolio site built with React and deployed as a static site on AWS, featuring a custom domain with HTTPS and CDN delivery via CloudFront.

**Live site:** [krieger-technologies.com](https://krieger-technologies.com)

---

## Tech Stack

![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![AWS S3](https://img.shields.io/badge/AWS_S3-FF9900?style=flat&logo=amazonaws&logoColor=white)
![CloudFront](https://img.shields.io/badge/CloudFront-FF9900?style=flat&logo=amazonaws&logoColor=white)

---

## Preview

![Site preview](assets/screenshot.png)

---

## Features

- **Multi-page layout** — Resume, and Projects, and sub-project sections
- **Responsive design** — optimized for both desktop and mobile viewports
- **Custom navigation bar** with smooth transitions
- **Translucent scrollable text overlay** on a full-bleed background image
- **HTTPS enforced** via AWS Certificate Manager + CloudFront
- **In-app browser compatibility** — resolved `www` subdomain routing issue that caused failures in Instagram, LinkedIn, and similar embedded browsers

---

## Architecture

```
React App (CRA)
    │
    └── npm run build
            │
            ▼
    AWS S3 Bucket (static hosting)
            │
            ▼
    AWS CloudFront (CDN + HTTPS)
            │
            ▼
    Route 53 → krieger-technologies.com
```

**Domain configuration:** Both `krieger-technologies.com` and `www.krieger-technologies.com` are registered as CloudFront alternate domain names, resolving in-app browser redirect failures caused by automatic `www.` prepending.

---

## Local Development

```bash
npm install
npm start       # dev server at localhost:3000
npm run build   # production build
```

---

## What I Built & Learned

- Registering a custom domain and wiring it through Route 53 → CloudFront → S3
- Configuring ACM certificates to enforce HTTPS across all routes
- Debugging in-app browser failures caused by missing `www` subdomain registration
- Building a responsive layout with a translucent scrollable content overlay using pure CSS
- Optimizing the mobile experience alongside the desktop layout