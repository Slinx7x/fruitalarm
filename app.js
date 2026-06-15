# FruitAlarm — Complete Setup Guide
### Blox Fruits Stock Notifier | Fan Project

---

## Your File Structure

```
FruitAlarm/
├── index.html       ← The app (open this in browser)
├── style.css        ← Dark theme styling
├── app.js           ← App brain — alarm, wishlist, UI
├── fruits.js        ← All 41 verified fruits + prices
├── icons.js         ← SVG icons for every fruit
├── manifest.json    ← Makes it installable on Android
├── sw.js            ← Offline support
├── icon.svg         ← App icon
│
└── backend/
    ├── server.js    ← Stock bot (scrapes FruityBlox every 2-4 hrs)
    └── package.json ← Backend config
```

---

## STEP 1 — Test locally on your laptop

1. Open VS Code → open your `FruitAlarm` folder
2. Right-click `index.html` → **Open with Live Server**
   - No Live Server? Press `Ctrl+Shift+X` → search "Live Server" → Install
3. App opens in Chrome
4. Stock shows "Backend not deployed yet" — that's correct for now
5. Test the alarm button, wishlist checkboxes, and countdown timer

---

## STEP 2 — Update your GitHub repo (backend)

> Already did this before? Just UPDATE the existing files — don't create a new repo.

### If you already have a repo from before:

1. Go to **github.com** and open your `fruitalarm-backend` repository
2. Click on **`server.js`**
3. Click the **pencil ✏️ icon** (top right of the file view)
4. Press `Ctrl+A` to select ALL the old code
5. Delete it, then paste the new `server.js` code
6. Scroll down → click **"Commit changes"** → **"Commit directly to main"** → **Confirm**
7. Go back to repo → click **`package.json`** → pencil icon → replace code → Commit

Render.com will **auto-detect** the update and redeploy in 1-2 minutes. Done!

### If you are setting up for the first time:

1. Go to **github.com** → click green **"New"** button
2. Repository name: `fruitalarm-backend`
3. Keep it **Public** → click **"Create repository"**
4. Click **"uploading an existing file"**
5. Drag BOTH files from your `FruitAlarm/backend/` folder:
   - `server.js`
   - `package.json`
6. Click **"Commit changes"**

---

## STEP 3 — Deploy on Render.com (free hosting)

> Already deployed before? Render auto-redeploys when GitHub updates.
> You only need to do this section ONCE ever.

1. Go to **render.com** → sign in with GitHub
2. Click **"New +"** → **"Web Service"**
3. Connect GitHub if asked → select `fruitalarm-backend`
4. Fill in the form:
   - **Name:** fruitalarm-backend
   - **Region:** Singapore *(closest to India)*
   - **Branch:** main
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Instance Type:** Free
5. Click **"Create Web Service"**
6. Wait 2-3 minutes for deploy
7. You get a URL like: `https://fruitalarm-backend.onrender.com`
8. **Copy that URL!**

---

## STEP 4 — Connect app to backend

1. Open `FruitAlarm/app.js` in VS Code
2. Find **line 4**:
   ```javascript
   const BACKEND_URL = "https://fruitalarm-backend.onrender.com";
   ```
3. Replace with YOUR actual Render URL
4. Save the file

---

## STEP 5 — Test the live stock

1. Visit your Render URL + `/stock` in browser:
   ```
   https://YOUR-URL.onrender.com/stock
   ```
2. You should see JSON like:
   ```json
   {
     "normalStock": ["rocket", "spin", "diamond"],
     "mirageStock": ["flame", "sand"],
     "source": "fruityblox",
     "lastUpdated": "2025-..."
   }
   ```
3. If you see `"source": "fruityblox"` — it's working perfectly!
4. If you see `"source": "fallback"` — the scraper had trouble, wait 4 hours and try again

---

## STEP 6 — Host the website free on GitHub Pages

1. Go to GitHub → create a **new** repository called `fruitalarm` (lowercase)
2. Upload ALL files from your `FruitAlarm/` folder:
   - `index.html`, `style.css`, `app.js`, `fruits.js`, `icons.js`
   - `manifest.json`, `sw.js`, `icon.svg`
   - ⚠️ Do NOT upload the `backend/` folder
3. Go to **Settings → Pages**
4. Source: **"Deploy from a branch"**
5. Branch: **main** → **/ (root)** → Save
6. Wait 1-2 minutes
7. Your site is live at:
   ```
   https://YOURUSERNAME.github.io/fruitalarm
   ```

Share this link with players!

---

## STEP 7 — Keep the server awake 24/7 (important!)

Render's free tier sleeps after 15 minutes of no traffic.
First visit after sleep = 30 second delay.
Fix this for free:

1. Go to **uptimerobot.com** → create free account
2. Click **"Add New Monitor"**
3. Monitor type: **HTTP(s)**
4. Friendly name: `FruitAlarm Backend`
5. URL: `https://YOUR-RENDER-URL.onrender.com/health`
6. Monitoring interval: **5 minutes**
7. Save

UptimeRobot pings your server every 5 minutes → it never sleeps.

---

## STEP 8 — Let players install it as an app (Android)

When players visit your GitHub Pages site on Android Chrome:
1. Tap the **3-dot menu** (top right)
2. Tap **"Add to Home Screen"**
3. App installs with your icon — looks exactly like a real app!

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Stock shows "Backend not deployed" | Complete Steps 2-4 above |
| Stock shows "Cached" not "fruityblox" | FruityBlox page changed — visit `/force-refresh` on your Render URL |
| Alarm doesn't ring | You must click something first (browser rule). Use the Test button |
| Images not showing | Normal — icons are code-generated, no external images needed |
| Render URL gives error | Wait 2-3 min after deploy, then try again |

---

## Force a manual stock refresh

If stock looks wrong, visit this in your browser:
```
https://YOUR-RENDER-URL.onrender.com/force-refresh
```
Then wait 5 seconds and refresh your app.

---

## Revenue Plan

Once you have real users visiting the site:

1. Sign up at **adsense.google.com**
2. Add the AdSense script to `index.html` (5 minutes)
3. Ads show on your website → earn per visit
4. Goal: ₹2,100 ($25) → publish to Google Play Store

---

## Quick Checklist Before Sharing

- [ ] Backend deployed on Render.com
- [ ] `/stock` endpoint returns `"source": "fruityblox"`
- [ ] `BACKEND_URL` in `app.js` points to your Render URL
- [ ] Website live on GitHub Pages
- [ ] UptimeRobot keeping server awake
- [ ] Test alarm plays sound
- [ ] Wishlist saves when you refresh

