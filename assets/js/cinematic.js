// ═══════════ BOOSTER DATA ═══════════
const BOOSTERS = {
  sora: [
    "cinematic lighting","motion blur","shallow depth of field","film grain",
    "24fps motion style","realistic physics","dynamic camera movement",
    "volumetric light","anamorphic lens flares","4K resolution",
    "highly detailed textures","consistent character design"
  ],
  veo: [
    "photorealistic rendering","smooth cinematic motion","4K output",
    "natural lighting","accurate lip sync","expressive facial animation",
    "realistic hair and cloth physics","ambient occlusion","HDR color grading"
  ],
  rw: [
    "cinematic color grade","smooth motion","high detail","realistic shadows",
    "consistent character","dramatic lighting","film quality render"
  ],
  kl: [
    "high motion fidelity","expressive facial animation","realistic body physics",
    "smooth slow motion","cinematic lighting","4K resolution","natural hair movement"
  ],
  pk: [
    "high quality render","vivid colors","smooth animation","dramatic camera","detailed textures"
  ]
};

const MJ_FLAGS = ["--video","--tile","--iw 2 (high image weight)","--quality 2","--upbeta","--niji (anime mode)"];
const MJ_RATIOS = ["1:1","4:3","3:2","16:9","2:1","9:16","3:4","2:3","21:9","4:5"];
const PIKAFFECTS = ["Melt","Inflate","Explode","Crush","Dissolve","Shatter","Grow Vines","Freeze / Ice Over","Turn to Gold","Pixelate","Glitch","Burn"];

// ═══════════ SHOTS STATE ═══════════
let shots = [{ id: 1, title: "Shot 1", platform: "sora" }];
let currentShotId = 1;
let currentPlatform = "sora";
let promptView = "shot"; // shot | charlock | full

// ═══════════ INIT ═══════════
function init() {
  renderBoosterChips("sora-boosters", BOOSTERS.sora, "active");
  renderBoosterChips("veo-boosters", BOOSTERS.veo, "active-amber");
  renderBoosterChips("rw-boosters", BOOSTERS.rw, "active-rose");
  renderBoosterChips("kl-boosters", BOOSTERS.kl, "active", "active");
  renderBoosterChips("pk-boosters", BOOSTERS.pk, "active");
  renderMJRatios();
  renderMJFlags();
  renderPikaffects();
  renderShotList();
  buildCurrentShot();
}

function renderBoosterChips(containerId, items, activeClass) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = items.map(item =>
    `<span class="chip" onclick="toggleBooster(this,'${activeClass}')">${item}</span>`
  ).join('');
}
function toggleBooster(el, activeClass) {
  el.classList.toggle('active');
  if (activeClass && activeClass !== 'active') el.classList.toggle(activeClass);
  buildCurrentShot();
}

function renderMJRatios() {
  const el = document.getElementById('mj-ratioGrid');
  if (!el) return;
  el.innerHTML = MJ_RATIOS.map(r =>
    `<div class="mj-ratio-chip" onclick="selectMJRatio(this,'${r}')">${r}</div>`
  ).join('');
}
function selectMJRatio(el, val) {
  document.querySelectorAll('.mj-ratio-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  buildCurrentShot();
}

function renderMJFlags() {
  const el = document.getElementById('mj-flags');
  if (!el) return;
  el.innerHTML = MJ_FLAGS.map(f =>
    `<span class="chip" onclick="toggleBooster(this,'active-violet')">${f}</span>`
  ).join('');
}

function renderPikaffects() {
  const el = document.getElementById('pk-pikaffects');
  if (!el) return;
  el.innerHTML = PIKAFFECTS.map(f =>
    `<span class="chip" onclick="toggleBooster(this,'active-rose')">${f}</span>`
  ).join('');
}

// ═══════════ PLATFORM SWITCH ═══════════
function switchPlatform(p, btn) {
  currentPlatform = p;
  document.querySelectorAll('.platform-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.platform-panel').forEach(panel => panel.classList.remove('active'));
  const panel = document.getElementById('panel-' + p);
  if (panel) panel.classList.add('active');
  buildCurrentShot();
}

// ═══════════ SHOT LIST ═══════════
function renderShotList() {
  const el = document.getElementById('shotList');
  el.innerHTML = shots.map(s =>
    `<div class="shot-item${s.id === currentShotId ? ' active' : ''}" onclick="selectShot(${s.id})">
      <div class="shot-num">${s.id}</div>
      <div class="shot-info">
        <div class="shot-title-text">${s.title || 'Untitled Shot'}</div>
        <div class="shot-meta">${s.platform ? s.platform.toUpperCase() : ''} · ${s.duration || 'duration —'}</div>
      </div>
      ${shots.length > 1 ? `<button class="shot-del" onclick="deleteShot(event,${s.id})">✕</button>` : ''}
    </div>`
  ).join('');
  document.getElementById('shotCountBadge').textContent = shots.length;
}

function selectShot(id) {
  currentShotId = id;
  renderShotList();
  buildCurrentShot();
}

function addShot() {
  const newId = shots.length + 1;
  shots.push({ id: newId, title: `Shot ${newId}`, platform: currentPlatform });
  currentShotId = newId;
  renderShotList();
  buildCurrentShot();
  showToast('New shot added');
}

function deleteShot(e, id) {
  e.stopPropagation();
  if (shots.length <= 1) return;
  shots = shots.filter(s => s.id !== id);
  if (currentShotId === id) currentShotId = shots[0].id;
  renderShotList();
  buildCurrentShot();
}

// ═══════════ PROMPT VIEW TOGGLE ═══════════
function setPromptView(view, btn) {
  promptView = view;
  btn.closest('.prompt-bar').querySelectorAll('.prompt-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  buildCurrentShot();
}

// ═══════════ GET VALUE HELPERS ═══════════
function v(id) { const el = document.getElementById(id); return el ? el.value.trim() : ''; }
function getActiveChips(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return [];
  return [...el.querySelectorAll('.chip.active, .chip.active-amber, .chip.active-rose, .chip.active-violet, .chip.active-cyan')].map(c => c.textContent.trim());
}
function getActiveMJRatio() {
  const el = document.querySelector('.mj-ratio-chip.active');
  return el ? el.textContent : '';
}

// ═══════════ CHARACTER LOCK STRING ═══════════
function getCharLock() {
  const name = v('charName'), demo = v('charDemo'), phys = v('charPhysical'),
        outfit = v('charOutfit'), props = v('charProps');
  const parts = [];
  if (name) parts.push(`Character: ${name}.`);
  if (demo) parts.push(demo);
  if (phys) parts.push(phys);
  if (outfit) parts.push(`Wearing: ${outfit}.`);
  if (props) parts.push(`Carrying: ${props}.`);
  if (!parts.length) return '[CHARACTER LOCK — fill in the left panel]';
  parts.push('Maintain consistent character appearance across all shots.');
  return parts.join(' ');
}

// ═══════════ BUILD SORA PROMPT ═══════════
function buildSoraPrompt() {
  const title = v('sora-shotTitle'), scene = v('sora-sceneNum'),
        dur = v('sora-duration'), ratio = v('sora-ratio'),
        loc = v('sora-location'), tod = v('sora-timeofday'),
        weather = v('sora-weather'), season = v('sora-season'),
        envDetail = v('sora-envDetails'),
        shotType = v('sora-shotType'), camMove = v('sora-camMove'),
        camAngle = v('sora-camAngle'), lens = v('sora-lens'),
        lighting = v('sora-lighting'), palette = v('sora-palette'),
        emotion = v('sora-emotion'),
        visStyle = v('sora-visStyle'), fps = v('sora-fps'), postfx = v('sora-postfx'),
        action = v('sora-action'), sound = v('sora-sound');
  const boosters = getActiveChips('sora-boosters');

  const parts = [];
  const charLock = getCharLock();

  if (scene) parts.push(`[${scene}${title ? ' — ' + title : ''}]`);
  if (dur || ratio) parts.push(`Duration: ${dur || '—'} | Ratio: ${ratio || '—'}.`);
  parts.push('CHARACTER LOCK: ' + charLock);

  const envParts = [];
  if (loc) envParts.push(loc);
  if (tod) envParts.push(tod);
  if (weather) envParts.push(weather);
  if (season) envParts.push(season);
  if (envParts.length) parts.push(`Setting: ${envParts.join(', ')}.`);
  if (envDetail) parts.push(envDetail);

  const camParts = [];
  if (shotType) camParts.push(shotType);
  if (camMove) camParts.push(camMove);
  if (camAngle) camParts.push(camAngle);
  if (lens) camParts.push(lens);
  if (camParts.length) parts.push(`Camera: ${camParts.join(', ')}.`);

  const lightParts = [];
  if (lighting) lightParts.push(lighting);
  if (palette) lightParts.push(palette);
  if (emotion) lightParts.push(`${emotion} mood`);
  if (lightParts.length) parts.push(`Lighting & Mood: ${lightParts.join(', ')}.`);

  const styleParts = [];
  if (visStyle) styleParts.push(visStyle);
  if (fps) styleParts.push(fps);
  if (postfx) styleParts.push(postfx);
  if (styleParts.length) parts.push(`Style: ${styleParts.join(', ')}.`);

  if (action) parts.push(action);
  if (sound) parts.push(`Sound notes: ${sound}`);
  if (boosters.length) parts.push(boosters.join(', ') + '.');

  return parts.join('\n\n');
}

// ═══════════ BUILD VEO PROMPT ═══════════
function buildVeoPrompt() {
  const title = v('veo-shotTitle'), dur = v('veo-duration'),
        quality = v('veo-quality'), ratio = v('veo-ratio'),
        dialogue = v('veo-dialogue'), sfx = v('veo-sfx'), music = v('veo-music'),
        shotType = v('veo-shotType'), camMove = v('veo-camMove'),
        lighting = v('veo-lighting'), style = v('veo-style'),
        action = v('veo-action');
  const boosters = getActiveChips('veo-boosters');
  const charLock = getCharLock();
  const parts = [];

  if (title) parts.push(`[${title}]`);
  if (dur || quality || ratio) parts.push(`${dur || ''} | ${quality || ''} | ${ratio || ''}`);
  parts.push('CHARACTER: ' + charLock);
  if (action) parts.push(action);

  const camParts = [];
  if (shotType) camParts.push(shotType);
  if (camMove) camParts.push(camMove);
  if (camParts.length) parts.push(`Camera: ${camParts.join(', ')}.`);

  if (lighting) parts.push(`Lighting: ${lighting}.`);
  if (style) parts.push(`Style: ${style}.`);

  if (dialogue || sfx || music) {
    parts.push('AUDIO:');
    if (dialogue) parts.push(`Dialogue: ${dialogue}`);
    if (sfx) parts.push(`SFX: ${sfx}`);
    if (music) parts.push(`Music: ${music}`);
  }
  if (boosters.length) parts.push(boosters.join(', ') + '.');
  return parts.join('\n\n');
}

// ═══════════ BUILD MJ PROMPT ═══════════
function buildMJPrompt() {
  const subject = v('mj-subject'), styleRef = v('mj-styleRef'),
        version = v('mj-version'), seed = v('mj-seed'),
        cref = v('mj-cref'), sref = v('mj-sref'),
        negative = v('mj-negative'), lighting = v('mj-lighting'),
        palette = v('mj-palette');
  const stylize = document.getElementById('mj-stylize')?.value || '100';
  const chaos = document.getElementById('mj-chaos')?.value || '0';
  const weird = document.getElementById('mj-weird')?.value || '0';
  const ratio = getActiveMJRatio();
  const flags = getActiveChips('mj-flags');
  const charLock = getCharLock();

  const descParts = [];
  if (subject) descParts.push(subject);
  if (lighting) descParts.push(lighting);
  if (palette) descParts.push(palette);
  if (styleRef) descParts.push(styleRef);
  descParts.push(charLock);

  let prompt = `/imagine ${descParts.join(', ')}`;

  if (negative) prompt += ` --no ${negative}`;
  if (ratio) prompt += ` --ar ${ratio}`;
  if (version) prompt += ` --v ${version}`;
  if (stylize !== '100') prompt += ` --stylize ${stylize}`;
  if (chaos !== '0') prompt += ` --chaos ${chaos}`;
  if (weird !== '0') prompt += ` --weird ${weird}`;
  if (seed) prompt += ` --seed ${seed}`;
  if (cref) prompt += ` --cref ${cref}`;
  if (sref) prompt += ` --sref ${sref}`;
  flags.filter(f => !f.includes('(')).forEach(f => { prompt += ` ${f}`; });

  return prompt;
}

// ═══════════ BUILD RUNWAY PROMPT ═══════════
function buildRunwayPrompt() {
  const title = v('rw-shotTitle'), dur = v('rw-duration'),
        ratio = v('rw-ratio'), mode = v('rw-mode'),
        m1 = v('rw-motion1'), m2 = v('rw-motion2'), m3 = v('rw-motion3'),
        cam = v('rw-cam'), style = v('rw-style'), lighting = v('rw-lighting'),
        action = v('rw-action');
  const boosters = getActiveChips('rw-boosters');
  const charLock = getCharLock();
  const parts = [];

  if (title) parts.push(`[${title}]`);
  if (mode) parts.push(`Mode: ${mode}${dur ? ' | ' + dur : ''}${ratio ? ' | ' + ratio : ''}`);
  parts.push('CHARACTER: ' + charLock);
  if (action) parts.push(action);

  const motions = [m1, m2, m3].filter(Boolean);
  if (motions.length) parts.push('MOTION BRUSH:\n' + motions.map((m, i) => `  ${i + 1}. ${m}`).join('\n'));

  const camParts = [];
  if (cam) camParts.push(cam);
  if (lighting) camParts.push(lighting);
  if (style) camParts.push(style);
  if (camParts.length) parts.push(camParts.join(', ') + '.');
  if (boosters.length) parts.push(boosters.join(', ') + '.');

  return parts.join('\n\n');
}

// ═══════════ BUILD KLING PROMPT ═══════════
function buildKlingPrompt() {
  const title = v('kl-shotTitle'), dur = v('kl-duration'),
        mode = v('kl-mode'), motion = v('kl-motion'),
        shot = v('kl-shot'), style = v('kl-style'),
        expression = v('kl-expression'), action = v('kl-action');
  const boosters = getActiveChips('kl-boosters');
  const charLock = getCharLock();
  const parts = [];

  if (title) parts.push(`[${title}]`);
  const meta = [mode, dur, motion].filter(Boolean);
  if (meta.length) parts.push(meta.join(' | '));
  parts.push('CHARACTER: ' + charLock);
  if (action) parts.push(action);

  const camParts = [shot, style, expression].filter(Boolean);
  if (camParts.length) parts.push(camParts.join(', ') + '.');
  if (boosters.length) parts.push(boosters.join(', ') + '.');

  return parts.join('\n\n');
}

// ═══════════ BUILD PIKA PROMPT ═══════════
function buildPikaPrompt() {
  const title = v('pk-shotTitle'), dur = v('pk-duration'),
        ratio = v('pk-ratio'), style = v('pk-style'),
        cam = v('pk-cam'), negative = v('pk-negative'),
        action = v('pk-action');
  const pikaffects = getActiveChips('pk-pikaffects');
  const boosters = getActiveChips('pk-boosters');
  const charLock = getCharLock();
  const parts = [];

  if (title) parts.push(`[${title}]`);
  const meta = [dur, ratio, style].filter(Boolean);
  if (meta.length) parts.push(meta.join(' | '));
  parts.push('CHARACTER: ' + charLock);
  if (action) parts.push(action);
  if (pikaffects.length) parts.push(`Pikaffects: ${pikaffects.join(', ')}.`);
  if (cam) parts.push(`Camera: ${cam}.`);
  if (negative) parts.push(`[Negative: ${negative}]`);
  if (boosters.length) parts.push(boosters.join(', ') + '.');

  return parts.join('\n\n');
}

// ═══════════ MASTER BUILD ═══════════
function buildCurrentShot() {
  let prompt = '';
  const outputId = currentPlatform + '-promptOutput';
  const outputEl = document.getElementById(outputId);

  if (promptView === 'charlock') {
    const cl = getCharLock();
    prompt = cl === '[CHARACTER LOCK — fill in the left panel]' ? '' : cl;
    if (outputEl) {
      outputEl.textContent = prompt || '';
      if (!prompt) outputEl.innerHTML = '<span class="prompt-placeholder">Fill in the Character Lock panel on the left…</span>';
      outputEl.classList.toggle('has-content', !!prompt);
    }
    return;
  }

  if (promptView === 'full') {
    renderFullScript();
    return;
  }

  switch (currentPlatform) {
    case 'sora':   prompt = buildSoraPrompt(); break;
    case 'veo3':   prompt = buildVeoPrompt(); break;
    case 'mj':     prompt = buildMJPrompt(); break;
    case 'runway': prompt = buildRunwayPrompt(); break;
    case 'kling':  prompt = buildKlingPrompt(); break;
    case 'pika':   prompt = buildPikaPrompt(); break;
  }

  const shot = shots.find(s => s.id === currentShotId);
  if (shot) {
    const titleEl = document.getElementById(currentPlatform + '-shotTitle') ||
                    document.getElementById('sora-shotTitle');
    if (titleEl && titleEl.value) shot.title = titleEl.value;
    const durEl = document.getElementById(currentPlatform + '-duration') ||
                  document.getElementById(currentPlatform === 'veo3' ? 'veo-duration' : currentPlatform + '-duration');
    if (durEl && durEl.value) shot.duration = durEl.value;
    shot.platform = currentPlatform;
    shot.prompt = prompt;
  }
  renderShotList();

  if (outputEl) {
    const hasContent = prompt.replace(/\[CHARACTER LOCK[^\]]*\]/g, '').trim().length > 30;
    if (hasContent) {
      outputEl.textContent = prompt;
      outputEl.classList.add('has-content');
    } else {
      outputEl.innerHTML = '<span class="prompt-placeholder">Fill in the fields above to build your prompt…</span>';
      outputEl.classList.remove('has-content');
    }
  }
}

// ═══════════ FULL SCRIPT ═══════════
function renderFullScript() {
  const outputId = currentPlatform + '-promptOutput';
  const outputEl = document.getElementById(outputId);
  if (!outputEl) return;
  const charLock = getCharLock();
  const allText = [
    `=== CHARACTER LOCK ===\n${charLock}`,
    ...shots.map(s => `=== ${s.title || 'Shot ' + s.id} ===\n${s.prompt || '[Not yet built]'}`)
  ].join('\n\n---\n\n');
  outputEl.textContent = allText;
  outputEl.classList.add('has-content');
}

// ═══════════ MODAL ═══════════
function openModal() {
  const charLock = getCharLock();
  const body = document.getElementById('modalBody');
  body.innerHTML = `
    <div class="modal-shot-block">
      <div class="modal-shot-label">Character Lock (paste into every prompt)</div>
      <div class="modal-shot-text">${charLock}</div>
    </div>
    ${shots.map(s => `
      <div class="modal-shot-block">
        <div class="modal-shot-label">${s.title || 'Shot ' + s.id} — ${(s.platform || '').toUpperCase()}</div>
        <div class="modal-shot-text">${s.prompt || '[Not yet built — select this shot and fill in the form]'}</div>
      </div>
    `).join('')}
  `;
  document.getElementById('modalOverlay').classList.add('open');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
}
function closeModalOutside(e) {
  if (e.target === document.getElementById('modalOverlay')) closeModal();
}
function copyModalContent() {
  const charLock = getCharLock();
  const text = [
    `CHARACTER LOCK:\n${charLock}`,
    ...shots.map(s => `${s.title || 'Shot ' + s.id}:\n${s.prompt || ''}`)
  ].join('\n\n---\n\n');
  forgeCopy(text, () => showToast('All shots copied!'));
  closeModal();
}

// ═══════════ COPY ═══════════
function copyCurrentPrompt() {
  const outputId = currentPlatform + '-promptOutput';
  const el = document.getElementById(outputId);
  if (!el) return;
  const text = el.textContent;
  if (!text || text.includes('Fill in the fields')) return;
  forgeCopy(text, () => showToast('Prompt copied!'));
}

// ═══════════ RESET ═══════════
function resetCurrentShot() {
  const panels = { sora: 'sora', veo3: 'veo', mj: 'mj', runway: 'rw', kling: 'kl', pika: 'pk' };
  const prefix = panels[currentPlatform];
  if (!prefix) return;
  document.querySelectorAll(`#panel-${currentPlatform} input, #panel-${currentPlatform} select, #panel-${currentPlatform} textarea`)
    .forEach(el => {
      if (el.tagName === 'SELECT') el.selectedIndex = 0;
      else el.value = '';
    });
  document.querySelectorAll(`#panel-${currentPlatform} .chip`).forEach(c => c.className = 'chip');
  document.querySelectorAll('.mj-ratio-chip').forEach(c => c.classList.remove('active'));
  buildCurrentShot();
}

// ═══════════ TOAST ═══════════
function showToast(msg) {
  const msgEl = document.getElementById('toastMsg');
  if (msgEl) msgEl.textContent = msg;
  forgeShowToast(2200);
}

// ═══════════ INIT ═══════════
init();
