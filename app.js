// ================================================================
//  FruitAlarm — app.js v7 CLEAN
// ================================================================

const BACKEND_URL = "https://fruitalarm-backend.onrender.com";

const FIREBASE_CONFIG = {
  apiKey:            "AIzaSyBPbVv3fEpBdu_tFWQFvJ-0V_Q5BpAIAc0",
  authDomain:        "fruitalarm.firebaseapp.com",
  projectId:         "fruitalarm",
  storageBucket:     "fruitalarm.firebasestorage.app",
  messagingSenderId: "816625926759",
  appId:             "1:816625926759:web:7142c3e01f87b9a1d30ac2",
};

// ← Paste your VAPID key from Firebase here between the quotes
const VAPID_KEY = "BJulZkALQHCmLXSOA56PL0WlL0OPx0YSs9dWX_AVVioBi7WcwPVP8xnlyQZG1PexC78ba5avrHa97zczG1N6Uu0";

// ── APP STATE ─────────────────────────────────────────────────────
const state = {
  wishlist:     JSON.parse(localStorage.getItem("fa_wishlist") || "[]"),
  soundType:    localStorage.getItem("fa_sound")     || "beep",
  volume:       parseFloat(localStorage.getItem("fa_volume")   || "0.8"),
  alarmMode:    localStorage.getItem("fa_alarmMode") || "both",
  activeTab:    "normal",
  normalStock:  [],
  mirageStock:  [],
  stockSource:  "loading",
  lastUpdated:  null,
  alarmRunning: false,
  alarmInterval:null,
  audioCtx:     null,
  testRunning:  false,
  testInterval: null,
};

// ── AUDIO ─────────────────────────────────────────────────────────
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
  beep:  c => { const t=c.currentTime; tone(c,880,t,0.18,"square"); tone(c,880,t+0.22,0.18,"square"); tone(c,660,t+0.55,0.18,"square"); tone(c,660,t+0.77,0.18,"square"); },
  siren: c => { const t=c.currentTime,o=c.createOscillator(),g=c.createGain(); o.connect(g);g.connect(c.destination);o.type="sawtooth";o.frequency.setValueAtTime(300,t);o.frequency.linearRampToValueAtTime(1200,t+0.8);g.gain.setValueAtTime(state.volume*0.25,t);g.gain.linearRampToValueAtTime(0.001,t+0.85);o.start(t);o.stop(t+0.9); },
  rapid: c => { const t=c.currentTime; for(let i=0;i<6;i++) tone(c,1200,t+i*0.12,0.08,"square"); },
  chime: c => { const t=c.currentTime; [523,659,784,1047].forEach((f,i)=>tone(c,f,t+i*0.18,0.4)); },
};
function playSound() {
  const c = getCtx();
  if (c.state === "suspended") c.resume();
  (SOUNDS[state.soundType] || SOUNDS.beep)(c);
}

// ── ALARM ─────────────────────────────────────────────────────────
function startAlarm(fruitName, stockType) {
  if (state.alarmRunning) return;
  state.alarmRunning = true;
  const label  = stockType === "mirage" ? "Mirage Stock" : "Normal Stock";
  const fruit  = ALL_FRUITS.find(f => f.name.toLowerCase() === fruitName.toLowerCase() || f.id === fruitName.toLowerCase());

  // Update overlay text
  document.getElementById("alarmStatusText").textContent = `${fruitName} · ${label}`;
  document.getElementById("alarmStatusBar").style.display = "flex";
  document.title = `🚨 ${fruitName} IN STOCK — FruitAlarm`;

  // Show fruit icon in overlay
  const iconWrap = document.getElementById("alarmFruitIcon");
  if (iconWrap && fruit) {
    iconWrap.innerHTML = getFruitIcon(fruit, 80);
    // Color pulse rings based on rarity
    const rarityGlow = {
      mythical: "#c084fc", legendary: "#facc15",
      rare: "#60a5fa", uncommon: "#22c55e", common: "#9ca3af"
    };
    const col = rarityGlow[fruit.rarity] || "#f97316";
    document.querySelectorAll(".alarm-pulse-ring").forEach(r => {
      r.style.borderColor = col;
    });
    document.querySelector(".alarm-fruit-icon").style.borderColor = col;
    document.querySelector(".alarm-fruit-icon").style.boxShadow = `0 0 30px ${col}66, 0 0 60px ${col}33`;
    document.querySelector(".alarm-label").style.color = col;
  }

  playSound();
  state.alarmInterval = setInterval(playSound, 1800);
}

function stopAlarm() {
  state.alarmRunning = false;
  clearInterval(state.alarmInterval);
  document.getElementById("alarmStatusBar").style.display = "none";
  document.title = "FruitAlarm — Blox Fruits Stock Notifier";
}

function snoozeAlarm() {
  // Stop alarm for 10 minutes then re-check
  stopAlarm();
  setTimeout(() => {
    checkAlarm();
  }, 10 * 60 * 1000);
}
function testAlarm() {
  const btn = document.getElementById("testBtn");
  if (state.testRunning) {
    state.testRunning = false;
    clearInterval(state.testInterval);
    btn.classList.remove("ringing");
    btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg> Test Alarm`;
  } else {
    state.testRunning = true;
    playSound();
    state.testInterval = setInterval(playSound, 1800);
    btn.classList.add("ringing");
    btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="6" width="12" height="12" rx="2"/></svg> Stop`;
    setTimeout(() => { if (state.testRunning) testAlarm(); }, 8000);
  }
}

// ── SOUND & VOLUME ────────────────────────────────────────────────
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

// ── ALARM MODE ────────────────────────────────────────────────────
function setAlarmMode(mode) {
  state.alarmMode = mode;
  localStorage.setItem("fa_alarmMode", mode);
  document.querySelectorAll(".mode-btn").forEach(b =>
    b.classList.toggle("active", b.dataset.mode === mode));
  checkAlarm();
  syncPushSubscription();
}

// ── COUNTDOWN ─────────────────────────────────────────────────────
function updateCountdown() {
  const s   = new Date();
  const sec = s.getUTCHours()*3600 + s.getUTCMinutes()*60 + s.getUTCSeconds();
  const pad = n => String(n).padStart(2, "0");
  const remN = 14400 - (sec % 14400);
  const remM = 7200  - (sec % 7200);
  document.getElementById("countdownNormal").textContent =
    `${pad(Math.floor(remN/3600))}:${pad(Math.floor(remN%3600/60))}:${pad(remN%60)}`;
  document.getElementById("countdownMirage").textContent =
    `${pad(Math.floor(remM/3600))}:${pad(Math.floor(remM%3600/60))}:${pad(remM%60)}`;
  if (remN === 1) setTimeout(loadLiveStock, 3000);
}

// ── FORMAT ────────────────────────────────────────────────────────
function fmtBeli(n) {
  if (n >= 1_000_000) return `${(n/1_000_000).toFixed(n%1_000_000===0?0:1)}M`;
  if (n >= 1_000)     return `${Math.round(n/1000)}K`;
  return n.toLocaleString();
}

// ── TAB SWITCHING ─────────────────────────────────────────────────
function switchTab(tab) {
  state.activeTab = tab;
  document.querySelectorAll(".stock-tab").forEach(t =>
    t.classList.toggle("active", t.dataset.tab === tab));
  document.getElementById("normalStockSection").style.display = tab === "normal" ? "block" : "none";
  document.getElementById("mirageStockSection").style.display = tab === "mirage" ? "block" : "none";
}

// ── RENDER STOCK GRID ─────────────────────────────────────────────
function renderStockGrid(gridId, inStockFruits, label) {
  const grid = document.getElementById(gridId);
  if (!grid) return;
  grid.innerHTML = "";

  if (inStockFruits.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:28px 16px;color:var(--text-2);font-size:13px;line-height:1.8;">
      ${state.stockSource === "loading" || state.stockSource === "pending"
        ? `<div style="font-size:22px;margin-bottom:8px">⏳</div>Fetching live stock...`
        : `<div style="font-size:22px;margin-bottom:8px">🔴</div>
           <strong style="color:var(--text-1)">Backend not deployed yet</strong><br>
           <span style="font-size:11px;color:var(--text-3)">Follow README Step 2 to connect the live stock bot.</span>`}
    </div>`;
    return;
  }

  const inIds = new Set(inStockFruits.map(f => f.id));

  inStockFruits.forEach(fruit => {
    const card = document.createElement("div");
    card.className = "fruit-card in-stock";
    card.innerHTML = `
      <div class="fruit-card-top">
        ${getFruitIcon(fruit, 52)}
        <span class="stock-badge in">IN</span>
      </div>
      <div class="fruit-name-row">
        <span class="fruit-card-name">${fruit.name}</span>
        <span class="rarity-pip ${fruit.rarity}">${fruit.rarity.slice(0,3).toUpperCase()}</span>
      </div>
      <div class="fruit-prices">
        <span class="price-beli">🍀 ${fmtBeli(fruit.beli)}</span>
        <span class="price-robux">R$ ${fruit.robux.toLocaleString()}</span>
      </div>`;
    grid.appendChild(card);
  });

  ALL_FRUITS.filter(f => !inIds.has(f.id)).slice(0, 4).forEach(fruit => {
    const card = document.createElement("div");
    card.className = "fruit-card out-stock";
    card.innerHTML = `
      <div class="fruit-card-top">
        <div style="opacity:0.35">${getFruitIcon(fruit, 52)}</div>
        <span class="stock-badge out">OUT</span>
      </div>
      <div class="fruit-name-row">
        <span class="fruit-card-name" style="color:var(--text-3)">${fruit.name}</span>
        <span class="rarity-pip ${fruit.rarity}" style="opacity:0.4">${fruit.rarity.slice(0,3).toUpperCase()}</span>
      </div>
      <div class="fruit-prices">
        <span class="price-beli" style="color:var(--text-3)">🍀 ${fmtBeli(fruit.beli)}</span>
      </div>`;
    grid.appendChild(card);
  });
}

// ── RENDER WISHLIST ───────────────────────────────────────────────
function renderWishlist() {
  const container = document.getElementById("wishlistContainer");
  if (!container) return;
  container.innerHTML = "";
  const normalIds = new Set(state.normalStock.map(f => f.id));
  const mirageIds = new Set(state.mirageStock.map(f => f.id));

  ALL_FRUITS.forEach(fruit => {
    const isChecked = state.wishlist.includes(fruit.id);
    const inNormal  = normalIds.has(fruit.id);
    const inMirage  = mirageIds.has(fruit.id);
    const isMatched = isChecked && (inNormal || inMirage);

    let stockTags = "";
    if (inNormal) stockTags += `<span class="wl-stock-tag normal">Normal</span>`;
    if (inMirage) stockTags += `<span class="wl-stock-tag mirage">Mirage</span>`;

    const item = document.createElement("div");
    item.className = `wishlist-item${isChecked?" checked":""}${isMatched?" matched":""}`;
    item.dataset.id = fruit.id;
    item.innerHTML = `
      <div class="wl-checkbox">
        <svg class="wl-check-svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M2 5l2.5 2.5L8 3" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div style="flex-shrink:0">${getFruitIcon(fruit, 36)}</div>
      <div class="wl-info">
        <div class="wl-name">${fruit.name}${stockTags}</div>
        <div class="wl-meta">${fruit.rarity.charAt(0).toUpperCase()+fruit.rarity.slice(1)} · ${fruit.type} · 🍀 ${fmtBeli(fruit.beli)}</div>
      </div>
      <span class="wl-alert-icon" style="${isMatched?"":"display:none"}">🔔</span>`;
    item.addEventListener("click", () => toggleWishlist(fruit.id));
    container.appendChild(item);
  });
}

function toggleWishlist(id) {
  const i = state.wishlist.indexOf(id);
  if (i === -1) state.wishlist.push(id); else state.wishlist.splice(i, 1);
  localStorage.setItem("fa_wishlist", JSON.stringify(state.wishlist));
  renderWishlist();
  checkAlarm();
  syncPushSubscription();
}

// ── ALARM CHECK ───────────────────────────────────────────────────
function checkAlarm() {
  if (state.alarmRunning) return;
  const mode      = state.alarmMode;
  const normalIds = new Set(state.normalStock.map(f => f.id));
  const mirageIds = new Set(state.mirageStock.map(f => f.id));
  for (const id of state.wishlist) {
    if ((mode === "both" || mode === "normal") && normalIds.has(id)) {
      startAlarm(ALL_FRUITS.find(f=>f.id===id)?.name||id, "normal"); return;
    }
    if ((mode === "both" || mode === "mirage") && mirageIds.has(id)) {
      startAlarm(ALL_FRUITS.find(f=>f.id===id)?.name||id, "mirage"); return;
    }
  }
}

// ── LIVE STOCK FETCH ──────────────────────────────────────────────
async function loadLiveStock() {
  const btn = document.getElementById("refreshBtn");
  if (btn) btn.classList.add("spinning");

  try {
    const resp = await fetch(`${BACKEND_URL}/stock`, { signal: AbortSignal.timeout(8000) });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const data = await resp.json();
    state.normalStock = (data.normalStock || [])
      .map(id => FRUIT_BY_NAME[id.toLowerCase().replace(/[^a-z]/g,"")]).filter(Boolean);
    state.mirageStock = (data.mirageStock || [])
      .map(id => FRUIT_BY_NAME[id.toLowerCase().replace(/[^a-z]/g,"")]).filter(Boolean);
    state.stockSource = data.source || "discord-vulcan";
    state.lastUpdated = data.lastUpdated || new Date().toISOString();
  } catch (err) {
    console.warn("Backend unavailable:", err.message);
    state.normalStock = [];
    state.mirageStock = [];
    state.stockSource = "offline";
    state.lastUpdated = new Date().toISOString();
  }

  const srcMsg = {
    "discord-vulcan": "✅ Live stock from Discord",
    "cached":         "⚠️ Cached — last known stock",
    "offline":        "🔴 Backend offline — check Render.com",
    "fallback":       "⚠️ Fallback stock",
  };
  const note = document.getElementById("stockNote");
  if (note) {
    const time = state.lastUpdated ? ` · ${new Date(state.lastUpdated).toLocaleTimeString()}` : "";
    note.textContent = `${srcMsg[state.stockSource] || state.stockSource}${time}`;
    note.style.color = state.stockSource === "discord-vulcan" ? "var(--green)" : "var(--text-3)";
  }

  renderStockGrid("normalStockGrid", state.normalStock, "Normal");
  renderStockGrid("mirageStockGrid", state.mirageStock, "Mirage");
  renderWishlist();
  checkAlarm();
  if (btn) btn.classList.remove("spinning");
}

function refreshStock() { loadLiveStock(); }

// ── PUSH NOTIFICATIONS ────────────────────────────────────────────
async function enablePushNotifications() {
  const btn = document.getElementById("pushBtn");
  if (btn) { btn.disabled = true; btn.textContent = "Setting up..."; }

  try {
    // Check if notifications are supported on this browser/device
    if (!("Notification" in window)) {
      alert("Push notifications are not supported on this browser. Please use Chrome on Android.");
      if (btn) { btn.disabled = false; btn.textContent = "🔔 Enable Push Notifications"; }
      return;
    }
    if (!("serviceWorker" in navigator)) {
      alert("Service workers not supported. Please use Chrome on Android.");
      if (btn) { btn.disabled = false; btn.textContent = "🔔 Enable Push Notifications"; }
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      alert("Notifications blocked. Please allow in browser settings.");
      if (btn) { btn.disabled = false; btn.textContent = "🔔 Enable Push Notifications"; }
      return;
    }

    const { initializeApp }  = await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js");
    const { getMessaging, getToken, onMessage } = await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging.js");

    const app       = initializeApp(FIREBASE_CONFIG);
    const messaging = getMessaging(app);

    onMessage(messaging, payload => {
      const { title, body } = payload.notification || {};
      if (title) {
        document.getElementById("alarmStatusText").textContent = title;
        document.getElementById("alarmStatusBar").style.display = "flex";
        playSound();
        state.alarmRunning = true;
        state.alarmInterval = setInterval(playSound, 1800);
      }
    });

    const swPath  = window.location.pathname.replace(/\/[^\/]*$/, "/firebase-messaging-sw.js");
    const swScope = window.location.pathname.replace(/\/[^\/]*$/, "/");

    // Register and wait for the service worker to be fully active
    const reg = await navigator.serviceWorker.register(swPath, { scope: swScope });
    await navigator.serviceWorker.ready;

    // Give it a moment to activate fully
    await new Promise(resolve => setTimeout(resolve, 1000));

    const token = await getToken(messaging, { vapidKey: VAPID_KEY, serviceWorkerRegistration: reg });

    if (!token) throw new Error("No FCM token received");
    localStorage.setItem("fa_fcm_token", token);
    await syncPushSubscription(token);
    updatePushUI(true);

  } catch(e) {
    console.error("Push setup failed:", e);
    alert(`Push setup failed: ${e.message}`);
    if (btn) { btn.disabled = false; btn.textContent = "🔔 Enable Push Notifications"; }
  }
}

async function syncPushSubscription(token) {
  const t = token || localStorage.getItem("fa_fcm_token");
  if (!t || Notification.permission !== "granted") return;
  try {
    await fetch(`${BACKEND_URL}/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: t, wishlist: state.wishlist, alarmMode: state.alarmMode }),
    });
  } catch(e) { console.warn("Sync failed:", e.message); }
}

function updatePushUI(enabled) {
  const btn  = document.getElementById("pushBtn");
  const note = document.getElementById("pushNote");
  if (btn) {
    btn.textContent = enabled ? "✅ Push Notifications ON" : "🔔 Enable Push Notifications";
    btn.classList.toggle("push-on", enabled);
    btn.disabled = false;
  }
  if (note && enabled) {
    note.textContent = "You'll get alerted even when your phone is locked! 🔔";
    note.style.color = "var(--green)";
  }
}

// ── INIT ──────────────────────────────────────────────────────────
function init() {
  document.querySelectorAll(".sound-btn").forEach(b =>
    b.classList.toggle("active", b.dataset.sound === state.soundType));
  const vol = Math.round(state.volume * 100);
  document.getElementById("volumeSlider").value = vol;
  document.getElementById("volVal").textContent = `${vol}%`;
  document.querySelectorAll(".mode-btn").forEach(b =>
    b.classList.toggle("active", b.dataset.mode === state.alarmMode));
  switchTab("normal");
  updateCountdown();
  setInterval(updateCountdown, 1000);
  loadLiveStock();

  // Auto-refresh stock every 90 seconds — alarm triggers automatically
  setInterval(loadLiveStock, 90 * 1000);

  // Restore push state safely
  const saved = localStorage.getItem("fa_fcm_token");
  if (saved && ("Notification" in window) && Notification.permission === "granted") {
    updatePushUI(true);
    syncPushSubscription(saved);
  }

  // Hide push button on unsupported browsers
  if (!("Notification" in window) || !("serviceWorker" in navigator)) {
    const pushBtn  = document.getElementById("pushBtn");
    const pushNote = document.getElementById("pushNote");
    if (pushBtn)  pushBtn.style.display  = "none";
    if (pushNote) pushNote.textContent   = "Push notifications require Chrome on Android.";
  }
}

document.addEventListener("DOMContentLoaded", init);
