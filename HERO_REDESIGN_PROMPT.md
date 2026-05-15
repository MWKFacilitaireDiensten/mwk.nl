# Hero Section Redesign Prompt

## Doel
Maak de hero-sectie van de MWK Facilitaire Diensten website moderner, visueel interessanter en professioneler door:
- Een dynamische gradient-achtergrond te implementeren
- Decoratieve SVG-elementen beter in te zetten
- Animatie-effecten toe te voegen
- Visuele hiërarchie en contrast te verbeteren

---

## Huidige Staat
- **Achtergrond**: Vlakke donker blauwe kleur (#2b3181)
- **Decoratie**: Subtiele radiale gradient cirkel (bottom-left, 25% opacity)
- **SVG element**: Huismerk-SVG rechts met 25% opacity
- **Animaties**: Basale fade-in animaties op tekst en buttons

---

## Implementatie-richtlijnen

### 1. Gradient-Achtergrond (PRIMARY)
Vervang `background: var(--clr-primary)` door een aantrekkelijke multi-layer gradient:

**Optie A - Diagonale Gradient (Modern)**
```
background: linear-gradient(135deg, #2b3181 0%, #1e2360 45%, #0099b1 100%);
```

**Optie B - Radiale Gradient (Elegant)**
```
background: radial-gradient(circle at 20% 50%, #2b3181 0%, #1e2360 50%, #0099b1 100%);
```

**Optie C - Multi-Stop Gradient (Dynamic)**
```
background: linear-gradient(135deg, #2b3181 0%, #3d45a0 25%, #0099b1 75%, #1e2360 100%);
```

**Aanbeveling**: Optie A of B gebruiken voor professioneel, modern uiterlijk.

---

### 2. Decoratieve SVG-Element Verbetering

#### A. Verhoog Opacity & Grootte
- Verander `.hero__micel` opacity van `0.25` naar `0.35-0.45`
- Optioneel: voeg `filter: brightness(1.1)` toe voor meer zichtbaarheid

#### B. Voeg Animatie toe aan SVG
Voeg zachtjes rotatie en "breathing" effect toe:
```css
.hero__micel {
  animation: floatingSvg 6s ease-in-out infinite;
}

@keyframes floatingSvg {
  0%, 100% { 
    transform: translateY(-50%) rotate(0deg) scale(1);
  }
  50% { 
    transform: translateY(-50%) rotate(3deg) scale(1.02);
  }
}
```

---

### 3. Subtiele Texture/Pattern Overlay
Voeg een texture-laag toe aan `.hero::before` (nieuw pseudo-element):
```css
.hero::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60"><defs><pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/></pattern></defs><rect width="100%" height="100%" fill="url(%23grid)"/></svg>');
  pointer-events: none;
  z-index: 1;
}
```

---

### 4. Accent-Kleur Highlights
Verhoog `.hero::after` effect met betere zichtbaarheid:
```css
.hero::after {
  content: '';
  position: absolute;
  bottom: -120px; left: -80px;
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(0,153,177,.15) 0%, transparent 60%);
  border-radius: 50%;
  pointer-events: none;
  z-index: 2;
  animation: pulseGlow 4s ease-in-out infinite;
}

@keyframes pulseGlow {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 0.9; }
}
```

---

### 5. Verbeterde Z-Index Structuur
Zorg voor juiste laagvolgorde:
```
0: Texture overlay (.hero::before)
1: Content (.hero__content)
2: Glow effect (.hero::after)
2: Decoratieve SVG (.hero__micel)
```

---

## CSS Wijzigingen Samenvatting

### Vervangen:
1. `.hero` background property
2. `.hero::after` styling
3. `.hero__micel` styling (add animation)
4. Voeg `.hero::before` toe voor texture

### Toevoegen:
1. `@keyframes floatingSvg`
2. `@keyframes pulseGlow`
3. SVG texture via `::before`

---

## Testcriteria - Controleer of:
- ✅ Hero-achtergrond ziet er moderner uit met gradient
- ✅ SVG-decoratie is meer zichtbaar en elegant
- ✅ Subtiele animaties werken vloeierder
- ✅ Tekst contrast blijft goed leesbaar (wit op gradient)
- ✅ Mobile responsiveness behouden (teste op kleinere schermen)
- ✅ Performance blijft goed (geen lag bij animaties)

---

## Optional: Verdere Verbeteringen
1. **Parallax effect** op scroll
2. **Button glow effects** met hover-animaties
3. **Meer decoratieve shapes** toevoegen (circles, blobs)
4. **Color shift animation** op background (subtiel kleur veranderen over tijd)
5. **Glasmorphism cards** voor extra modern effect

---

## Files die Aangepast Moeten Worden
- **css/style.css** - Hero section styling
- Optioneel: **index.html** - SVG source of extra decoratieve elementen

---

## Geschatte Implementatietijd
- **Basis**: 15-20 minuten
- **Met animaties**: 30-40 minuten
- **Full polish**: 1 uur
