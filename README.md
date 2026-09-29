# W3Leads — B2B Lead Finder Marketing Website

A high-performance, accessible, and enterprise-grade marketing website for **W3Leads**, built with **Next.js 16 (App Router)**, **TypeScript**, and **Tailwind CSS v4**.

---

## ⚡ Quick Start (Local Setup in 3 Minutes)

Follow these simple steps to run the website locally on your computer.

### Prerequisites

Make sure you have installed:
- **Node.js** (v18.17+ or v20 LTS recommended) — Check by typing `node -v` in terminal
- **npm** (v9+) or **yarn** / **pnpm**
- **Git** or **GitHub Desktop**

---

### Step 1: Clone or Download the Project

#### Using Git:
```bash
git clone https://github.com/your-username/w3leads.git
cd w3leads
```

#### Using GitHub Desktop:
1. Open **GitHub Desktop**.
2. Click **File** ➔ **Clone Repository...**
3. Select this repository from GitHub and choose your local folder.
4. Open the cloned folder in VS Code or your terminal.

---

### Step 2: Install Dependencies

Run the following command in the project root:

```bash
npm install
```

---

### Step 3: Create Local Environment File (`.env.local`)

The project requires an environment file for API URLs and port configurations. Copy `.env.example` to `.env.local`:

- **Windows PowerShell:**
  ```powershell
  Copy-Item .env.example .env.local
  ```
- **Windows Command Prompt (CMD):**
  ```cmd
  copy .env.example .env.local
  ```
- **Mac / Linux / Git Bash:**
  ```bash
  cp .env.example .env.local
  ```
- **Manual method:** Copy the `.env.example` file in file explorer, paste it in the same directory, and rename it to `.env.local`.

> [!NOTE]
> All default values in `.env.example` are pre-configured for local development. **You do not need to edit anything in `.env.local` to start working immediately.**

---

### Step 4: Start the Development Server

```bash
npm run dev
```

Open your browser and navigate to:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🌐 Routes to Check Locally

Once the dev server is running, verify all key pages:

| Page / Route | Local URL | Description |
| :--- | :--- | :--- |
| **Homepage** | [http://localhost:3000](http://localhost:3000) | Landing page with all 11 marketing sections |
| **Product Anchor** | [http://localhost:3000/#product](http://localhost:3000/#product) | Hero section with interactive search & lead card |
| **Blog (WP API)** | [http://localhost:3000/blog](http://localhost:3000/blog) | Real posts fetched from WordPress API with pagination |
| **Single Post** | [http://localhost:3000/blog/top-best-wordpress-caching-plugins](http://localhost:3000/blog/top-best-wordpress-caching-plugins) | SSG post page with sanitized content & metadata |
| **Login** | [http://localhost:3000/login](http://localhost:3000/login) | Form with validation & proxy route to Laravel API |
| **Sitemap** | [http://localhost:3000/sitemap.xml](http://localhost:3000/sitemap.xml) | Dynamic XML sitemap including all blog articles |
| **Robots** | [http://localhost:3000/robots.txt](http://localhost:3000/robots.txt) | Search engine crawler rules |
| **404 Not Found** | [http://localhost:3000/404-test](http://localhost:3000/404-test) | Custom 404 page |

---

## 🛠 Available NPM Scripts

| Command | Purpose |
| :--- | :--- |
| `npm run dev` | Starts local Next.js dev server on port `3000` |
| `npm run build` | Builds the optimized production bundle and generates static pages |
| `npm run start` | Runs the production server locally on port `3000` (after `npm run build`) |
| `npm run typecheck` | Validates TypeScript types across the entire project (`tsc --noEmit`) |
| `npm run lint` | Runs ESLint to check for code quality and syntax issues |

---

## 👥 Collaborator & Team Workflow (GitHub Desktop)

If you are collaborating on this repository:

1. **Keep `main` clean**: Do not commit directly to `main` for large features.
2. **Create a branch**:
   - In GitHub Desktop: Click **Current Branch** ➔ **New Branch** (e.g., `feature/contact-form` or `fix/footer-link`).
   - In CLI: `git checkout -b feature/your-feature-name`
3. **Make your changes** and test locally with `npm run typecheck` and `npm run lint`.
4. **Commit & Push**:
   - Write clear commit messages (e.g., `feat: add newsletter signup component`).
   - Push your branch to GitHub.
5. **Open a Pull Request (PR)** on GitHub for review and merge.

---

## ❓ Common Troubleshooting & FAQs

### 1. `Error: WP_POSTS_API must be a valid URL` or Zod Validation Error
- **Cause:** You forgot to create `.env.local`.
- **Fix:** Copy `.env.example` to `.env.local` as shown in Step 3.

### 2. `Port 3000 is already in use`
- **Cause:** Another terminal or application (like a previous dev server) is occupying port 3000.
- **Fix:**
  - Close the other terminal running the server, OR
  - Run Next.js on a different port:
    ```bash
    npm run dev -- -p 3005
    ```

### 3. Hydration Warning with Browser Extensions
- **Cause:** Some browser extensions (password managers, translate extensions) inject attributes like `bis_skin_checked="1"` into the DOM.
- **Fix:** The project has `suppressHydrationWarning` configured on `<html>` and `<body>` in `src/app/layout.tsx`. If you see extension warnings in dev mode console, they do not affect production builds.

---

## 📁 Project Architecture & File Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (marketing)/              # Route group for landing page
│   │   ├── layout.tsx            # Marketing layout with Header and Footer
│   │   └── page.tsx              # Landing page (Server Component)
│   ├── blog/                     # WordPress Blog Integration
│   │   ├── page.tsx              # Paginated blog index (SSG + ISR 300s)
│   │   └── [slug]/page.tsx       # Dynamic blog post with Article JSON-LD
│   ├── login/page.tsx            # Authentication page
│   ├── api/auth/login/route.ts   # Route handler proxying to Laravel login
│   ├── sitemap.ts                # Dynamic sitemap (includes blog posts)
│   ├── robots.ts                 # Robots.txt
│   ├── not-found.tsx             # Custom 404
│   ├── error.tsx                 # Error boundary
│   ├── layout.tsx                # Root layout (Fonts, SEO JSON-LD)
│   └── globals.css               # Design system tokens & Tailwind CSS
├── components/
│   ├── layout/                   # SiteHeader, SiteFooter, MobileNavigation
│   ├── sections/                 # 11 Modular landing page sections
│   ├── ui/                       # Button, Container, Badge, Accordion, Tabs, Counter
│   ├── blog/                     # BlogCard, BlogPagination, ArticleContent
│   └── auth/                     # LoginForm (react-hook-form + zod)
├── config/
│   ├── env.ts                    # Zod-validated environment config
│   ├── site.ts                   # Site metadata & constants
│   └── navigation.ts             # Navigation menu data
├── content/
│   └── landingContent.ts         # All copy and text separated from JSX
├── hooks/
│   ├── useIntersectionObserver.ts# Viewport intersection observer
│   └── useReducedMotion.ts       # A11y reduced motion detector
├── types/
│   └── index.ts                  # Shared TypeScript type definitions
└── lib/
    ├── wordpress/                # WP API client, mappers, HTML sanitizer
    ├── auth/                     # Session cookie handling, login service
    └── seo/                      # Schema.org JSON-LD and metadata generators
```

---

## 🎨 Design Tokens & Palette

| Token | Hex | Usage |
| :--- | :--- | :--- |
| **Background** | `#FBF8F3` | Warm ivory page background |
| **Surface** | `#FFFFFF` | Cards, input fields, white surfaces |
| **Surface Tint** | `#F3EEE6` | Alternating section backgrounds |
| **Ink** | `#1C1B18` | Primary body and heading text |
| **Ink Muted** | `#6B665C` | Secondary text, subtitles, captions |
| **Border** | `#E6DFD3` | Dividers and card borders |
| **Primary** | `#0F5D4A` | Deep emerald for CTA buttons and highlights |
| **Primary Light**| `#E8F5F0` | Soft emerald background for badges and pills |
| **Accent** | `#F2A20C` | Saffron for numbers and attention badges |
| **Coral** | `#FF6B4A` | Small alert indicators and error messages |
| **Dark** | `#1F1D1A` | Warm charcoal for Footer and final CTA band |

---

## 🚀 Production Deployment (`w3leads.in`)

When ready to deploy:

### Option A: Vercel (Easiest & Free)
1. Push this repo to GitHub.
2. Log into [vercel.com](https://vercel.com) and import the repository.
3. In **Environment Variables**, add:
   ```env
   NEXT_PUBLIC_SITE_URL=https://w3leads.in
   NEXT_PUBLIC_DASHBOARD_URL=https://dashboard.w3leads.in
   WP_POSTS_API=https://wpthrust.in//wp-json/wp/v2/posts/
   WP_SINGLE_POST_API=https://wpthrust.in//wp-json/wp/v2/posts/2196
   LOGIN_API=https://api-crm.wpthrust.in/api/login
   ```
4. In your Hostinger domain DNS for `w3leads.in`:
   - Point **A record (`@`)** to `76.76.21.21`
   - Point **CNAME (`www`)** to `cname.vercel-dns.com`

### Option B: Hostinger VPS
1. SSH into your VPS.
2. Clone repository: `git clone <repo-url>`
3. Create `.env.local` with `https://w3leads.in` URLs.
4. Build and start with PM2:
   ```bash
   npm install
   npm run build
   pm2 start npm --name "w3leads" -- start -- -p 3000
   pm2 save
   ```
5. Configure Nginx to reverse proxy port 80/443 to `http://127.0.0.1:3000`.
6. Issue SSL via Certbot: `sudo certbot --nginx -d w3leads.in -d www.w3leads.in`

---

## 📄 License

Proprietary — © W3Leads. All rights reserved.
