Clean deploy-ready portfolio

Contents:
- index.html    (cleaned)
- vercel.json   (static config)
- _redirects     (rewrite to index)
- DEPLOY_TO_VERCEL.txt
- favicon.svg

How to deploy (two options):

1) Deploy the `clean_portfolio` folder as the project root on Vercel:
   - Go to https://vercel.com/new
   - Import your GitHub repo
   - In "Root Directory" set: `clean_portfolio`
   - Leave build settings (Vercel will serve static `index.html`)
   - Deploy

2) Deploy repository root (recommended if you want other files available):
   - Use default import on Vercel (no root set)
   - Ensure `vercel.json` at repo root points to `index.html`

Local test (quick):

```powershell
# From repository folder or clean_portfolio folder
python -m http.server 8000
# Open http://localhost:8000 or http://localhost:8000/clean_portfolio
```

Notes:
- External resources (Font Awesome, Google Fonts, GitHub widgets) are loaded from CDNs.
- Mailto and external links include `rel="noopener"` for security.
- If you prefer, I can move `clean_portfolio` contents to the repo root and archive duplicates.
