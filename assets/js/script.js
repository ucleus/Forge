// ═══════════════════ SVG ICONS ═══════════════════
const ICONS = {
  garment: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z"/></svg>`,
  model:   `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  styling: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7h18M3 12h18M3 17h12"/><circle cx="19" cy="17" r="2"/></svg>`,
  creative:`<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>`,
  notes:   `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`
};
 
// ═══════════════════ JSON DATA STORE ═══════════════════
// To add options: find the section + field, push a new string to its "options" array.
const DATA = {
  garment: {
    label: "Garment", iconKey: "garment", ref: "SECTION — 01", desc: "Type, color, fit, print",
    fields: [
      { id: "garmentType", label: "Garment Type", type: "select", options: [
        "T-Shirt (Crew Neck)","T-Shirt (V-Neck)","Hoodie (Pullover)","Hoodie (Zip-Up)",
        "Long Sleeve Tee","Tank Top","Sweatshirt (Crewneck)","Cropped Tee",
        "Cropped Hoodie","Overshirt","Streetwear Tee"
      ]},
      { id: "garmentColor", label: "Garment Color", type: "select", options: [
        "Black","White","Gray","Navy","Olive","Brown","Sand / Beige","Cream",
        "Red","Royal Blue","Yellow","Green","Purple",
        "Vintage Black (Washed)","Faded Gray (Washed)","Acid Wash",
        "Baby Blue (Pastel)","Blush Pink (Pastel)","Mint (Pastel)",
        "Lavender (Pastel)","Two-Tone / Color Block"
      ]},
      { id: "garmentFit", label: "Fit / Style", type: "select", options: [
        "Slim Fit","Regular Fit","Oversized / Boxy","Cropped","Tall Fit",
        "Relaxed Fit","Heavyweight","Vintage Wash / Distressed",
        "Streetwear Oversized Drop-Shoulder"
      ]},
      { id: "printStyle", label: "Print Style / Finish", type: "select", options: [
        "Screen Print","DTG (Direct-to-Garment)","Puff Print (Raised)","Embroidery",
        "Vinyl / Heat Transfer","Distressed / Cracked Print","Washed / Faded Print",
        "Tonal (Same Color Subtle)","Reflective","Metallic","Glow-in-the-Dark"
      ]},
      { id: "designSize", label: "Design Size", type: "select", options: [
        "Micro (Subtle Branding)","Small (Logo Size)","Medium (Balanced Graphic)",
        "Large (Dominant)","Oversized (Edge-to-Edge)"
      ]}
    ],
    extra: "placement",
    placements: [
      "Front Center","Small Left Chest","Small Right Chest","Full Front Oversized",
      "Upper Back Center","Small Upper Back","Large Back Center","Full Back Oversized",
      "Bottom Front Left","Bottom Front Right","Left Sleeve","Right Sleeve",
      "Both Sleeves","Vertical Sleeve Text","Hoodie Pocket Area","Hood Print",
      "Front + Back Combo","Sleeve + Chest Combo"
    ]
  },
  model: {
    label: "Model", iconKey: "model", ref: "SECTION — 02", desc: "Age, body, features",
    fields: [
      { id: "modelAge", label: "Age Range", type: "select", options: [
        "Teen (16–19)","Young Adult (20–30)","Adult (30–45)","Mature (45+)"
      ]},
      { id: "modelGender", label: "Gender", type: "select", options: [
        "Male","Female","Non-Binary / Androgynous"
      ]},
      { id: "modelRace", label: "Race / Ethnicity", type: "select", options: [
        "Black / African / Afro-Caribbean","White / Caucasian","Hispanic / Latino",
        "East Asian","Southeast Asian","South Asian","Middle Eastern","Mixed Race"
      ]},
      { id: "modelBody", label: "Body Type", type: "select", options: [
        "Slim","Athletic","Muscular","Average","Stocky","Plus-Size","Curvy","Lean Streetwear Build"
      ]},
      { id: "modelHeight", label: "Height", type: "select", options: [
        "Short (5'3\"–5'6\")","Average (5'7\"–5'10\")","Tall (5'11\"–6'3\")","Very Tall (6'4\"+)"
      ]},
      { id: "modelSkin", label: "Skin Tone", type: "select", options: [
        "Light","Fair","Medium","Olive","Brown","Dark"
      ]},
      { id: "modelHair", label: "Hair Style", type: "select", options: [
        "Short Fade","Bald / Shaved","Curly","Afro","Braids / Cornrows","Dreadlocks",
        "Straight Long","Wavy Medium","Buzz Cut","Slick Back","Middle Part"
      ]},
      { id: "modelFacial", label: "Facial Hair", type: "select", options: [
        "Clean-Shaven","Stubble","Goatee","Full Beard","Mustache"
      ]}
    ]
  },
  styling: {
    label: "Styling", iconKey: "styling", ref: "SECTION — 03", desc: "Outfit, shoes, accessories",
    fields: [
      { id: "bottomWear", label: "Bottom Wear", type: "select", options: [
        "Skinny Jeans (Ripped)","Skinny Jeans (Clean)","Relaxed Jeans","Baggy Jeans",
        "Cargo Pants","Joggers","Sweatpants","Athletic Shorts","Denim Shorts",
        "Cargo Shorts","Board Shorts","Chinos","Trousers"
      ]},
      { id: "footwear", label: "Footwear", type: "select", options: [
        "Sneakers (Low-Top)","Sneakers (High-Top)","Running Shoes","Slides",
        "Sandals","Boots","Loafers","Designer Sneakers","Skate Shoes"
      ]},
      { id: "headwear", label: "Headwear", type: "select", options: [
        "No Headwear","Baseball Cap","Snapback","Fitted Cap","Beanie","Durag","Headwrap","Bucket Hat"
      ]},
      { id: "watchType", label: "Watch", type: "select", options: [
        "No Watch","Smartwatch","Luxury Metal Watch","Minimal Leather Watch","Sport Watch"
      ]}
    ],
    extra: "accessories",
    accessories: [
      "Sunglasses","Backpack","Crossbody Bag","Belt",
      "Phone in Hand","Headphones","Rings (Hand)","Bracelets"
    ],
    jewelry: [
      "Thin Chain","Thick Chain","Pendant","Rings (Jewelry)",
      "Bracelet","Stud Earrings","Hoop Earrings","Grill"
    ]
  },
  creative: {
    label: "Creative Direction", iconKey: "creative", ref: "SECTION — 04", desc: "Style, pose, camera, scene",
    fields: [
      { id: "styleDir", label: "Style Direction", type: "select", options: [
        "Streetwear","Luxury Casual","Minimalist","High-Fashion Editorial",
        "Athletic / Gym Wear","Skatewear","Urban Fashion","Beachwear",
        "Vintage / Retro","Y2K Aesthetic","Rugged / Outdoors","Techwear"
      ]},
      { id: "pose", label: "Pose", type: "select", options: [
        "Standing Relaxed","Walking","Sitting","Leaning on Wall","Hands in Pockets",
        "Arms Crossed","Looking Over Shoulder","Full-Body Stance","Close-Up Chest Shot","Action Pose (Movement)"
      ]},
      { id: "cameraAngle", label: "Camera Angle", type: "select", options: [
        "Front View","3/4 Angle","Side Profile","Back View","Low Angle (Power Look)",
        "Eye Level","Close-Up","Wide Shot","Editorial Tilted Angle"
      ]},
      { id: "background", label: "Background / Scene", type: "select", options: [
        "White Studio Backdrop","Neutral Seamless Background","Urban Street","Graffiti Wall",
        "Luxury Interior","Minimal Modern Room","Beach / Boardwalk",
        "Warehouse / Industrial","Nature / Outdoor","Blurred City Background"
      ]},
      { id: "lighting", label: "Lighting", type: "select", options: [
        "Soft Studio Lighting","Bright Commercial Lighting","Natural Daylight",
        "Golden Hour (Sunset)","Moody Shadows","High Contrast Fashion Lighting",
        "Diffused Lighting","Dramatic Spotlight"
      ]},
      { id: "expression", label: "Expression", type: "select", options: [
        "Neutral","Confident","Serious","Smiling","Relaxed","Playful","Intense Editorial","Thoughtful"
      ]},
      { id: "imageType", label: "Image Type", type: "select", options: [
        "Studio Mockup (Clean, Product-Focused)","Lifestyle Shot (Real-World Feel)",
        "Editorial (Magazine Style)","E-Commerce (Front/Back Clean Views)",
        "Streetwear Campaign (Urban, Bold)","Lookbook (Multiple Angles Vibe)"
      ]}
    ]
  },
  notes: {
    label: "Custom Notes", iconKey: "notes", ref: "SECTION — 05", desc: "Extra design details",
    fields: [
      { id: "customNotes", label: "Additional Design Details", type: "textarea",
        placeholder: "e.g. skull with roses graphic, brand name across back in gothic font, vintage distressed look, add fog effect to background..." }
    ]
  }
};
 
// ═══════════════════ STATE ═══════════════════
const state = {};
const selectedPlacements = new Set();
const selectedAccessories = new Set();
const selectedJewelry = new Set();
let currentSection = 'garment';
const SECTION_KEYS = Object.keys(DATA);
let panelFilter = 'all';
 
// ═══════════════════ COMPLETION ═══════════════════
function getSectionCompletion(key) {
  const sec = DATA[key];
  let total = 0, filled = 0;
  sec.fields.forEach(f => {
    if (f.type === 'textarea') return;
    total++;
    if (state[f.id]) filled++;
  });
  if (sec.extra === 'placement') { total++; if (selectedPlacements.size) filled++; }
  if (sec.extra === 'accessories') { total += 2; if (selectedAccessories.size) filled++; if (selectedJewelry.size) filled++; }
  return total === 0 ? 0 : Math.round((filled / total) * 100);
}
 
// ═══════════════════ RENDER DETAIL FORM ═══════════════════
// KEY FIX: This only runs on section SWITCH — not on every keystroke.
// Textarea changes are handled by onTextareaChange() which never re-renders the DOM.
function renderDetail() {
  const sec = DATA[currentSection];
  document.getElementById('detailRef').textContent = sec.ref;
  document.getElementById('detailTitle').textContent = sec.label;
 
  let html = '';
  html += `<div class="field-section">
    <div class="field-section-title">${sec.label} Options</div>
    <div class="fields-grid">`;
 
  sec.fields.forEach(f => {
    if (f.type === 'select') {
      const v = state[f.id] || '';
      html += `<div class="field-group">
        <label class="field-label">${f.label}</label>
        <select class="field-select${v ? ' has-value' : ''}" id="fs_${f.id}"
          onchange="onSelectChange('${f.id}', this.value, this)">
          <option value="">— Choose —</option>
          ${f.options.map(o => `<option${v === o ? ' selected' : ''}>${o}</option>`).join('')}
        </select>
      </div>`;
    } else if (f.type === 'textarea') {
      // textarea uses a separate handler that does NOT re-render
      html += `<div class="field-group" style="grid-column:1/-1">
        <label class="field-label">${f.label}</label>
        <textarea class="field-textarea" id="fs_${f.id}"
          placeholder="${f.placeholder || ''}"
          oninput="onTextareaChange('${f.id}', this.value)">${state[f.id] || ''}</textarea>
      </div>`;
    }
  });
  html += `</div></div>`;
 
  // Placement chips
  if (sec.extra === 'placement' && sec.placements) {
    html += `<div class="field-section">
      <div class="field-section-title">
        Design Placement
        <span style="font-size:9px;text-transform:none;letter-spacing:0;font-weight:400;opacity:0.6;margin-left:4px">— select all that apply</span>
      </div>
      <div class="placement-wrap">
        ${sec.placements.map(p => `
          <div class="placement-chip${selectedPlacements.has(p) ? ' active' : ''}"
            onclick="togglePlacement('${p}')">${p}</div>
        `).join('')}
      </div>
    </div>`;
  }
 
  // Accessories + jewelry chips
  if (sec.extra === 'accessories') {
    html += `<div class="field-section">
      <div class="field-section-title">Accessories</div>
      <div class="chip-wrap">
        ${(sec.accessories || []).map(a => `
          <span class="m-chip${selectedAccessories.has(a) ? ' active' : ''}" data-type="acc"
            onclick="toggleAcc('${a}','acc')">${a}</span>
        `).join('')}
      </div>
    </div>
    <div class="field-section">
      <div class="field-section-title">Jewelry</div>
      <div class="chip-wrap">
        ${(sec.jewelry || []).map(j => `
          <span class="m-chip${selectedJewelry.has(j) ? ' active' : ''}" data-type="jew"
            onclick="toggleAcc('${j}','jew')">${j}</span>
        `).join('')}
      </div>
    </div>`;
  }
 
  document.getElementById('detailBody').innerHTML = html;
  updateDetailStatus();
}
 
// Update only the status badge in the header — no DOM wipe
function updateDetailStatus() {
  const pct = getSectionCompletion(currentSection);
  const statusEl = document.getElementById('detailStatus');
  statusEl.textContent = pct === 100 ? 'Complete' : pct > 0 ? `${pct}% done` : 'Incomplete';
  statusEl.className = 'detail-status' + (pct === 100 ? ' done' : '');
}
 
// ═══════════════════ EVENTS ═══════════════════
 
// Selects + chip toggles: update state, then refresh stats/sidebar/prompt only
function onSelectChange(id, value, el) {
  state[id] = value;
  if (el && el.classList) el.classList.toggle('has-value', !!value);
  updateDetailStatus();
  updateSidebar();
  updateStatCards();
  updateProgressDots();
  buildPrompt();
}
 
// TEXTAREA FIX: Only update state + prompt. Never touch the DOM.
function onTextareaChange(id, value) {
  state[id] = value;
  buildPrompt(); // just rebuilds the prompt output, nothing else
}
 
function togglePlacement(val) {
  selectedPlacements.has(val) ? selectedPlacements.delete(val) : selectedPlacements.add(val);
  // Toggle the chip class directly instead of re-rendering
  document.querySelectorAll('.placement-chip').forEach(el => {
    if (el.textContent.trim() === val) el.classList.toggle('active', selectedPlacements.has(val));
  });
  updateDetailStatus();
  updateSidebar();
  updateStatCards();
  updateProgressDots();
  buildPrompt();
}
 
function toggleAcc(val, type) {
  const set = type === 'acc' ? selectedAccessories : selectedJewelry;
  set.has(val) ? set.delete(val) : set.add(val);
  // Filter by data-type so same-named chips in different sections don't cross-toggle
  document.querySelectorAll(`.m-chip[data-type="${type}"]`).forEach(el => {
    if (el.textContent.trim() === val) el.classList.toggle('active', set.has(val));
  });
  updateDetailStatus();
  updateSidebar();
  updateStatCards();
  updateProgressDots();
  buildPrompt();
}
 
function switchSection(key) {
  currentSection = key;
  renderSectionList();
  renderDetail(); // full re-render only on section switch — textarea is safe here
}
 
function nextSection() {
  const idx = SECTION_KEYS.indexOf(currentSection);
  if (idx < SECTION_KEYS.length - 1) switchSection(SECTION_KEYS[idx + 1]);
}
function prevSection() {
  const idx = SECTION_KEYS.indexOf(currentSection);
  if (idx > 0) switchSection(SECTION_KEYS[idx - 1]);
}
 
function syncFilter(fieldId, value) {
  state[fieldId] = value;
  const el = document.getElementById(`fs_${fieldId}`);
  if (el) { el.value = value; el.classList.toggle('has-value', !!value); }
  updateDetailStatus();
  updateSidebar();
  updateStatCards();
  updateProgressDots();
  buildPrompt();
}
 
function handleSearch(q) {
  const needle = (q || '').toLowerCase();
  document.querySelectorAll('.placement-chip, .m-chip').forEach(el => {
    const matches = !needle || el.textContent.toLowerCase().includes(needle);
    el.style.display = matches ? '' : 'none';
  });
  document.querySelectorAll('.field-select option').forEach(el => {
    const matches = !needle || el.value === '' || el.textContent.toLowerCase().includes(needle);
    // Safari/iOS do not reliably respect option display:none.
    el.disabled = !matches;
    if (matches) {
      el.removeAttribute('hidden');
    } else {
      el.setAttribute('hidden', 'hidden');
    }
  });
}
 
function setFilter(mode, btn) {
  panelFilter = mode === 'done' ? 'done' : 'all';
  document.querySelectorAll('.panel-tab').forEach(tab => tab.classList.remove('active'));
  if (btn) btn.classList.add('active');
  updateSidebar();
}

// ═══════════════════ SIDEBAR ONLY (no form re-render) ═══════════════════
function updateSidebar() {
  let done = 0;
  SECTION_KEYS.forEach((key) => {
    const sec = DATA[key];
    const pct = getSectionCompletion(key);
    const isDone = pct === 100;
    if (isDone) done++;
    const isActive = key === currentSection;
    const badge = isDone ? '&#x2713; Done' : pct > 0 ? `${pct}%` : 'Empty';
    const el = document.querySelector(`.section-item[data-key="${key}"]`);
    if (el) {
      el.className = `section-item${isActive ? ' active' : ''}${isDone ? ' done' : ''}`;
      el.querySelector('.section-badge').innerHTML = badge;
      const shouldShow = panelFilter === 'all' || isDone;
      el.style.display = shouldShow ? '' : 'none';
    }
  });
  document.getElementById('doneCount').textContent = done;
}

 
// ═══════════════════ PROMPT BUILD ═══════════════════
function buildPrompt() {
  const g = state.garmentType, color = state.garmentColor, fit = state.garmentFit,
        ps = state.printStyle, ds = state.designSize;
  const age = state.modelAge, gender = state.modelGender, race = state.modelRace,
        body = state.modelBody, height = state.modelHeight, skin = state.modelSkin,
        hair = state.modelHair, facial = state.modelFacial;
  const bottom = state.bottomWear, shoes = state.footwear,
        hat = state.headwear, watch = state.watchType;
  const style = state.styleDir, pose = state.pose, cam = state.cameraAngle,
        bg = state.background, light = state.lighting, exp = state.expression,
        imgType = state.imageType;
  const notes = state.customNotes;
  const placements = [...selectedPlacements];
  const accs = [...selectedAccessories];
  const jew = [...selectedJewelry];
 
  const parts = [];
  const intro = imgType ? `Create a ${imgType.toLowerCase()}` : 'Create a high-quality realistic apparel mockup';
  const mParts = [];
  if (age) mParts.push(age.toLowerCase());
  if (race) mParts.push(race.toLowerCase());
  if (gender) mParts.push(gender.toLowerCase());
  if (body) mParts.push(`with a ${body.toLowerCase()} build`);
  if (height) mParts.push(`approximately ${height.toLowerCase()} tall`);
  if (skin) mParts.push(`${skin.toLowerCase()} skin tone`);
  const modelStr = mParts.length ? `featuring a ${mParts.join(', ')} model` : '';
  parts.push(`${intro}${modelStr ? ' ' + modelStr : ''}.`);
 
  const gParts = [];
  if (color) gParts.push(color.toLowerCase());
  if (fit) gParts.push(fit.toLowerCase());
  if (g) gParts.push(g.toLowerCase());
  if (gParts.length) parts.push(`The model is wearing a ${gParts.join(' ')}.`);
 
  const lParts = [];
  if (hair) lParts.push(`${hair.toLowerCase()} hair`);
  if (facial) lParts.push(`${facial.toLowerCase()} facial hair`);
  if (lParts.length) parts.push(`The model has ${lParts.join(' and ')}.`);
 
  if (placements.length) {
    parts.push(`Place the design${ds ? ' (' + ds.toLowerCase() + ')' : ''} at: ${placements.join(', ')}${ps ? ' with ' + ps.toLowerCase() + ' finish' : ''}.`);
  } else if (ds || ps) {
    parts.push(`Design is ${ds ? ds.toLowerCase() : 'standard'} size${ps ? ' with ' + ps.toLowerCase() + ' finish' : ''}.`);
  }
 
  const sParts = [];
  if (bottom) sParts.push(bottom.toLowerCase());
  if (shoes) sParts.push(shoes.toLowerCase());
  if (sParts.length) parts.push(`Style with ${sParts.join(' and ')}.`);
 
  const aParts = [];
  if (hat && hat !== 'No Headwear') aParts.push(hat.toLowerCase());
  if (watch && watch !== 'No Watch') aParts.push(watch.toLowerCase());
  if (accs.length) aParts.push(...accs.map(a => a.toLowerCase()));
  if (jew.length) aParts.push(...jew.map(j => j.toLowerCase()));
  if (aParts.length) parts.push(`Accessories: ${aParts.join(', ')}.`);
 
  const dParts = [];
  if (style) dParts.push(`${style.toLowerCase()} style`);
  if (pose) dParts.push(`${pose.toLowerCase()} pose`);
  if (cam) dParts.push(`${cam.toLowerCase()} angle`);
  if (bg) dParts.push(`${bg.toLowerCase()} background`);
  if (light) dParts.push(light.toLowerCase());
  if (exp) dParts.push(`${exp.toLowerCase()} expression`);
  if (dParts.length) parts.push(`Direction: ${dParts.join(', ')}.`);
 
  if (notes && notes.trim()) parts.push(`Notes: ${notes.trim()}`);
 
  const hasMeat = parts.filter(p => !p.startsWith('Create a high-quality realistic apparel mockup.')).length > 0;
  if (hasMeat) parts.push('Make fabric folds, print placement, shadows, and proportions look premium and realistic like a professional fashion campaign.');
 
  const prompt = parts.join(' ');
  const box = document.getElementById('promptOutput');
  if (hasMeat) {
    box.textContent = prompt;
    box.classList.add('has-content');
  } else {
    box.innerHTML = '<span class="prompt-placeholder">Fill in the sections — your prompt builds here in real time…</span>';
    box.classList.remove('has-content');
  }
 
  const wc = prompt.trim().split(/\s+/).filter(Boolean).length;
  document.getElementById('stat-words').textContent = `${wc} words`;
  const badge = document.getElementById('stat-badge');
  const filledCount = Object.values(state).filter(v => v && String(v).trim()).length;
  badge.textContent = filledCount >= 6 ? 'Ready' : 'Draft';
  badge.style.background = filledCount >= 6 ? 'var(--lime)' : '';
  badge.style.color = filledCount >= 6 ? '#111' : '';
}
 
// ═══════════════════ STAT CARDS ═══════════════════
function updateStatCards() {
  const gv = state.garmentType;
  document.getElementById('stat-garment').textContent = gv ? gv.split('(')[0].trim() : '—';
  const gf = DATA.garment.fields.filter(f => f.type === 'select');
  const gFilled = gf.filter(f => state[f.id]).length;
  document.getElementById('prog-garment').style.width = `${Math.round((gFilled / gf.length) * 100)}%`;
 
  const mf = DATA.model.fields.filter(f => f.type === 'select');
  const mFilled = mf.filter(f => state[f.id]).length;
  document.getElementById('stat-model').textContent = `${mFilled} / ${mf.length}`;
  document.getElementById('prog-model').style.width = `${Math.round((mFilled / mf.length) * 100)}%`;
 
  const sf = DATA.styling.fields.filter(f => f.type === 'select');
  const sFilled = sf.filter(f => state[f.id]).length + (selectedAccessories.size ? 1 : 0) + (selectedJewelry.size ? 1 : 0);
  document.getElementById('stat-styling').textContent = `${sFilled} items`;
  document.getElementById('prog-styling').style.width = `${Math.round((sFilled / (sf.length + 2)) * 100)}%`;
}
 
// ═══════════════════ PROGRESS DOTS ═══════════════════
function updateProgressDots() {
  let done = 0;
  const html = SECTION_KEYS.map(key => {
    const pct = getSectionCompletion(key);
    if (pct === 100) done++;
    const cls = pct === 100 ? 'done' : pct > 0 ? 'partial' : '';
    return `<div class="p-dot ${cls}" title="${DATA[key].label}: ${pct}%"></div>`;
  }).join('');
  document.getElementById('progressDots').innerHTML = html;
  document.getElementById('progressLabel').textContent = `${done} / ${SECTION_KEYS.length} sections`;
}
 
// ═══════════════════ FILTER BAR POPULATE ═══════════════════
function populateFilters() {
  const gt = document.getElementById('filterGarmentType');
  DATA.garment.fields.find(f => f.id === 'garmentType').options.forEach(o => {
    gt.appendChild(new Option(o, o));
  });
  const sd = document.getElementById('filterStyleDir');
  DATA.creative.fields.find(f => f.id === 'styleDir').options.forEach(o => {
    sd.appendChild(new Option(o, o));
  });
}
 
// ═══════════════════ COPY & RESET ═══════════════════
function copyPrompt() {
  const box = document.getElementById('promptOutput');
  const text = box.textContent;
  if (!text || text.includes('Fill in the sections')) return;
  forgeCopy(text, () => forgeShowToast(2200));
}

function startNewPrompt() {
  forgeStartNewPrompt(resetAll);
}

function openCollections() {
  forgeOpenCollections();
}

function exportPrompt() {
  forgeExportPrompt(() => {
    const text = document.getElementById('promptOutput').textContent.trim();
    return text && !text.includes('Fill in the sections') ? text : '';
  }, 'forge-fashion-prompt');
}

function showLayoutGrid() {
  forgeShowLayoutGrid('sectionList');
}

function openSettings() {
  forgeOpenSettings('searchInput');
}

function resetAll() {
  Object.keys(state).forEach(k => delete state[k]);
  selectedPlacements.clear(); selectedAccessories.clear(); selectedJewelry.clear();
  document.getElementById('filterGarmentType').selectedIndex = 0;
  document.getElementById('filterStyleDir').selectedIndex = 0;
  currentSection = 'garment';
  // Full re-render on reset is fine
  renderSectionList();
  renderDetail();
  updateStatCards();
  updateProgressDots();
  buildPrompt();
}
 
// ═══════════════════ RENDER SECTION LIST ═══════════════════
function renderSectionList() {
  const container = document.getElementById('sectionList');
  let done = 0;
  container.innerHTML = SECTION_KEYS.map((key) => {
    const sec = DATA[key];
    const pct = getSectionCompletion(key);
    const isDone = pct === 100;
    if (isDone) done++;
    const isActive = key === currentSection;
    const badge = isDone ? '&#x2713; Done' : pct > 0 ? `${pct}%` : 'Empty';
    return `<div class="section-item${isActive ? ' active' : ''}${isDone ? ' done' : ''}" data-key="${key}" onclick="switchSection('${key}')">
      <div class="section-avatar">${ICONS[sec.iconKey] || ''}</div>
      <div class="section-info">
        <div class="section-name">${sec.label}</div>
        <div class="section-desc">${sec.desc}</div>
      </div>
      <div class="section-badge">${badge}</div>
    </div>`;
  }).join('');
  document.getElementById('doneCount').textContent = done;
  updateSidebar();
}
 
// ═══════════════════ LOCAL STORAGE PERSISTENCE ═══════════════════
const LS_KEY = 'forge_fashion_state';

function saveToStorage() {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify({
      state,
      placements: [...selectedPlacements],
      accessories: [...selectedAccessories],
      jewelry: [...selectedJewelry],
      currentSection
    }));
  } catch (e) {}
}

function loadFromStorage() {
  try {
    const saved = JSON.parse(localStorage.getItem(LS_KEY));
    if (!saved) return;
    Object.assign(state, saved.state || {});
    (saved.placements || []).forEach(v => selectedPlacements.add(v));
    (saved.accessories || []).forEach(v => selectedAccessories.add(v));
    (saved.jewelry || []).forEach(v => selectedJewelry.add(v));
    if (saved.currentSection && DATA[saved.currentSection]) {
      currentSection = saved.currentSection;
    }
  } catch (e) {}
}

// Patch all mutating functions to auto-save after every change
const _origOnSelectChange = onSelectChange;
onSelectChange = function(id, value, el) { _origOnSelectChange(id, value, el); saveToStorage(); };

const _origTogglePlacement = togglePlacement;
togglePlacement = function(val) { _origTogglePlacement(val); saveToStorage(); };

const _origToggleAcc = toggleAcc;
toggleAcc = function(val, type) { _origToggleAcc(val, type); saveToStorage(); };

const _origOnTextareaChange = onTextareaChange;
onTextareaChange = function(id, value) { _origOnTextareaChange(id, value); saveToStorage(); };

const _origSyncFilter = syncFilter;
syncFilter = function(fieldId, value) { _origSyncFilter(fieldId, value); saveToStorage(); };

const _origResetAll = resetAll;
resetAll = function() {
  _origResetAll();
  try { localStorage.removeItem(LS_KEY); } catch (e) {}
};

// ═══════════════════ INIT ═══════════════════
loadFromStorage();
populateFilters();
// Restore filter bar dropdowns to match loaded state
if (state.garmentType) {
  const gtEl = document.getElementById('filterGarmentType');
  if (gtEl) { gtEl.value = state.garmentType; }
}
if (state.styleDir) {
  const sdEl = document.getElementById('filterStyleDir');
  if (sdEl) { sdEl.value = state.styleDir; }
}
renderSectionList();
renderDetail();
updateStatCards();
updateProgressDots();
buildPrompt();
