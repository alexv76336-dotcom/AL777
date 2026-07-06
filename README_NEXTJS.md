# Alex Dashboard — Next.js Edition 🚀

Ein vollständig überarbeitetes Dashboard auf Basis von **vitality-base**, mit moderner React/Next.js/TypeScript-Architektur.

## Architektur

### Struktur
- **`/app`** — Next.js App Directory (layout, pages, dashboard)
- **`/components`** — React-Komponenten (Header, Grid, Backdrop, Tiles)
- **`/lib`** — Utilities (tile chrome, gemGlyphs, vitality helpers)
- **`/public/tiles`** — Self-contained HTML tiles (vee, train, finance, health, fuel, vitals, peak, brand)
- **`/content`** — Static content (site config, German strings)

### Tiles (Slots)

| Slot | Datei | Inhalt |
|------|-------|--------|
| `vee` | `public/tiles/vee.html` | Tägliche Ziele & Aufgabenliste |
| `train` | `public/tiles/train.html` | Progressive-Overload Fitness-Coach |
| `finance` | `public/tiles/finance.html` | Vermögen, Abos, Budgettracking |
| `health` | `public/tiles/health.html` | WHOOP-Integration, Supplement-Routine |
| `fuel` | `public/tiles/fuel.html` | Koffein-Tracker |
| `vitals` | `public/tiles/vitals.html` | Wasser-Intake Progress |
| `peak` | `public/tiles/peak.html` | Nova KI-Coach (Anthropic-Integration) |
| `brand` | `public/tiles/brand.html` | Avatar-Designer |

## Features

✅ **Vollständig auf Deutsch** — Alle UI-Texte, Labels, Meldungen  
✅ **Moderne Tech Stack** — React 18, Next.js 14, TypeScript  
✅ **Animate Character Header** — HeroCrystal 3D-Animation  
✅ **Glasmorphismus-Design** — Mint (#6EE7B7) Accent  
✅ **localStorage-First** — Keine Datenbank nötig, optional Supabase  
✅ **Tile Bridge API** — `window.Vitality.save/load` für Tile-Datenspeicherung  
✅ **Responsive** — Mobile, Tablet, Desktop  

## Entwicklung

```bash
# Dependencies installieren
npm install

# Dev-Server starten (localhost:3000)
npm run dev

# Production build
npm build
npm start

# Linting
npm lint
```

## Tile-Erstellung

Jedes Tile ist eine vollständig **self-contained HTML-Datei**:

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <style>/* Alles inline */</style>
</head>
<body>
  <!-- HTML hier -->
  <script>
    const Vitality = {
      async save(data) {
        if (window.parent?.Vitality) 
          return window.parent.Vitality.save(data);
        localStorage.setItem('tile:data', JSON.stringify(data));
      },
      async load() {
        if (window.parent?.Vitality) 
          return window.parent.Vitality.load();
        return JSON.parse(localStorage.getItem('tile:data') || '[]');
      }
    };
  </script>
</body>
</html>
```

**Regeln:**
- Keine externen Requests (CDN, APIs)
- Alle CSS & JS inline
- Nutze `window.Vitality.save/load` für Persistierung
- Mint-Accent verwenden (#6EE7B7)
- Deutsch

## Deployment

```bash
# Vercel deployment
npm install -g vercel
vercel

# Oder manual
npm run build
vercel deploy --prod
```

## Personalisierung

1. **Siteconfig** — Bearbeite `content/site.ts`
   ```ts
   export const site = {
     name: 'Alex',
     greeting: 'Willkommen zurück',
   }
   ```

2. **Farben** — Ändere `:root`-Variablen in `app/globals.css`
   ```css
   --mint: #6EE7B7;
   --bg: #000000;
   ```

3. **Wallpaper** — Nutze `dashboardChrome.ts` für Background-Customization

## Migration von Alt-Dashboard

Die 8 alten Seiten wurden konvertiert:
- `main.html` → `vee.html` (Ziele)
- `gym.html` → `train.html` (Fitness)
- `finance.html` → `finance.html` (Finanzen)
- `health.html` → `health.html` (Gesundheit)
- `caffeine.html` → `fuel.html` (Energie)
- `po-water.html` → `vitals.html` (Wasser)
- `nova-lite.html` → `peak.html` (KI-Coach)
- `avatar-lab.html` → `brand.html` (Avatar)

Alle German-Übersetzungen wurden beibehalten. Datenverlust: **Nein** (lokale localStorage-Struktur kann migriert werden).

## Supabase Integration (Optional)

Um Cloud-Sync zu aktivieren:

```ts
import { initializeSupabase } from '@/lib/vitality/supabase'
const supabase = initializeSupabase()
```

Dann nutzen `window.Vitality.save/load` wie gewohnt — die Bridge synchronisiert automatisch.

## Support

- Bug Reports → GitHub Issues
- Feature Requests → Discussions
- Questions → claudecode

---

**Version:** 1.0.0  
**Built with:** vitality-base scaffold + 8 German tiles  
**Last Updated:** 2026-07-06
