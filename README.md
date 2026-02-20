# Unblocked Games Hub

A collection of fun, unblocked web games built with React, Vite, and Tailwind CSS.

## How to publish to GitHub Pages

1. **Build the project**:
   Run `npm run build` in your terminal. This will create a `dist` folder.
2. **Upload to GitHub**:
   Push your code to a GitHub repository.
3. **Configure GitHub Pages**:
   - Go to your repository **Settings**.
   - Click on **Pages** in the left sidebar.
   - Under **Build and deployment**, set **Source** to "GitHub Actions" (recommended for Vite) or "Deploy from a branch".
   - If using "Deploy from a branch", you can use the `gh-pages` branch and upload the contents of the `dist` folder there.

### Recommended: GitHub Actions Deployment

Create a file at `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm install
      - run: npm run build
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## Features

- **Retro Snake**: Classic arcade gameplay.
- **Brick Breaker**: Challenging breakout-style game.
- **Pixel Clicker**: Fast-paced clicking challenge.
- **Brutalist Design**: Bold, high-contrast UI.
- **Responsive**: Works on desktop and mobile.
- **No Tracking**: Privacy-focused, no ads.
