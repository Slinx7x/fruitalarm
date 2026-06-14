// ================================================================
//  FruitAlarm — app.js  (v3 — Live Stock + Real Images)
// ================================================================

// ── BACKEND URL ───────────────────────────────────────────────────
// After you deploy to Render.com, replace this with YOUR URL.
// Example: "https://fruitalarm-backend.onrender.com"
// Leave as-is for now — the app falls back to simulated stock.
const BACKEND_URL = "https://fruitalarm-backend.onrender.com";

// ── FULL FRUIT DATABASE ───────────────────────────────────────────
// Real images from the Blox Fruits Fandom Wiki.
// The image URL format: the wiki serves images via their CDN.
// We use the /revision/latest/scale-to-width-down/128 path for
// consistent 128px thumbnails.
const W = "https://static.wikia.nocookie.net/blox-fruits/images";
const ALL_FRUITS = [
  // ── MYTHICAL ──
  { id:"kitsune",  name:"Kitsune",   rarity:"mythical",  price:8_000_000, img:`${W}/c/ce/Kitsune_Fruit_Icon.png/revision/latest/scale-to-width-down/128?cb=20240922054113` },
  { id:"dragon",   name:"Dragon",    rarity:"mythical",  price:9_500_000, img:`${W}/3/3b/Dragon_Fruit_Icon.png/revision/latest/scale-to-width-down/128?cb=20231012000000` },
  { id:"leopard",  name:"Leopard",   rarity:"mythical",  price:5_000_000, img:`${W}/a/a7/Leopard_Fruit_Icon.png/revision/latest/scale-to-width-down/128?cb=20230920000000` },
  { id:"dough",    name:"Dough",     rarity:"mythical",  price:2_800_000, img:`${W}/0/08/Dough_Fruit_Icon.png/revision/latest/scale-to-width-down/128?cb=20220601000000` },
  { id:"control",  name:"Control",   rarity:"mythical",  price:3_200_000, img:`${W}/d/d2/Control_Fruit_Icon.png/revision/latest/scale-to-width-down/128?cb=20220601000000` },
  { id:"venom",    name:"Venom",     rarity:"mythical",  price:3_000_000, img:`${W}/9/90/Venom_Fruit_Icon.png/revision/latest/scale-to-width-down/128?cb=20220601000000` },
  { id:"soul",     name:"Soul",      rarity:"mythical",  price:3_200_000, img:`${W}/5/56/Soul_Fruit_Icon.png/revision/latest/scale-to-width-down/128?cb=20220601000000` },
  { id:"gas",      name:"Gas",       rarity:"mythical",  price:1_800_000, img:`${W}/6/6c/Gas_Fruit_Icon.png/revision/latest/scale-to-width-down/128?cb=20230101000000` },
  { id:"trex",     name:"T-Rex",     rarity:"mythical",  price:2_000_000, img:`${W}/8/8b/T-Rex_Fruit_Icon.png/revision/latest/scale-to-width-down/128?cb=20240101000000` },
  { id:"mammoth",  name:"Mammoth",   rarity:"mythical",  price:2_000_000, img:`${W}/1/12/Mammoth_Fruit_Icon.png/revision/latest/scale-to-width-down/128?cb=20240101000000` },
  // ── LEGENDARY ──
  { id:"buddha",   name:"Buddha",    rarity:"legendary", price:1_200_000, img:`${W}/c/c3/Buddha_Fruit_Icon.png/revision/latest/scale-to-width-down/128?cb=20220601000000` },
  { id:"shadow",   name:"Shadow",    rarity:"legendary", price:2_900_000, img:`${W}/a/a1/Shadow_Fruit_Icon.png/revision/latest/scale-to-width-down/128?cb=20220601000000` },
  { id:"blizzard", name:"Blizzard",  rarity:"legendary", price:2_500_000, img:`${W}/b/b6/Blizzard_Fruit_Icon.png/revision/latest/scale-to-width-down/128?cb=20230101000000` },
  { id:"rumble",   name:"Rumble",    rarity:"legendary", price:2_100_000, img:`${W}/a/a4/Rumble_Fruit_Icon.png/revision/latest/scale-to-width-down/128?cb=20220601000000` },
  { id:"quake",    name:"Quake",     rarity:"legendary", price:1_000_000, img:`${W}/a/a1/Quake_Fruit_Icon.png/revision/latest/scale-to-width-down/128?cb=20220601000000` },
  { id:"gravity",  name:"Gravity",   rarity:"legendary", price:2_500_000, img:`${W}/3/34/Gravity_Fruit_Icon.png/revision/latest/scale-to-width-down/128?cb=20220601000000` },
  { id:"phoenix",  name:"Phoenix",   rarity:"legendary", price:1_800_000, img:`${W}/b/bf/Phoenix_Fruit_Icon.png/revision/latest/scale-to-width-down/128?cb=20220601000000` },
  { id:"portal",   name:"Portal",    rarity:"legendary", price:1_400_000, img:`${W}/6/62/Portal_Fruit_Icon.png/revision/latest/scale-to-width-down/128?cb=20220601000000` },
  { id:"pain",     name:"Pain",      rarity:"legendary", price:2_700_000, img:`${W}/1/12/Pain_Fruit_Icon.png/revision/latest/scale-to-width-down/128?cb=20230601000000` },
  { id:"dark",     name:"Dark",      rarity:"legendary", price:500_000,   img:`${W}/6/67/Dark_Fruit_Icon.png/revision/latest/scale-to-width-down/128?cb=20220601000000` },
  { id:"light",    name:"Light",     rarity:"legendary", price:650_000,   img:`${W}/3/3e/Light_Fruit_Icon.png/revision/latest/scale-to-width-down/128?cb=20220601000000` },
  { id:"magma",    name:"Magma",     rarity:"legendary", price:850_000,   img:`${W}/4/45/Magma_Fruit_Icon.png/revision/latest/scale-to-width-down/128?cb=20220601000000` },
  { id:"flame",    name:"Flame",     rarity:"legendary", price:250_000,   img:`${W}/f/fd/Flame_Fruit_Icon.png/revision/latest/scale-to-width-down/128?cb=20220601000000` },
  { id:"ice",      name:"Ice",       rarity:"legendary", price:350_000,   img:`${W}/5/57/Ice_Fruit_Icon.png/revision/latest/scale-to-width-down/128?cb=20220601000000` },
  { id:"sand",     name:"Sand",      rarity:"legendary", price:420_000,   img:`${W}/1/14/Sand_Fruit_Icon.png/revision/latest/scale-to-width-down/128?cb=20220601000000` },
  { id:"spin",     name:"Spin",      rarity:"legendary", price:7_500,     img:`${W}/7/7a/Spin_Fruit_Icon.png/revision/latest/scale-to-width-down/128?cb=20220601000000` },
  { id:"lightning",name:"Lightning", rarity:"legendary", price:2_500_000, img:`${W}/4/42/Lightning_Fruit_Icon.png/revision/latest/scale-to-width-down/128?cb=20230601000000` },
  { id:"eagle",    name:"Eagle",     rarity:"legendary", price:1_200_000, img:`${W}/c/ca/Eagle_Fruit_Icon.png/revision/latest/scale-to-width-down/128?cb=20230601000000` },
  // ── RARE ──
  { id:"rubber",   name:"Rubber",    rarity:"rare",      price:750_000,   img:`${W}/c/cf/Rubber_Fruit_Icon.png/revision/latest/scale-to-width-down/128?cb=20220601000000` },
  { id:"spider",   name:"Spider",    rarity:"rare",      price:1_500_000, img:`${W}/2/2d/Spider_Fruit_Icon.png/revision/latest/scale-to-width-down/128?cb=20220601000000` },
  { id:"love",     name:"Love",      rarity:"rare",      price:1_200_000, img:`${W}/f/f3/Love_Fruit_Icon.png/revision/latest/scale-to-width-down/128?cb=20220601000000` },
  { id:"diamond",  name:"Diamond",   rarity:"rare",      price:600_000,   img:`${W}/e/e5/Diamond_Fruit_Icon.png/revision/latest/scale-to-width-down/128?cb=20220601000000` },
  { id:"smoke",    name:"Smoke",     rarity:"rare",      price:100_000,   img:`${W}/9/97/Smoke_Fruit_Icon.png/revision/latest/scale-to-width-down/128?cb=20220601000000` },
  { id:"spike",    name:"Spike",     rarity:"rare",      price:180_000,   img:`${W}/1/1a/Spike_Fruit_Icon.png/revision/latest/scale-to-width-down/128?cb=20220601000000` },
  { id:"bomb",     name:"Bomb",      rarity:"rare",      price:5_000,     img:`${W}/c/c5/Bomb_Fruit_Icon.png/revision/latest/scale-to-width-down/128?cb=20220601000000` },
  { id:"ghost",    name:"Ghost",     rarity:"rare",      price:550_000,   img:`${W}/e/e7/Ghost_Fruit_Icon.png/revision/latest/scale-to-width-down/128?cb=20220601000000` },
  { id:"barrier",  name:"Barrier",   rarity:"rare",      price:800_000,   img:`${W}/b/b4/Barrier_Fruit_Icon.png/revision/latest/scale-to-width-down/128?cb=20220601000000` },
  { id:"string",   name:"String",    rarity:"rare",      price:1_500_000, img:`${W}/9/9b/String_Fruit_Icon.png/revision/latest/scale-to-width-down/128?cb=20220601000000` },
  { id:"paw",      name:"Paw",       rarity:"rare",      price:2_300_000, img:`${W}/4/40/Paw_Fruit_Icon.png/revision/latest/scale-to-width-down/128?cb=20220601000000` },
  { id:"door",     name:"Door",      rarity:"rare",      price:950_000,   img:`${W}/d/d7/Door_Fruit_Icon.png/revision/latest/scale-to-width-down/128?cb=20220601000000` },
  // ── COMMON ──
  { id:"rocket",   name:"Rocket",    rarity:"common",    price:5_000,     img:`${W}/2/26/Rocket_Fruit_Icon.png/revision/latest/scale-to-width-down/128?cb=20220601000000` },
  { id:"spring",   name:"Spring",    rarity:"common",    price:60_000,    img:`${W}/7/77/Spring_Fruit_Icon.png/revision/latest/scale-to-width-down/128?cb=20220601000000` },
  { id:"kilo",     name:"Kilo",      rarity:"common",    price:5_000,     img:`${W}/b/b5/Kilo_Fruit_Icon.png/revision/latest/scale-to-width-down/128?cb=20220601000000` },
  { id:"chop",     name:"Chop",      rarity:"common",    price:30_000,    img:`${W}/4/4e/Chop_Fruit_Icon.png/revision/latest/scale-to-width-down/128?cb=20220601000000` },
  { id:"revive",   name:"Revive",    rarity:"common",    price:550_000,   img:`${W}/r/re/Revive_Fruit_Icon.png/revision/latest/scale-to-width-down/128?cb=20220601000000` },
];

// Build lookup by name (lowercase) for matching wiki names to our DB
const FRUIT_BY_NAME = {};
ALL_FRUITS.forEach(f => {
  FRUIT_BY_NAME[f.name.toLowerCase()] = f;
  FRUIT_BY_NAME[f.id.toLowerCase()]   = f;
});

// ── APP STATE ─────────────────────────────────────────────────────
const state = {
  wishlist:      JSON.parse(localStorage.getItem("fa_wishlist") || "[]"),
  soundType:     localStorage.getItem("fa_sound")   || "beep",
  volume:        parseFloat(localStorage.getItem("fa_volume") || "0.8"),
  currentStock:  [],   // array of fruit objects currently in stock
  stockSource:   "loading",
  lastUpdated:   null,
  alarmRunning:  false,
  alarmInterval: null,
  audioCtx:      null,
  testRunning:   false,
  testInterval:  null,
};

// ── AUDIO ENGINE ──────────────────────────────────────────────────
function getCtx() {
  if (!state.audioCtx || state.audioCtx.state === "closed")
    state.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return state.audioCtx;
}

function tone(ctx, freq, t0, dur, type = "sine") {
  const o = ctx.createOscillator(), g = ctx.createGain();
  o.connect(g); g.connect(ctx.destination);
  o.type = type;
  o.frequency.setValueAtTime(freq, t0);
  g.gain.setValueAtTime(state.volume * 0.35, t0);
  g.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
  o.start(t0); o.stop(t0 + dur);
}

const SOUNDS = {
  beep:  ctx => { const t = ctx.currentTime; tone(ctx,880,t+0.00,0.18,"square"); tone(ctx,880,t+0.22,0.18,"square"); tone(ctx,660,t+0.55,0.18,"square"); tone(ctx,660,t+0.77,0.18,"square"); },
  siren: ctx => { const t = ctx.currentTime, o = ctx.createOscillator(), g = ctx.createGain(); o.connect(g); g.connect(ctx.destination); o.type="sawtooth"; o.frequency.setValueAtTime(300,t); o.frequency.linearRampToValueAtTime(1200,t+0.8); g.gain.setValueAtTime(state.volume*0.25,t); g.gain.linearRampToValueAtTime(0.001,t+0.85); o.start(t); o.stop(t+0.9); },
  rapid: ctx => { const t = ctx.currentTime; for(let i=0;i<6;i++) tone(ctx,1200,t+i*0.12,0.08,"square"); },
  chime: ctx => { const t = ctx.currentTime; [523,659,784,1047].forEach((f,i) => tone(ctx,f,t+i*0.18,0.4)); },
};

function playSound() {
  const ctx = getCtx();
  if (ctx.state === "suspended") ctx.resume();
  (SOUNDS[state.soundType] || SOUNDS.beep)(ctx);
}

// ── ALARM ─────────────────────────────────────────────────────────
function startAlarm(fruitName) {
  if (state.alarmRunning) return;
  state.alarmRunning = true;
  document.getElementById("alarmStatusText").textContent = `🔥 ${fruitName} is IN STOCK — buy now!`;
  document.getElementById("alarmStatusBar").style.display = "flex";
  document.title = "🚨 FRUIT IN STOCK — FruitAlarm";
  playSound();
  state.alarmInterval = setInterval(playSound, 1800);
}

function stopAlarm() {
  state.alarmRunning = false;
  clearInterval(state.alarmInterval);
  document.getElementById("alarmStatusBar").style.display = "none";
  document.title = "FruitAlarm — Blox Fruits Stock Notifier";
}

function testAlarm() {
  const btn = document.getElementById("testBtn");
  if (state.testRunning) {
    state.testRunning = false;
    clearInterval(state.testInterval);
    btn.classList.remove("ringing");
    btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg> Test Alarm Sound`;
  } else {
    state.testRunning = true;
    playSound();
    state.testInterval = setInterval(playSound, 1800);
    btn.classList.add("ringing");
    btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="6" width="12" height="12" rx="2"/></svg> Stop`;
    setTimeout(() => { if (state.testRunning) testAlarm(); }, 8000);
  }
}

// ── SOUND & VOLUME UI ─────────────────────────────────────────────
function selectSound(btn) {
  document.querySelectorAll(".sound-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  state.soundType = btn.dataset.sound;
  localStorage.setItem("fa_sound", state.soundType);
  playSound();
}

function updateVolume(val) {
  state.volume = val / 100;
  document.getElementById("volVal").textContent = `${val}%`;
  localStorage.setItem("fa_volume", state.volume);
}

// ── COUNTDOWN ─────────────────────────────────────────────────────
function updateCountdown() {
  const now   = new Date();
  const s     = now.getUTCHours()*3600 + now.getUTCMinutes()*60 + now.getUTCSeconds();
  const rem   = 14400 - (s % 14400);
  const pad   = n => String(n).padStart(2,"0");
  document.getElementById("countdown").textContent =
    `${pad(Math.floor(rem/3600))}:${pad(Math.floor(rem%3600/60))}:${pad(rem%60)}`;
  document.getElementById("cycleNum").textContent = Math.floor(Date.now()/1000/14400);
  if (rem === 1) setTimeout(loadLiveStock, 3000);
}

// ── BELI FORMAT ───────────────────────────────────────────────────
function beli(n) {
  if (n >= 1_000_000) return `🍀 ${(n/1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `🍀 ${Math.round(n/1000)}K`;
  return `🍀 ${n}`;
}

// ── FRUIT IMAGE ───────────────────────────────────────────────────
// Returns an <img> element with the wiki image, falls back to a
// colored placeholder showing the first letter if image fails.
function fruitImg(fruit, size = 48) {
  const rarityColors = {
    mythical:  "#c084fc",
    legendary: "#facc15",
    rare:      "#60a5fa",
    common:    "#9191a8",
  };
  const color = rarityColors[fruit.rarity] || "#888";
  // We use a wrapper div; if the real image fails we show a colored circle
  return `
    <div class="fruit-img-wrap" style="width:${size}px;height:${size}px;">
      <img
        src="${fruit.img}"
        alt="${fruit.name}"
        width="${size}" height="${size}"
        style="object-fit:contain;width:100%;height:100%;"
        onerror="this.style.display='none';this.nextElementSibling.style.display='flex';"
        loading="lazy"
      />
      <div class="fruit-img-fallback" style="display:none;width:100%;height:100%;border-radius:50%;background:${color}22;border:2px solid ${color};align-items:center;justify-content:center;font-size:${Math.round(size*0.45)}px;font-weight:700;color:${color};">
        ${fruit.name.charAt(0)}
      </div>
    </div>`;
}

// ── RENDER STOCK GRID ─────────────────────────────────────────────
function renderStock() {
  const grid = document.getElementById("stockGrid");
  const note = document.getElementById("stockNote");
  grid.innerHTML = "";

  if (state.currentStock.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:24px;color:var(--text-2);font-size:13px;">Loading stock data...</div>`;
    return;
  }

  const inIds = new Set(state.currentStock.map(f => f.id));

  // IN-stock cards first
  state.currentStock.forEach(fruit => {
    const card = document.createElement("div");
    card.className = "fruit-card in-stock";
    card.innerHTML = `
      <div class="fruit-card-top">
        ${fruitImg(fruit, 52)}
        <span class="stock-badge in">IN</span>
      </div>
      <div class="fruit-name-row">
        <span class="fruit-card-name">${fruit.name}</span>
        <span class="rarity-pip ${fruit.rarity}">${fruit.rarity.slice(0,3).toUpperCase()}</span>
      </div>
      <span class="fruit-price">${beli(fruit.price)}</span>`;
    grid.appendChild(card);
  });

  // OUT-of-stock (dimmed, first 4 not in stock)
  ALL_FRUITS.filter(f => !inIds.has(f.id)).slice(0, 4).forEach(fruit => {
    const card = document.createElement("div");
    card.className = "fruit-card";
    card.style.opacity = "0.45";
    card.innerHTML = `
      <div class="fruit-card-top">
        ${fruitImg(fruit, 52)}
        <span class="stock-badge out">OUT</span>
      </div>
      <div class="fruit-name-row">
        <span class="fruit-card-name" style="color:var(--text-3)">${fruit.name}</span>
        <span class="rarity-pip ${fruit.rarity}" style="opacity:0.5">${fruit.rarity.slice(0,3).toUpperCase()}</span>
      </div>
      <span class="fruit-price" style="color:var(--text-3)">${beli(fruit.price)}</span>`;
    grid.appendChild(card);
  });

  // Source note
  const sourceMsg = {
    wiki:     "✅ Live data — scraped from Blox Fruits Wiki",
    cached:   "⚠️ Cached data — scrape failed, showing last known stock",
    fallback: "⚠️ Simulated stock — deploy backend for live data",
    loading:  "⏳ Loading...",
  };
  note.textContent = state.lastUpdated
    ? `${sourceMsg[state.stockSource] || ""} · Updated ${new Date(state.lastUpdated).toLocaleTimeString()}`
    : sourceMsg[state.stockSource] || "";
}

// ── RENDER WISHLIST ───────────────────────────────────────────────
function renderWishlist() {
  const container = document.getElementById("wishlistContainer");
  container.innerHTML = "";
  const inIds = new Set(state.currentStock.map(f => f.id));

  ALL_FRUITS.forEach(fruit => {
    const isChecked = state.wishlist.includes(fruit.id);
    const isMatched = isChecked && inIds.has(fruit.id);
    const item = document.createElement("div");
    item.className = `wishlist-item${isChecked?" checked":""}${isMatched?" matched":""}`;
    item.dataset.id = fruit.id;
    item.innerHTML = `
      <div class="wl-checkbox">
        <svg class="wl-check-svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M2 5l2.5 2.5L8 3" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      ${fruitImg(fruit, 32)}
      <div class="wl-info">
        <div class="wl-name">${fruit.name}</div>
        <div class="wl-meta">${fruit.rarity.charAt(0).toUpperCase()+fruit.rarity.slice(1)} · ${beli(fruit.price)}</div>
      </div>
      <span class="wl-alert-icon">🔔</span>`;
    item.addEventListener("click", () => toggleWishlist(fruit.id));
    container.appendChild(item);
  });
}

function toggleWishlist(id) {
  const i = state.wishlist.indexOf(id);
  if (i === -1) state.wishlist.push(id);
  else state.wishlist.splice(i, 1);
  localStorage.setItem("fa_wishlist", JSON.stringify(state.wishlist));
  renderWishlist();
  checkAlarm();
}

// ── ALARM CHECK ───────────────────────────────────────────────────
function checkAlarm() {
  if (state.alarmRunning) return;
  const inIds = new Set(state.currentStock.map(f => f.id));
  for (const id of state.wishlist) {
    if (inIds.has(id)) {
      const fruit = ALL_FRUITS.find(f => f.id === id);
      startAlarm(fruit?.name || "Your fruit");
      return;
    }
  }
}

// ── LIVE STOCK FETCH ──────────────────────────────────────────────
// Calls your Render.com backend. Falls back to a seeded simulation
// if the backend isn't deployed yet.
async function loadLiveStock() {
  const btn = document.getElementById("refreshBtn");
  btn.classList.add("spinning");

  try {
    const resp = await fetch(`${BACKEND_URL}/stock`, { signal: AbortSignal.timeout(8000) });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const data = await resp.json();

    // Map fruit names from backend → our fruit objects
    state.currentStock = data.fruits
      .map(name => FRUIT_BY_NAME[name.toLowerCase()])
      .filter(Boolean);

    state.stockSource  = data.source  || "wiki";
    state.lastUpdated  = data.lastUpdated || new Date().toISOString();

  } catch (err) {
    console.warn("Backend unavailable, using simulation:", err.message);
    // Seeded simulation so it's at least consistent across refreshes
    state.currentStock = simulateStock();
    state.stockSource  = "fallback";
    state.lastUpdated  = new Date().toISOString();
  }

  renderStock();
  renderWishlist();
  checkAlarm();
  btn.classList.remove("spinning");
}

// ── SIMULATION (fallback only) ────────────────────────────────────
function simulateStock() {
  const seed = Math.floor(Date.now() / 14_400_000);
  let s = seed | 0;
  const rng = () => { s = s + 0x6D2B79F5 | 0; let t = Math.imul(s^s>>>15,1|s); t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296; };
  const pool = [...ALL_FRUITS];
  const result = [];
  const gates = { mythical:0.15, legendary:0.4, rare:0.8, common:1 };
  while (result.length < 4 && pool.length) {
    const i = Math.floor(rng()*pool.length);
    const f = pool.splice(i,1)[0];
    if (rng() < gates[f.rarity]) result.push(f);
  }
  while (result.length < 3) result.push(pool[Math.floor(rng()*pool.length)]);
  return result;
}

function refreshStock() { loadLiveStock(); }

// ── INIT ──────────────────────────────────────────────────────────
function init() {
  // Restore sound UI
  document.querySelectorAll(".sound-btn").forEach(b =>
    b.classList.toggle("active", b.dataset.sound === state.soundType));

  const vol = Math.round(state.volume * 100);
  document.getElementById("volumeSlider").value = vol;
  document.getElementById("volVal").textContent = `${vol}%`;

  updateCountdown();
  setInterval(updateCountdown, 1000);

  loadLiveStock();
}

document.addEventListener("DOMContentLoaded", init);
