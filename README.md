# Engineering Portfolio

A bilingual (Indonesian / English) dark editorial portfolio built with React and Vite.

## Requirements
- Node.js LTS
- npm
- Git (recommended)

## Run locally
```bash
npm install
npm run dev
```
Open the local URL printed by Vite, usually `http://localhost:5173`.

## Production build
```bash
npm run build
npm run preview
```

## Where to edit content
- `src/data.js`: project entries, Indonesian and English text, navigation labels, page copy.
- `src/App.jsx`: page structure, filters, cards, and interactions.
- `src/styles.css`: colors, typography, layout, and responsive design.
- `index.html`: page title and metadata.

## Add a work entry
Add an object to the `works` array in `src/data.js`. Use a unique `id`, one of these categories (`engineering`, `research`, `leadership`, `strategy`), and a status:
- `documentation-complete`
- `in-progress`
- `not-documented`

Keep summaries factual. Do not add results, metrics, tools, or responsibilities unless you can verify them.

## Publish for free with GitHub + Vercel
1. Create a GitHub repository and upload this project.
2. Sign in to Vercel with GitHub.
3. Choose **Add New → Project** and import the repository.
4. Framework preset: **Vite**.
5. Build command: `npm run build`.
6. Output directory: `dist`.
7. Click **Deploy**.

Vercel should detect the Vite setup automatically. The site uses React Router's browser history; if direct navigation to a nested route returns a 404 on your chosen host, configure the host's SPA fallback to serve `index.html` for app routes.

## Before publishing
- Replace the generic contact placeholder only after choosing a public email/link.
- Confirm project names, dates, technologies, personal contribution, and outcomes.
- Replace abstract CSS visuals with real photos/diagrams only when you have permission to publish them.
- Review any lab or organization material for confidential information and personal data.
