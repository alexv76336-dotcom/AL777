# Deployment Guide — Alex Dashboard

## ⚡ Schnellstart (Vercel — empfohlen)

### Option 1: GitHub + Vercel automatisch verbinden (Easiest)

1. Gehe zu https://vercel.com
2. Sign up / Log in
3. Klick "Add New..." → "Project"
4. Wähle dein GitHub Repo `AL777`
5. Klick "Deploy"
6. Fertig! 🎉

Bei jedem `git push` wird automatisch deployed.

### Option 2: Lokal via Vercel CLI

```bash
# 1. Vercel CLI installieren
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy (im AL777-Verzeichnis)
vercel

# 4. Folge den Prompts
# - Willst du ein neues Projekt? → y
# - Projekt-Name? → AL777 (oder was du möchtest)
# - Framework? → Next.js (auto-erkannt)

# 5. Production Deploy
vercel --prod
```

Deine App läuft dann unter:
- `https://al777.vercel.app` (automatisch)
- Oder custom domain (in Vercel Settings)

---

## 🚀 Andere Deployment-Optionen

### Netlify
```bash
npm run build
# Dann .next Folder zu Netlify deployen
```

### Eigener Server (VPS/Node.js)
```bash
npm install
npm run build
npm start
# Port 3000 öffnen
```

### Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "start"]
EXPOSE 3000
```

---

## 📝 Nach dem Deployment

1. **Domain einrichten** (optional):
   - Vercel: Dashboard → Settings → Domains
   - Oder custom DNS record

2. **Environment Variables** (falls Supabase/Anthropic):
   - Vercel: Settings → Environment Variables
   - Add `NEXT_PUBLIC_*` prefixed vars

3. **Testen**:
   - Öffne deine Deployment-URL
   - Klick auf die Tiles
   - Teste localStorage-Speicherung

---

## 🔄 Updates

Nach dem Vercel-Setup ist es super einfach:

```bash
# Edit code lokal
vim public/tiles/vee.html
# Commit & Push
git add .
git commit -m "Update vee tile"
git push origin main

# ✨ Automatisch deployed zu Vercel!
```

---

## ❓ Häufige Probleme

**"Build fehlgeschlagen"**
- Vercel Logs checken: https://vercel.com/dashboard
- Node Version: Mindestens 20
- Dependencies: `npm install` lokal testen

**"Tiles sind leer"**
- Cache leeren (Cmd+Shift+R / Ctrl+Shift+R)
- Browser DevTools → Network → checke Tile-Requests

**"localhost:3000 funktioniert, aber Vercel nicht"**
- Environment Variables checken
- `.env.local` ist NOT deployed (muss in Vercel Settings)

---

## 💡 Tipps

- **Vercel ist kostenlos** für Open Source/Personal Projects
- **Automatisches SSL** — deine Domain ist sofort HTTPS
- **Analytics** — Vercel Dashboard zeigt Traffic
- **Edge Functions** — Falls du später API-Endpoints brauchst

Fertig! Dein Dashboard läuft bald auf einer echten Domain. 🌐
