// ================================================================
//  FruitAlarm — fruits.js
//  Single source of truth for all 41 verified Blox Fruits
//  Beli prices = in-game dealer prices (confirmed from official sources)
//  Robux prices = permanent fruit prices at dealer
//  Type: Natural | Elemental | Beast
// ================================================================

const ALL_FRUITS = [
  // ── COMMON ──────────────────────────────────────────────────────
  { id:"rocket",    name:"Rocket",    type:"Natural",   rarity:"common",    beli:5_000,      robux:50   },
  { id:"spin",      name:"Spin",      type:"Natural",   rarity:"common",    beli:7_500,      robux:75   },
  { id:"blade",     name:"Blade",     type:"Natural",   rarity:"common",    beli:30_000,     robux:100  },
  { id:"spring",    name:"Spring",    type:"Natural",   rarity:"common",    beli:60_000,     robux:180  },
  { id:"bomb",      name:"Bomb",      type:"Natural",   rarity:"common",    beli:80_000,     robux:220  },
  { id:"smoke",     name:"Smoke",     type:"Elemental", rarity:"common",    beli:100_000,    robux:250  },
  { id:"spike",     name:"Spike",     type:"Natural",   rarity:"common",    beli:180_000,    robux:380  },
  // ── UNCOMMON ────────────────────────────────────────────────────
  { id:"flame",     name:"Flame",     type:"Elemental", rarity:"uncommon",  beli:250_000,    robux:550  },
  { id:"ice",       name:"Ice",       type:"Elemental", rarity:"uncommon",  beli:350_000,    robux:750  },
  { id:"sand",      name:"Sand",      type:"Elemental", rarity:"uncommon",  beli:420_000,    robux:850  },
  { id:"dark",      name:"Dark",      type:"Elemental", rarity:"uncommon",  beli:500_000,    robux:950  },
  { id:"eagle",     name:"Eagle",     type:"Beast",     rarity:"uncommon",  beli:550_000,    robux:975  },
  { id:"diamond",   name:"Diamond",   type:"Natural",   rarity:"uncommon",  beli:600_000,    robux:1000 },
  // ── RARE ────────────────────────────────────────────────────────
  { id:"light",     name:"Light",     type:"Elemental", rarity:"rare",      beli:650_000,    robux:1100 },
  { id:"rubber",    name:"Rubber",    type:"Natural",   rarity:"rare",      beli:750_000,    robux:1200 },
  { id:"ghost",     name:"Ghost",     type:"Natural",   rarity:"rare",      beli:940_000,    robux:1275 },
  { id:"magma",     name:"Magma",     type:"Elemental", rarity:"rare",      beli:960_000,    robux:1300 },
  // ── LEGENDARY ───────────────────────────────────────────────────
  { id:"quake",     name:"Quake",     type:"Natural",   rarity:"legendary", beli:1_000_000,  robux:1500 },
  { id:"buddha",    name:"Buddha",    type:"Beast",     rarity:"legendary", beli:1_200_000,  robux:1650 },
  { id:"love",      name:"Love",      type:"Natural",   rarity:"legendary", beli:1_300_000,  robux:1700 },
  { id:"creation",  name:"Creation",  type:"Natural",   rarity:"legendary", beli:1_400_000,  robux:1750 },
  { id:"spider",    name:"Spider",    type:"Natural",   rarity:"legendary", beli:1_500_000,  robux:1800 },
  { id:"sound",     name:"Sound",     type:"Natural",   rarity:"legendary", beli:1_700_000,  robux:1900 },
  { id:"portal",    name:"Portal",    type:"Natural",   rarity:"legendary", beli:1_900_000,  robux:2000 },
  { id:"phoenix",   name:"Phoenix",   type:"Beast",     rarity:"legendary", beli:1_800_000,  robux:2000 },
  { id:"lightning", name:"Lightning", type:"Elemental", rarity:"legendary", beli:2_100_000,  robux:2100 },
  { id:"blizzard",  name:"Blizzard",  type:"Elemental", rarity:"legendary", beli:2_400_000,  robux:2250 },
  { id:"pain",      name:"Pain",      type:"Natural",   rarity:"legendary", beli:2_300_000,  robux:2200 },
  // ── MYTHICAL ────────────────────────────────────────────────────
  { id:"gravity",   name:"Gravity",   type:"Natural",   rarity:"mythical",  beli:2_500_000,  robux:2300 },
  { id:"mammoth",   name:"Mammoth",   type:"Beast",     rarity:"mythical",  beli:2_700_000,  robux:2350 },
  { id:"trex",      name:"T-Rex",     type:"Beast",     rarity:"mythical",  beli:2_700_000,  robux:2350 },
  { id:"dough",     name:"Dough",     type:"Elemental", rarity:"mythical",  beli:2_800_000,  robux:2400 },
  { id:"shadow",    name:"Shadow",    type:"Natural",   rarity:"mythical",  beli:2_900_000,  robux:2425 },
  { id:"venom",     name:"Venom",     type:"Natural",   rarity:"mythical",  beli:3_000_000,  robux:2450 },
  { id:"gas",       name:"Gas",       type:"Elemental", rarity:"mythical",  beli:3_200_000,  robux:2500 },
  { id:"spirit",    name:"Spirit",    type:"Natural",   rarity:"mythical",  beli:3_400_000,  robux:2550 },
  { id:"tiger",     name:"Tiger",     type:"Beast",     rarity:"mythical",  beli:5_000_000,  robux:3000 },
  { id:"yeti",      name:"Yeti",      type:"Beast",     rarity:"mythical",  beli:5_000_000,  robux:3000 },
  { id:"kitsune",   name:"Kitsune",   type:"Beast",     rarity:"mythical",  beli:8_000_000,  robux:4000 },
  { id:"control",   name:"Control",   type:"Natural",   rarity:"mythical",  beli:9_000_000,  robux:4000 },
  { id:"dragon",    name:"Dragon",    type:"Beast",     rarity:"mythical",  beli:15_000_000, robux:5000 },
];

// Fast lookup by id or lowercase name
const FRUIT_BY_NAME = {};
ALL_FRUITS.forEach(f => {
  FRUIT_BY_NAME[f.id]             = f;
  FRUIT_BY_NAME[f.name.toLowerCase()] = f;
});
