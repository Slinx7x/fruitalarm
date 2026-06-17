// ================================================================
//  FruitAlarm — icons.js
//  Generates a unique SVG icon for every fruit.
//  Each icon has:
//   - A rarity-colored background shape
//   - A unique symbol/drawing that represents the fruit
//  No external images needed. Works offline. Never breaks.
// ================================================================

const RARITY_COLORS = {
  mythical:  { bg:"#2d1054", border:"#c084fc", glow:"#a855f7", text:"#f3e8ff" },
  legendary: { bg:"#2d1e00", border:"#f59e0b", glow:"#d97706", text:"#fef3c7" },
  rare:      { bg:"#0c1e3d", border:"#3b82f6", glow:"#2563eb", text:"#dbeafe" },
  uncommon:  { bg:"#0a2010", border:"#22c55e", glow:"#16a34a", text:"#dcfce7" },
  common:    { bg:"#1a1a2e", border:"#6b7280", glow:"#4b5563", text:"#f3f4f6" },
};

// Each fruit gets a unique SVG path/shape drawn inside a 64x64 viewBox
// The icon should evoke the fruit's power/element
const FRUIT_ICONS = {
  // ── COMMON ──
  rocket:   `<path d="M32 8 L38 28 L32 24 L26 28 Z" fill="currentColor" opacity="0.9"/>
             <path d="M26 28 L38 28 L40 44 L32 40 L24 44 Z" fill="currentColor" opacity="0.7"/>
             <circle cx="24" cy="46" r="4" fill="#ef4444" opacity="0.8"/>
             <circle cx="40" cy="46" r="4" fill="#ef4444" opacity="0.8"/>`,

  spin:     `<circle cx="32" cy="32" r="16" fill="none" stroke="currentColor" stroke-width="3" opacity="0.4"/>
             <path d="M32 16 A16 16 0 0 1 48 32" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
             <path d="M48 32 A16 16 0 0 1 32 48" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" opacity="0.7"/>
             <path d="M32 48 A16 16 0 0 1 16 32" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" opacity="0.4"/>
             <circle cx="32" cy="16" r="3" fill="currentColor"/>`,

  blade:    `<rect x="30" y="10" width="5" height="32" rx="2" fill="currentColor" opacity="0.9"/>
             <path d="M32 10 L40 20 L32 22 Z" fill="currentColor"/>
             <rect x="24" y="38" width="16" height="4" rx="2" fill="currentColor" opacity="0.6"/>
             <rect x="28" y="42" width="8" height="8" rx="1" fill="currentColor" opacity="0.5"/>`,

  spring:   `<path d="M24 12 Q40 16 24 24 Q40 28 24 36 Q40 40 24 48" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/>
             <path d="M32 12 Q48 16 32 24 Q48 28 32 36 Q48 40 32 48" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" opacity="0.6"/>`,

  bomb:     `<circle cx="32" cy="35" r="16" fill="currentColor" opacity="0.85"/>
             <path d="M32 19 Q36 10 44 10 Q40 14 38 18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
             <circle cx="38" cy="10" r="3" fill="#fbbf24"/>
             <circle cx="26" cy="30" r="4" fill="white" opacity="0.25"/>`,

  smoke:    `<ellipse cx="26" cy="40" rx="8" ry="10" fill="currentColor" opacity="0.5"/>
             <ellipse cx="36" cy="34" rx="9" ry="11" fill="currentColor" opacity="0.6"/>
             <ellipse cx="30" cy="26" rx="7" ry="9" fill="currentColor" opacity="0.7"/>
             <ellipse cx="34" cy="18" rx="5" ry="7" fill="currentColor" opacity="0.85"/>`,

  spike:    `<polygon points="32,8 36,28 56,28 40,40 46,60 32,48 18,60 24,40 8,28 28,28" fill="currentColor" opacity="0.85"/>`,

  // ── UNCOMMON ──
  flame:    `<path d="M32 52 C20 52 14 42 18 32 C20 26 24 22 22 14 C28 20 26 26 30 28 C28 20 34 10 38 8 C36 18 42 22 44 30 C46 38 42 52 32 52 Z" fill="currentColor" opacity="0.9"/>
             <path d="M32 48 C26 48 22 42 24 36 C26 32 28 34 30 38 C30 32 34 28 36 26 C34 34 38 40 34 46 Z" fill="white" opacity="0.25"/>`,

  ice:      `<line x1="32" y1="8" x2="32" y2="56" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/>
             <line x1="8" y1="32" x2="56" y2="32" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/>
             <line x1="14" y1="14" x2="50" y2="50" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/>
             <line x1="50" y1="14" x2="14" y2="50" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/>
             <circle cx="32" cy="32" r="5" fill="currentColor"/>
             <circle cx="32" cy="8" r="3" fill="currentColor"/><circle cx="32" cy="56" r="3" fill="currentColor"/>
             <circle cx="8" cy="32" r="3" fill="currentColor"/><circle cx="56" cy="32" r="3" fill="currentColor"/>`,

  sand:     `<path d="M16 48 Q32 20 48 48 Z" fill="currentColor" opacity="0.4"/>
             <path d="M20 48 Q32 26 44 48 Z" fill="currentColor" opacity="0.6"/>
             <path d="M24 48 Q32 32 40 48 Z" fill="currentColor" opacity="0.85"/>
             <ellipse cx="32" cy="49" rx="16" ry="3" fill="currentColor" opacity="0.3"/>
             <circle cx="22" cy="20" r="2" fill="currentColor" opacity="0.5"/>
             <circle cx="38" cy="16" r="1.5" fill="currentColor" opacity="0.5"/>
             <circle cx="44" cy="24" r="2" fill="currentColor" opacity="0.5"/>`,

  dark:     `<circle cx="32" cy="32" r="18" fill="currentColor" opacity="0.85"/>
             <circle cx="32" cy="32" r="10" fill="black" opacity="0.5"/>
             <path d="M32 14 L32 8 M32 50 L32 56 M14 32 L8 32 M50 32 L56 32" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
             <circle cx="32" cy="32" r="4" fill="currentColor"/>`,

  eagle:    `<path d="M8 28 Q20 20 32 24 Q44 20 56 28 Q44 30 40 36 L50 50 L32 38 L14 50 L24 36 Q20 30 8 28 Z" fill="currentColor" opacity="0.9"/>
             <circle cx="32" cy="20" r="5" fill="currentColor"/>
             <path d="M29 18 L32 16 L35 18" fill="none" stroke="currentColor" stroke-width="1.5"/>`,

  diamond:  `<polygon points="32,8 48,28 32,56 16,28" fill="currentColor" opacity="0.85"/>
             <polygon points="32,8 48,28 32,32 16,28" fill="white" opacity="0.2"/>
             <polygon points="32,32 48,28 32,56" fill="white" opacity="0.08"/>`,

  // ── RARE ──
  light:    `<circle cx="32" cy="32" r="10" fill="currentColor"/>
             <line x1="32" y1="8" x2="32" y2="16" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
             <line x1="32" y1="48" x2="32" y2="56" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
             <line x1="8" y1="32" x2="16" y2="32" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
             <line x1="48" y1="32" x2="56" y2="32" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
             <line x1="15" y1="15" x2="21" y2="21" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
             <line x1="43" y1="43" x2="49" y2="49" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
             <line x1="49" y1="15" x2="43" y2="21" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
             <line x1="21" y1="43" x2="15" y2="49" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>`,

  rubber:   `<ellipse cx="32" cy="32" rx="16" ry="20" fill="none" stroke="currentColor" stroke-width="4" opacity="0.85"/>
             <ellipse cx="32" cy="32" rx="8" ry="12" fill="none" stroke="currentColor" stroke-width="3" opacity="0.6"/>
             <path d="M16 32 Q24 24 32 32 Q40 40 48 32" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.7"/>`,

  ghost:    `<path d="M16 48 L16 28 Q16 12 32 12 Q48 12 48 28 L48 48 L40 42 L32 48 L24 42 Z" fill="currentColor" opacity="0.8"/>
             <circle cx="25" cy="28" r="4" fill="white" opacity="0.7"/>
             <circle cx="39" cy="28" r="4" fill="white" opacity="0.7"/>
             <circle cx="26" cy="29" r="2" fill="#1a1a2e"/>
             <circle cx="40" cy="29" r="2" fill="#1a1a2e"/>`,

  magma:    `<path d="M32 10 L40 28 L52 30 L42 40 L44 54 L32 46 L20 54 L22 40 L12 30 L24 28 Z" fill="currentColor" opacity="0.85"/>
             <circle cx="32" cy="32" r="8" fill="#ef4444" opacity="0.6"/>
             <path d="M28 26 L32 22 L36 26 L32 30 Z" fill="#fbbf24" opacity="0.8"/>`,

  // ── LEGENDARY ──
  quake:    `<path d="M8 32 L20 20 L28 36 L36 16 L44 36 L52 24 L56 32" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
             <path d="M8 40 L20 28 L28 44 L36 24 L44 44 L52 32 L56 40" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.4"/>`,

  buddha:   `<circle cx="32" cy="24" r="10" fill="currentColor" opacity="0.9"/>
             <ellipse cx="32" cy="44" rx="18" ry="10" fill="currentColor" opacity="0.85"/>
             <path d="M20 22 Q14 18 16 12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.7"/>
             <path d="M44 22 Q50 18 48 12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.7"/>
             <path d="M26 28 Q32 32 38 28" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/>`,

  love:     `<path d="M32 48 L14 30 Q8 22 16 16 Q24 10 32 20 Q40 10 48 16 Q56 22 50 30 Z" fill="currentColor" opacity="0.9"/>
             <path d="M32 42 L20 30 Q16 24 22 20 Q28 16 32 24 Q36 16 42 20 Q48 24 44 30 Z" fill="white" opacity="0.15"/>`,

  creation: `<rect x="14" y="14" width="15" height="15" rx="2" fill="currentColor" opacity="0.85"/>
             <rect x="35" y="14" width="15" height="15" rx="2" fill="currentColor" opacity="0.7"/>
             <rect x="14" y="35" width="15" height="15" rx="2" fill="currentColor" opacity="0.7"/>
             <rect x="35" y="35" width="15" height="15" rx="2" fill="currentColor" opacity="0.85"/>
             <circle cx="32" cy="32" r="5" fill="currentColor"/>`,

  spider:   `<circle cx="32" cy="32" r="8" fill="currentColor" opacity="0.9"/>
             <line x1="32" y1="8" x2="32" y2="24" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
             <line x1="32" y1="40" x2="32" y2="56" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
             <line x1="10" y1="18" x2="24" y2="26" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
             <line x1="40" y1="38" x2="54" y2="46" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
             <line x1="54" y1="18" x2="40" y2="26" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
             <line x1="24" y1="38" x2="10" y2="46" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
             <line x1="8" y1="32" x2="24" y2="32" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
             <line x1="40" y1="32" x2="56" y2="32" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`,

  sound:    `<path d="M20 22 L28 22 L36 14 L36 50 L28 42 L20 42 Z" fill="currentColor" opacity="0.85"/>
             <path d="M40 20 Q48 28 40 44" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
             <path d="M44 14 Q56 28 44 50" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>`,

  portal:   `<circle cx="32" cy="32" r="20" fill="none" stroke="currentColor" stroke-width="3" opacity="0.4"/>
             <circle cx="32" cy="32" r="14" fill="none" stroke="currentColor" stroke-width="3" opacity="0.6"/>
             <circle cx="32" cy="32" r="8" fill="none" stroke="currentColor" stroke-width="3" opacity="0.85"/>
             <circle cx="32" cy="32" r="3" fill="currentColor"/>
             <path d="M32 12 L32 8 M52 32 L56 32" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.7"/>`,

  phoenix:  `<path d="M32 48 L18 28 Q12 16 24 14 Q30 12 32 20 Q34 12 40 14 Q52 16 46 28 Z" fill="currentColor" opacity="0.9"/>
             <path d="M32 38 L24 26 Q22 18 28 18 Q32 20 32 26 Q32 20 36 18 Q42 18 40 26 Z" fill="#fbbf24" opacity="0.5"/>
             <path d="M20 30 Q12 34 10 44 Q18 38 26 40" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.7"/>
             <path d="M44 30 Q52 34 54 44 Q46 38 38 40" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.7"/>`,

  lightning:`<path d="M38 8 L22 34 L32 34 L26 56 L46 26 L36 26 Z" fill="currentColor" opacity="0.9"/>`,

  blizzard: `<circle cx="32" cy="32" r="14" fill="none" stroke="currentColor" stroke-width="2.5" opacity="0.3"/>
             <line x1="32" y1="10" x2="32" y2="54" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
             <line x1="10" y1="32" x2="54" y2="32" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
             <line x1="16" y1="16" x2="48" y2="48" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
             <line x1="48" y1="16" x2="16" y2="48" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
             <circle cx="32" cy="32" r="4" fill="currentColor"/>
             <circle cx="32" cy="10" r="2.5" fill="currentColor"/><circle cx="32" cy="54" r="2.5" fill="currentColor"/>
             <circle cx="10" cy="32" r="2.5" fill="currentColor"/><circle cx="54" cy="32" r="2.5" fill="currentColor"/>`,

  pain:     `<path d="M32 8 L36 26 L54 26 L40 36 L46 54 L32 44 L18 54 L24 36 L10 26 L28 26 Z" fill="currentColor" opacity="0.7"/>
             <path d="M32 16 L34 26 L44 26 L36 32 L38 42 L32 36 L26 42 L28 32 L20 26 L30 26 Z" fill="currentColor" opacity="0.9"/>`,

  // ── MYTHICAL ──
  gravity:  `<circle cx="32" cy="32" r="12" fill="currentColor" opacity="0.85"/>
             <circle cx="14" cy="20" r="5" fill="currentColor" opacity="0.6"/>
             <circle cx="50" cy="20" r="5" fill="currentColor" opacity="0.6"/>
             <circle cx="14" cy="44" r="5" fill="currentColor" opacity="0.6"/>
             <circle cx="50" cy="44" r="5" fill="currentColor" opacity="0.6"/>
             <line x1="19" y1="20" x2="26" y2="26" stroke="currentColor" stroke-width="2" opacity="0.5"/>
             <line x1="45" y1="20" x2="38" y2="26" stroke="currentColor" stroke-width="2" opacity="0.5"/>
             <line x1="19" y1="44" x2="26" y2="38" stroke="currentColor" stroke-width="2" opacity="0.5"/>
             <line x1="45" y1="44" x2="38" y2="38" stroke="currentColor" stroke-width="2" opacity="0.5"/>`,

  mammoth:  `<ellipse cx="32" cy="38" rx="18" ry="14" fill="currentColor" opacity="0.85"/>
             <circle cx="22" cy="26" r="8" fill="currentColor" opacity="0.9"/>
             <circle cx="42" cy="26" r="8" fill="currentColor" opacity="0.9"/>
             <path d="M18 30 Q8 32 10 44 Q14 50 20 46" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
             <path d="M24 20 Q20 10 14 10 Q10 14 16 18" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
             <path d="M40 20 Q44 10 50 10 Q54 14 48 18" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>`,

  trex:     `<ellipse cx="36" cy="36" rx="14" ry="12" fill="currentColor" opacity="0.85"/>
             <ellipse cx="22" cy="28" rx="10" ry="9" fill="currentColor" opacity="0.9"/>
             <path d="M12 24 L22 22 L20 28 L14 30 Z" fill="currentColor"/>
             <path d="M14 28 L12 32 M17 30 L16 34 M20 31 L19 35" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
             <path d="M36 48 L30 56 L34 56 L28 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
             <circle cx="20" cy="26" r="2.5" fill="white" opacity="0.6"/>`,

  dough:    `<circle cx="32" cy="32" r="18" fill="currentColor" opacity="0.85"/>
             <circle cx="32" cy="32" r="10" fill="currentColor" opacity="0.5"/>
             <circle cx="32" cy="32" r="4" fill="currentColor" opacity="0.9"/>
             <circle cx="22" cy="22" r="4" fill="currentColor" opacity="0.6"/>
             <circle cx="42" cy="22" r="4" fill="currentColor" opacity="0.6"/>
             <circle cx="22" cy="42" r="4" fill="currentColor" opacity="0.6"/>
             <circle cx="42" cy="42" r="4" fill="currentColor" opacity="0.6"/>`,

  shadow:   `<path d="M16 48 Q16 20 32 20 Q48 20 48 48" fill="currentColor" opacity="0.7"/>
             <path d="M22 48 Q22 28 32 28 Q42 28 42 48" fill="currentColor" opacity="0.5"/>
             <path d="M10 48 L54 48" stroke="currentColor" stroke-width="2" opacity="0.3"/>
             <circle cx="32" cy="14" r="6" fill="currentColor" opacity="0.9"/>
             <path d="M26 14 Q20 8 20 2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
             <path d="M38 14 Q44 8 44 2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.5"/>`,

  venom:    `<path d="M32 10 C24 16 20 24 24 32 C20 36 18 44 24 50 C28 54 36 54 40 50 C46 44 44 36 40 32 C44 24 40 16 32 10 Z" fill="currentColor" opacity="0.85"/>
             <path d="M32 20 C28 24 27 30 30 34 C27 37 26 43 30 46 C34 50 38 46 37 42 C40 39 40 33 37 30 C40 26 38 20 32 20 Z" fill="white" opacity="0.15"/>
             <path d="M28 50 L24 58 M32 52 L32 60 M36 50 L40 58" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.6"/>`,

  gas:      `<ellipse cx="32" cy="44" rx="16" ry="8" fill="currentColor" opacity="0.6"/>
             <ellipse cx="26" cy="34" rx="12" ry="8" fill="currentColor" opacity="0.65"/>
             <ellipse cx="38" cy="28" rx="12" ry="8" fill="currentColor" opacity="0.7"/>
             <ellipse cx="30" cy="20" rx="10" ry="7" fill="currentColor" opacity="0.75"/>
             <ellipse cx="36" cy="14" rx="7" ry="5" fill="currentColor" opacity="0.85"/>`,

  spirit:   `<path d="M32 8 L36 28 L54 24 L40 36 L48 54 L32 44 L16 54 L24 36 L10 24 L28 28 Z" fill="currentColor" opacity="0.4"/>
             <path d="M32 14 L35 28 L48 26 L38 34 L42 48 L32 41 L22 48 L26 34 L16 26 L29 28 Z" fill="currentColor" opacity="0.7"/>
             <circle cx="32" cy="32" r="6" fill="currentColor"/>
             <path d="M32 8 L32 4 M54 24 L58 22 M48 54 L50 58 M16 54 L14 58 M10 24 L6 22" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.5"/>`,

  tiger:    `<ellipse cx="32" cy="36" rx="16" ry="14" fill="currentColor" opacity="0.85"/>
             <circle cx="32" cy="22" r="11" fill="currentColor" opacity="0.9"/>
             <path d="M24 16 L20 10 L22 16" fill="currentColor" opacity="0.8"/>
             <path d="M40 16 L44 10 L42 16" fill="currentColor" opacity="0.8"/>
             <path d="M26 22 L30 26 M38 22 L34 26" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
             <path d="M22 28 L18 28 M42 28 L46 28" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
             <path d="M26 34 L24 30 M30 35 L30 30 M34 35 L34 30 M38 34 L40 30" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/>`,

  yeti:     `<ellipse cx="32" cy="38" rx="16" ry="14" fill="currentColor" opacity="0.85"/>
             <circle cx="32" cy="22" r="12" fill="currentColor" opacity="0.9"/>
             <path d="M22 16 L16 10 L18 16 L14 14 L18 20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
             <path d="M42 16 L48 10 L46 16 L50 14 L46 20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
             <circle cx="26" cy="22" r="3" fill="white" opacity="0.5"/>
             <circle cx="38" cy="22" r="3" fill="white" opacity="0.5"/>
             <path d="M28 29 Q32 32 36 29" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/>`,

  kitsune:  `<circle cx="32" cy="28" r="12" fill="currentColor" opacity="0.9"/>
             <path d="M22 20 L14 8 L20 18 L16 12 L24 22" fill="currentColor" opacity="0.8"/>
             <path d="M42 20 L50 8 L44 18 L48 12 L40 22" fill="currentColor" opacity="0.8"/>
             <path d="M18 38 Q14 50 20 54 Q26 58 32 52 Q38 58 44 54 Q50 50 46 38" fill="currentColor" opacity="0.7"/>
             <path d="M22 38 Q26 44 32 42 Q38 44 42 38" fill="none" stroke="white" stroke-width="1.5" opacity="0.3"/>
             <circle cx="26" cy="26" r="3" fill="white" opacity="0.5"/>
             <circle cx="38" cy="26" r="3" fill="white" opacity="0.5"/>`,

  control:  `<circle cx="32" cy="32" r="6" fill="currentColor"/>
             <circle cx="32" cy="32" r="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-dasharray="6 4"/>
             <circle cx="32" cy="12" r="4" fill="currentColor" opacity="0.8"/>
             <circle cx="32" cy="52" r="4" fill="currentColor" opacity="0.8"/>
             <circle cx="12" cy="32" r="4" fill="currentColor" opacity="0.8"/>
             <circle cx="52" cy="32" r="4" fill="currentColor" opacity="0.8"/>
             <line x1="32" y1="16" x2="32" y2="22" stroke="currentColor" stroke-width="2" opacity="0.6"/>
             <line x1="32" y1="42" x2="32" y2="48" stroke="currentColor" stroke-width="2" opacity="0.6"/>
             <line x1="16" y1="32" x2="22" y2="32" stroke="currentColor" stroke-width="2" opacity="0.6"/>
             <line x1="42" y1="32" x2="48" y2="32" stroke="currentColor" stroke-width="2" opacity="0.6"/>`,

  dragon:   `<path d="M10 40 Q14 28 24 24 Q20 18 22 12 Q28 18 28 24 Q32 20 36 24 Q36 18 42 12 Q44 18 40 24 Q50 28 54 40 Q44 36 38 42 Q36 52 32 54 Q28 52 26 42 Q20 36 10 40 Z" fill="currentColor" opacity="0.85"/>
             <circle cx="26" cy="28" r="3" fill="white" opacity="0.5"/>
             <circle cx="38" cy="28" r="3" fill="white" opacity="0.5"/>
             <path d="M28 36 L32 40 L36 36" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" opacity="0.7"/>`,
};

// ── GENERATE ICON SVG ─────────────────────────────────────────────
// Returns a complete <svg> string for a given fruit at a given size
function getFruitIcon(fruit, size = 48) {
  const col = RARITY_COLORS[fruit.rarity] || RARITY_COLORS.common;
  const paths = FRUIT_ICONS[fruit.id] || FRUIT_ICONS[fruit.name?.toLowerCase()];
  const corner = Math.round(size * 0.22);

  // Scale from 64 viewBox to requested size
  return `<svg width="${size}" height="${size}" viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    style="flex-shrink:0;border-radius:${corner}px;display:block;">
    <rect width="64" height="64" rx="${corner}" fill="${col.bg}"/>
    <rect width="64" height="64" rx="${corner}" fill="none" stroke="${col.border}" stroke-width="2.5"/>
    <g color="${col.glow}">
      ${paths || `<text x="32" y="40" text-anchor="middle" font-size="28" font-weight="bold" fill="${col.text}" font-family="system-ui">${fruit.name.charAt(0)}</text>`}
    </g>
  </svg>`;
}
