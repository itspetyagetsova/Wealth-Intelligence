# Wealth Intelligence

A prompt builder with 9 wealth frameworks. Pick a framework, add your own context, then copy the finished prompt or open it straight in Claude.

It's plain HTML, CSS and JavaScript with no build step and no dependencies. It runs on any static host, works offline after the first visit, and can be installed on a phone or desktop like a native app.

## Frameworks

| # | Framework | What it does |
|---|-----------|--------------|
| 01 | Billionaire Money Lens | Looks at any situation the way a billionaire would think about money |
| 02 | High-Income Opportunity Filter | Tests an idea for scalability and leverage |
| 03 | Wealth Blueprint | Builds a roadmap from where you are to $100K–$1M/month |
| 04 | Wealth Psychology Decoder | Finds the money beliefs that cap your income |
| 05 | Power Thinking Framework | Compares elite and average thinking in one area |
| 06 | Leverage System | Maps capital, people, technology and media leverage |
| 07 | Unfair Advantage Builder | Builds a moat around skills, distribution, network and positioning |
| 08 | Future Wealth Projection | Gives a blunt 3-year forecast of your current path |
| 09 | Elite Decision Model | Applies entrepreneurial decision-making to your situation |

## Features

- **Copy Prompt** puts the full prompt, including its focus points, on your clipboard.
- **Open in Claude** copies the prompt and opens claude.ai with it filled in.
- **Saved drafts:** whatever you type is kept in your browser, so it's still there when you come back.
- **Keyboard shortcut:** Ctrl + Enter (⌘ + Enter on a Mac) builds the prompt.
- **Installable and offline:** add it to your home screen and it opens full-screen, even with no signal.

## Project structure

```
wealth-intelligence/
├── index.html             Page layout
├── styles.css             All styling
├── frameworks.js          The 9 frameworks (edit this to add or change them)
├── app.js                 App behavior
├── manifest.webmanifest   App name, colors and icons for installing
├── sw.js                  Offline support
├── icon*.png, icon.svg    App icons
└── package.json           Local preview command (optional)
```

---

## 1. Upload to GitHub (no command line)

1. Sign in at [github.com](https://github.com) and click **+** → **New repository** (top right).
2. Name it `wealth-intelligence`, set it to **Public** (free GitHub Pages hosting needs a public repo), leave every checkbox unticked, and click **Create repository**.
3. On the empty repo page, click **uploading an existing file**.
4. Unzip `wealth-intelligence.zip` on your computer, open the folder, select **everything inside it** (not the folder itself) and drag it into the browser window.
5. Click **Commit changes**.

> The `.gitignore` file is hidden on most computers and may not get dragged in. That's fine, because the app doesn't need it.

### Or with Git

```bash
cd wealth-intelligence
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/wealth-intelligence.git
git push -u origin main
```

## 2. Put it live as an app

### Option A: GitHub Pages (free, simplest)

1. In your repo, go to **Settings** → **Pages**.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Pick **Branch: `main`** and folder **`/ (root)`**, then click **Save**.
4. Wait about a minute and refresh. Your link will be:
   `https://YOUR-USERNAME.github.io/wealth-intelligence/`

### Option B: Vercel or Netlify (free, supports a custom domain)

- **Vercel:** [vercel.com/new](https://vercel.com/new) → Import your GitHub repo → **Deploy**. Leave every setting at its default.
- **Netlify:** [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import an existing project** → pick the repo → **Deploy**.

Both redeploy on their own every time you change a file on GitHub.

## 3. Install it on your phone

- **iPhone (Safari):** open your live link, tap **Share**, then **Add to Home Screen**.
- **Android (Chrome):** open your live link, tap **⋮**, then **Install app** (or **Add to Home screen**).
- **Desktop (Chrome or Edge):** click the install icon at the right end of the address bar.

---

## Editing

- **Add or change a framework:** open `frameworks.js`. The comment at the top explains every field. Numbers on the cards follow the order of the list, so you never have to renumber anything.
- **Change colors:** edit the variables at the top of `styles.css`. `--accent` is the yellow.
- **After changing files:** in `sw.js`, raise the version in `const CACHE = 'wealth-iq-v2'` (for example to `v3`) so installed copies pick up the update.

## Preview on your computer (optional)

With [Node.js](https://nodejs.org) installed:

```bash
npm start
```

Then open http://localhost:3000. You can also double-click `index.html`. Everything works that way except offline mode, which needs a web server.

## Roadmap ideas

- Built-in AI answers (needs a small backend so your API key isn't exposed in the browser)
- History of built prompts
- Share a filled-in framework by link
- Your own custom frameworks, created inside the app
