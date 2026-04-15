// ═══════════════════ ICONS ═══════════════════
const ICONS = {
  mode:     `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>`,
  subject:  `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  style:    `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`,
  camera:   `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>`,
  params:   `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20V10M6 20V4M18 20v-4"/></svg>`,
  advanced: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>`
};

// ═══════════════════ OUTPUT TYPE → STYLE KEYWORDS ═══════════════════
const STYLE_MAP = {
  "Realistic Photo":                "photorealistic, 8K ultra detail, shot on DSLR, hyperrealistic skin texture, sharp focus, RAW photo, natural depth",
  "Profile / Headshot":             "professional headshot, studio portrait photography, sharp focus on face, photorealistic, clean background, high detail",
  "Fashion / Model Shoot":          "high fashion editorial photography, Vogue magazine quality, commercial model shoot, photorealistic, professional studio lighting",
  "3D Animation — Pixar Style":     "Pixar animation style, 3D CGI render, subsurface skin scattering, expressive characters, cinematic studio lighting, Pixar movie still, Disney Pixar quality",
  "3D Animation — Disney Style":    "Disney 3D animation, polished CGI render, magical whimsical atmosphere, Disney movie still, expressive stylized characters",
  "3D Animation — DreamWorks Style":"DreamWorks animation 3D, cinematic CGI render, dynamic expressive characters, DreamWorks movie quality, vivid stylized realism",
  "3D Render — Blender / Octane":   "3D render, Blender Cycles, Octane render, ray tracing, PBR materials, subsurface scattering, ambient occlusion, photorealistic 3D",
  "2D Cartoon":                     "2D cartoon illustration, bold clean outlines, flat vibrant colors, professional animation quality, cartoon art style",
  "Comic / Graphic Novel":          "comic book art style, graphic novel illustration, bold ink outlines, dynamic composition, halftone shading, panel art",
  "Anime / Manga":                  "anime illustration style, manga art, cel shading, detailed expressive eyes, Japanese animation quality, anime studio quality",
  "Flat Design / Vector":           "flat design vector illustration, clean minimal geometric shapes, bold palette, no gradients, scalable vector art",
  "Digital Illustration":           "digital painting, detailed concept illustration, professional digital art, Artstation trending, painterly digital technique",
  "Concept Art":                    "concept art, detailed world-building design, game art quality, Artstation trending, cinematic matte painting composition",
  "Image Remix / Stylize":          "stylized artistic reinterpretation, style transfer applied, maintaining core subject, transformed aesthetic quality"
};

// ═══════════════════ DATA SECTIONS ═══════════════════
const DATA = [
  {
    key: "outputMode",
    label: "Output Mode",
    iconKey: "mode",
    ref: "SECTION — 01",
    desc: "Image type & MJ model",
    hint: `<strong>Tip:</strong> The image type auto-injects quality keywords into your prompt. Select <em>Anime / Manga</em> to auto-suggest <code>--niji 6</code>. Use Quick Presets above to fill multiple sections at once.`,
    fields: [
      { id: "outputType", label: "Image Type", type: "select",
        opts: ["","Realistic Photo","Profile / Headshot","Fashion / Model Shoot",
               "3D Animation — Pixar Style","3D Animation — Disney Style","3D Animation — DreamWorks Style",
               "3D Render — Blender / Octane","2D Cartoon","Comic / Graphic Novel","Anime / Manga",
               "Flat Design / Vector","Digital Illustration","Concept Art","Image Remix / Stylize"],
        lbls: ["— select type —","Realistic Photo","Profile / Headshot","Fashion / Model Shoot",
               "3D Animation — Pixar Style","3D Animation — Disney Style","3D Animation — DreamWorks Style",
               "3D Render — Blender / Octane","2D Cartoon","Comic / Graphic Novel",
               "Anime / Manga (use --niji 6)","Flat Design / Vector","Digital Illustration",
               "Concept Art","Image Remix / Stylize"]
      },
      { id: "aspectRatio", label: "Aspect Ratio", type: "select",
        opts: ["","1:1","16:9","9:16","4:3","3:4","3:2","2:3","21:9","7:4"],
        lbls: ["— select —","1:1 — Square","16:9 — Widescreen","9:16 — Tall Portrait",
               "4:3 — Classic Landscape","3:4 — Classic Portrait","3:2 — Photo Standard",
               "2:3 — Photo Portrait","21:9 — Ultra Wide Cinematic","7:4 — Wide"]
      },
      { id: "mjVersion", label: "MJ Version / Model", type: "select",
        opts: ["","--v 6.1","--v 6","--v 5.2","--niji 6","--niji 5"],
        lbls: ["— select —","--v 6.1 — Latest (Recommended)","--v 6 — Standard",
               "--v 5.2 — Stylized","--niji 6 — Anime (Recommended)","--niji 5 — Anime Classic"],
        hint: "Use --niji 6 for anime & illustration styles"
      }
    ]
  },
  {
    key: "subject",
    label: "Subject & Scene",
    iconKey: "subject",
    ref: "SECTION — 02",
    desc: "Who, what, where",
    hint: `<strong>Subject</strong> — Be specific: describe who or what (e.g. <em>"a teenage girl with braided hair in a yellow hoodie"</em>). <strong>Action & Environment</strong> add depth and context to your scene.`,
    fields: [
      { id: "subjectMain", label: "Main Subject", type: "textarea",
        placeholder: "e.g. a young woman with curly hair, a cartoon robot holding flowers, a mystical fox spirit with nine tails, a muscular knight in black armor…" },
      { id: "action", label: "Pose / Action", type: "select",
        opts: ["","standing confidently","sitting relaxed","walking forward","running dynamic",
               "jumping mid-air","flying through the sky","looking directly at camera",
               "looking away thoughtfully","smiling warmly","laughing with joy","fighting stance",
               "crouching low","dancing freely","arms crossed","hands in pockets",
               "leaning against a wall","back turned to camera","reaching out hand",
               "kneeling on ground"]
      },
      { id: "environment", label: "Environment / Setting", type: "select",
        opts: ["","studio white backdrop","clean solid color backdrop","soft gradient backdrop",
               "busy urban street","futuristic neon city","enchanted dense forest","vast desert dunes",
               "snowy mountain peaks","tropical beach at sunset","deep underwater ocean",
               "outer space with nebula","magical fantasy realm","dark rainy alley",
               "rooftop at golden hour","cozy warm interior","minimalist modern room",
               "neon-lit cyberpunk city","ancient overgrown ruins","magical glowing forest",
               "luxury penthouse interior","lush green park","misty foggy woods",
               "volcanic dramatic landscape","glowing ice cave","cherry blossom garden",
               "crowded festival street","empty library at night","floating sky islands"]
      },
      { id: "timeOfDay", label: "Time / Atmosphere", type: "select",
        opts: ["","golden hour sunrise","golden hour sunset","bright midday sun",
               "overcast soft diffused light","blue hour dusk","night with moonlight",
               "neon night city glow","foggy misty morning","stormy dramatic sky",
               "magic twilight hour","harsh midday shadows","warm candlelight ambiance",
               "cold blue moonlight","eerie low fog","blazing high noon heat"]
      }
    ]
  },
  {
    key: "styleAesthetics",
    label: "Style & Aesthetics",
    iconKey: "style",
    ref: "SECTION — 03",
    desc: "Art direction & visual mood",
    hint: `<strong>Art Style / Movement</strong> adds a recognizable aesthetic layer (e.g. Cyberpunk, Vaporwave, Art Deco). <strong>Visual Modifiers</strong> below are chip toggles — select multiple to stack effects.`,
    fields: [
      { id: "colorPalette", label: "Color Palette", type: "select",
        opts: ["","vibrant highly saturated","muted desaturated tones","monochromatic single hue",
               "warm tones reds oranges golds","cool tones blues purples teals",
               "soft pastel palette","electric neon colors","natural earth tones",
               "black and white high contrast","duotone two-color","film vintage faded colors",
               "jewel tones deep rich","candy pop bright","muted sage and terracotta"]
      },
      { id: "artMovement", label: "Art Style / Movement", type: "select",
        opts: ["","Art Deco geometric","Bauhaus minimalist","Surrealism dreamlike",
               "Impressionism painterly","Cyberpunk dark neon","Solarpunk lush futurism",
               "Retrofuturism 60s space age","Vaporwave aesthetic","Cottagecore pastoral",
               "Dark Academia moody","Y2K 2000s aesthetic","Memphis Design bold shapes",
               "Brutalist graphic","Minimalist clean","Maximalist ornate layered",
               "Steampunk brass gears","Afrofuturism","Lo-fi chill aesthetic",
               "Baroque rich dramatic","Pop Art bold flat","Ukiyo-e Japanese woodblock"]
      },
      { id: "renderQuality", label: "Quality / Detail Level", type: "select",
        opts: ["","8K ultra detailed","hyperrealistic extreme detail",
               "cinematic production quality","studio masterpiece","professional illustration quality",
               "highly detailed intricate","sharp focus crisp edges","painterly expressive detail",
               "clean polished finish","award-winning photography","trending on Artstation"]
      },
      { id: "filmTexture", label: "Film / Texture", type: "select",
        opts: ["","film grain 35mm analog","cinematic film tone LUT","polaroid instant photo",
               "lomography lo-fi saturated","cross-processed vivid film","clean sharp digital",
               "oil paint texture","watercolor paper wash","ink wash loose strokes",
               "stippling dot texture","risograph print texture","glitch digital artifact",
               "screen-printed halftone","linocut woodprint"]
      }
    ],
    extra: "chips",
    chipsLabel: "Visual Modifiers (multi-select)",
    chips: [
      "bokeh soft background","shallow depth of field","lens flare",
      "volumetric god rays","dramatic deep shadows","rim lighting glow",
      "subsurface skin scattering","ambient occlusion","motion blur",
      "tilt-shift miniature effect","long exposure light trails",
      "macro ultra close detail","chromatic aberration","anamorphic lens flare",
      "holographic iridescent sheen","double exposure","light leaks",
      "neon glow outline","mist and haze atmosphere","particle dust floating"
    ]
  },
  {
    key: "lightingCamera",
    label: "Lighting & Camera",
    iconKey: "camera",
    ref: "SECTION — 04",
    desc: "Light source, lens & angle",
    hint: `<strong>Lighting</strong> dramatically changes mood — golden hour feels warm and romantic, chiaroscuro feels dramatic, ring light feels clean and modern. <strong>Lens type</strong> controls crop and depth of field feel.`,
    fields: [
      { id: "lightingType", label: "Lighting Type", type: "select",
        opts: ["","natural soft window light","golden hour warm sunlight",
               "studio three-point lighting","dramatic chiaroscuro side lighting",
               "neon colored accent lights","backlit silhouette rim glow",
               "soft overhead ambient light","warm candlelight glow",
               "cold blue moonlight","cinematic key and fill","beauty ring light",
               "Rembrandt portrait lighting","split hard side lighting",
               "butterfly glamour lighting","practical environmental lighting",
               "HDR balanced natural exposure","bioluminescent glow","laser neon beams",
               "dappled forest light through leaves","overcast flat soft diffused"]
      },
      { id: "cameraAngle", label: "Camera Angle / POV", type: "select",
        opts: ["","eye level neutral","low angle heroic (looking up)","high angle (looking down)",
               "bird's eye top-down view","worm's eye extreme upward","dutch angle tilted frame",
               "over-the-shoulder POV","straight-on flat symmetric","three-quarter dynamic",
               "side profile view","first person POV","extreme macro close"]
      },
      { id: "lensStyle", label: "Shot / Lens Type", type: "select",
        opts: ["","tight close-up face detail","medium shot waist up","full body portrait",
               "wide establishing shot","extreme close-up eyes only","85mm portrait lens",
               "telephoto compressed bokeh","24mm wide angle slight distortion",
               "macro ultra-close detail","fisheye distorted panoramic",
               "aerial drone overhead shot"]
      },
      { id: "composition", label: "Composition Style", type: "select",
        opts: ["","rule of thirds balanced","perfectly centered symmetric",
               "leading lines directional flow","frame within a frame depth",
               "negative space minimal","dynamic diagonal tension",
               "foreground depth layering","golden ratio spiral","radial symmetry",
               "chaotic dynamic energy","minimal flat lay overhead"]
      }
    ]
  },
  {
    key: "mjParameters",
    label: "MJ Parameters",
    iconKey: "params",
    ref: "SECTION — 05",
    desc: "--stylize, --quality, --chaos & more",
    hint: `<strong>--s (Stylize)</strong> controls how much MJ's aesthetic is applied — 0 is literal, 1000 is maximum artistic interpretation. <strong>--c (Chaos)</strong> varies results — higher values give more unexpected outputs. <strong>--q 2</strong> adds the most detail.`,
    fields: [
      { id: "stylize", label: "Stylize  —  --s", type: "select",
        opts: ["","0","100","250","500","750","1000"],
        lbls: ["Default","--s 0 — Literal / No MJ style","--s 100 — Subtle MJ style",
               "--s 250 — Moderate style","--s 500 — Balanced (MJ default)",
               "--s 750 — Strong MJ style","--s 1000 — Max artistic flair"]
      },
      { id: "quality", label: "Quality  —  --q", type: "select",
        opts: ["",".25",".5","1","2"],
        lbls: ["Default (1)","--q .25 — Fastest draft","--q .5 — Draft quality",
               "--q 1 — Standard (recommended)","--q 2 — Max detail (slower)"]
      },
      { id: "chaos", label: "Chaos  —  --c", type: "select",
        opts: ["","0","10","25","50","75","100"],
        lbls: ["Default (0)","--c 0 — Consistent results","--c 10 — Slight variation",
               "--c 25 — Moderate variation","--c 50 — Varied results",
               "--c 75 — Very varied","--c 100 — Maximum chaos"]
      },
      { id: "weird", label: "Weird  —  --w", type: "select",
        opts: ["","250","500","1000","2000","3000"],
        lbls: ["Off (none)","--w 250 — Subtle quirk","--w 500 — Unusual elements",
               "--w 1000 — Surreal imagery","--w 2000 — Very weird","--w 3000 — Maximum weird"]
      },
      { id: "tileMode", label: "Tile Mode  —  --tile", type: "select",
        opts: ["","--tile"],
        lbls: ["Off (default)","--tile — Seamless repeating pattern"]
      }
    ]
  },
  {
    key: "advanced",
    label: "Negative & Advanced",
    iconKey: "advanced",
    ref: "SECTION — 06",
    desc: "Exclusions, seed & extras",
    hint: `<strong>--no</strong> removes unwanted elements (e.g. <em>blur, watermark, text, extra fingers, ugly</em>). <strong>--seed</strong> lets you reproduce the exact same result. <strong>--iw</strong> controls how strongly an uploaded reference image influences the output — paste the image URL before the subject text.`,
    fields: [
      { id: "negativePrompt", label: "Exclude with --no", type: "textarea",
        placeholder: "e.g. blur, watermark, text, extra limbs, deformed hands, ugly, low quality, grain, oversaturated…" },
      { id: "seedValue", label: "Seed  —  --seed", type: "select",
        opts: ["","--seed 111","--seed 222","--seed 333","--seed 1234",
               "--seed 4242","--seed 9999","--seed 42069","--seed 777777"]
      },
      { id: "imageWeight", label: "Image Weight  —  --iw", type: "select",
        opts: ["","--iw 0.5","--iw 1","--iw 1.5","--iw 2","--iw 3"],
        lbls: ["None (no reference image)","--iw 0.5 — Light image influence",
               "--iw 1 — Balanced influence","--iw 1.5 — Strong influence",
               "--iw 2 — Very strong influence","--iw 3 — Dominant reference"]
      },
      { id: "styleMode", label: "Style Mode", type: "select",
        opts: ["","--style raw","--personalize","--style cute",
               "--style expressive","--style scenic","--style original"],
        lbls: ["Default MJ aesthetic","--style raw — No MJ aesthetic filter",
               "--personalize — Your personal style","--style cute — Niji cute",
               "--style expressive — Niji expressive","--style scenic — Niji scenic",
               "--style original — Niji v5 original"]
      },
      { id: "characterRef", label: "Character Ref  —  --cref", type: "select",
        opts: ["","--cref [paste URL above]"],
        lbls: ["None","--cref — Use character reference URL (paste URL in subject)"]
      }
    ]
  }
];

// ═══════════════════ QUICK PRESETS ═══════════════════
const PRESETS = {
  realistic: {
    outputType:"Realistic Photo", aspectRatio:"3:2", mjVersion:"--v 6.1",
    renderQuality:"8K ultra detailed", lightingType:"natural soft window light",
    lensStyle:"85mm portrait lens", cameraAngle:"eye level neutral",
    composition:"rule of thirds balanced", quality:"1", stylize:"500",
    filmTexture:"film grain 35mm analog"
  },
  headshot: {
    outputType:"Profile / Headshot", aspectRatio:"1:1", mjVersion:"--v 6.1",
    lightingType:"beauty ring light", lensStyle:"85mm portrait lens",
    cameraAngle:"eye level neutral", renderQuality:"hyperrealistic extreme detail",
    composition:"perfectly centered symmetric", quality:"1", stylize:"250"
  },
  fashion: {
    outputType:"Fashion / Model Shoot", aspectRatio:"2:3", mjVersion:"--v 6.1",
    lightingType:"butterfly glamour lighting", lensStyle:"full body portrait",
    colorPalette:"vibrant highly saturated", renderQuality:"cinematic production quality",
    cameraAngle:"three-quarter dynamic", quality:"1", stylize:"500"
  },
  pixar: {
    outputType:"3D Animation — Pixar Style", aspectRatio:"16:9", mjVersion:"--v 6.1",
    colorPalette:"vibrant highly saturated", lightingType:"studio three-point lighting",
    renderQuality:"cinematic production quality", quality:"1", stylize:"750",
    timeOfDay:"golden hour sunset"
  },
  cartoon: {
    outputType:"2D Cartoon", aspectRatio:"1:1", mjVersion:"--v 6.1",
    colorPalette:"vibrant highly saturated", renderQuality:"professional illustration quality",
    artMovement:"Pop Art bold flat", stylize:"750"
  },
  anime: {
    outputType:"Anime / Manga", aspectRatio:"9:16", mjVersion:"--niji 6",
    colorPalette:"vibrant highly saturated", renderQuality:"cinematic production quality",
    lightingType:"golden hour warm sunlight", stylize:"750",
    timeOfDay:"magic twilight hour"
  },
  concept: {
    outputType:"Concept Art", aspectRatio:"16:9", mjVersion:"--v 6.1",
    renderQuality:"award-winning photography", artMovement:"Cyberpunk dark neon",
    colorPalette:"electric neon colors", lightingType:"neon colored accent lights",
    lensStyle:"wide establishing shot", stylize:"750", quality:"1"
  }
};

// ═══════════════════ STATE ═══════════════════
let state = {};
let activeChips = new Set();
let currentIdx = 0;
let panelFilter = 'all';

// ═══════════════════ INIT ═══════════════════
function init() {
  renderProgressDots();
  renderList();
  showSection(0);
}

// ═══════════════════ PROGRESS DOTS ═══════════════════
function renderProgressDots() {
  document.getElementById('progressDots').innerHTML =
    DATA.map(() => `<div class="p-dot"></div>`).join('');
}

function refreshDots() {
  const dots = document.querySelectorAll('.p-dot');
  let done = 0;
  DATA.forEach((s, i) => {
    const isDone = sectionDone(s);
    if (isDone) done++;
    dots[i].className = 'p-dot' + (isDone ? ' done' : '');
  });
  document.getElementById('doneCount').textContent = done;
  document.getElementById('progressLabel').textContent = `${done} / ${DATA.length} sections`;
}

function sectionDone(s) {
  const total = s.fields.length;
  const filled = s.fields.filter(f => {
    const v = state[f.id];
    return v && String(v).trim() !== '';
  }).length;
  return filled >= Math.ceil(total * 0.4);
}

// ═══════════════════ SECTION LIST ═══════════════════
function renderList() {
  const list = document.getElementById('sectionList');
  const items = panelFilter === 'done'
    ? DATA.filter(s => sectionDone(s))
    : DATA;

  list.innerHTML = items.map(s => {
    const i = DATA.indexOf(s);
    const done = sectionDone(s);
    const active = i === currentIdx;
    return `<div class="section-item${active ? ' active' : ''}${done ? ' done' : ''}"
      onclick="showSection(${i})">
      <div class="section-avatar">${ICONS[s.iconKey]}</div>
      <div class="section-info">
        <div class="section-name">${s.label}</div>
        <div class="section-desc">${s.desc}</div>
      </div>
      <div class="section-badge">${done ? '✓' : (i + 1)}</div>
    </div>`;
  }).join('');
}

// ═══════════════════ SHOW SECTION ═══════════════════
function showSection(idx) {
  currentIdx = idx;
  const s = DATA[idx];

  document.getElementById('detailRef').textContent = s.ref;
  document.getElementById('detailTitle').textContent = s.label;
  const done = sectionDone(s);
  const statusEl = document.getElementById('detailStatus');
  statusEl.textContent = done ? 'Complete' : 'Incomplete';
  statusEl.className = 'detail-status' + (done ? ' done' : '');

  renderBody(s);
  renderList();
}

function renderBody(s) {
  const body = document.getElementById('detailBody');
  let html = '';

  if (s.hint) {
    html += `<div class="mj-hint">${s.hint}</div>`;
  }

  html += `<div class="field-section">
    <div class="field-section-title">Settings</div>
    <div class="fields-grid">`;

  s.fields.forEach(f => {
    const val = state[f.id] || '';
    html += `<div class="field-group">
      <div class="field-label">${f.label}</div>`;

    if (f.type === 'select') {
      const opts = f.opts || [];
      const lbls = f.lbls || opts;
      html += `<select class="field-select${val ? ' has-value' : ''}" id="fld_${f.id}"
        onchange="onSelect('${f.id}', this.value)">`;
      opts.forEach((o, i) => {
        const l = lbls[i] !== undefined ? lbls[i] : o;
        const disp = l || '— select —';
        html += `<option value="${o}"${val === o ? ' selected' : ''}>${disp}</option>`;
      });
      html += `</select>`;
      if (f.hint) html += `<div class="field-hint">${f.hint}</div>`;
    } else if (f.type === 'textarea') {
      html += `<textarea class="field-textarea" id="fld_${f.id}"
        placeholder="${f.placeholder || ''}"
        oninput="onText('${f.id}', this.value)">${val}</textarea>`;
    }

    html += `</div>`;
  });

  html += `</div></div>`;

  // Chips
  if (s.extra === 'chips') {
    html += `<div class="field-section">
      <div class="field-section-title">${s.chipsLabel}</div>
      <div class="chip-wrap">`;
    s.chips.forEach(chip => {
      html += `<div class="m-chip${activeChips.has(chip) ? ' active' : ''}"
        data-chip="${chip}" onclick="toggleChip('${chip.replace(/'/g,"\\'")}', this)">${chip}</div>`;
    });
    html += `</div></div>`;
  }

  body.innerHTML = html;
}

// ═══════════════════ FIELD HANDLERS ═══════════════════
function onSelect(id, val) {
  state[id] = val;

  // Auto-suggest niji for anime
  if (id === 'outputType' && val === 'Anime / Manga') {
    if (!state['mjVersion'] || state['mjVersion'].startsWith('--v')) {
      state['mjVersion'] = '--niji 6';
    }
  }

  const el = document.getElementById('fld_' + id);
  if (el) el.className = 'field-select' + (val ? ' has-value' : '');

  refresh();
}

function onText(id, val) {
  state[id] = val;
  refresh();
}

function toggleChip(chip, el) {
  if (activeChips.has(chip)) {
    activeChips.delete(chip);
    el.classList.remove('active');
  } else {
    activeChips.add(chip);
    el.classList.add('active');
  }
  refresh();
}

// ═══════════════════ REFRESH ALL ═══════════════════
function refresh() {
  updateStats();
  updatePrompt();
  renderList();
  refreshDots();
}

// ═══════════════════ STATS ═══════════════════
function updateStats() {
  const type = state['outputType'] || '—';
  const short = type === '—' ? '—' : type.split(' — ')[0].split(' / ')[0];
  document.getElementById('stat-mode').textContent = short.length > 13 ? short.slice(0,12)+'…' : short;

  const subj = state['subjectMain']?.trim() ? 1 : 0;
  const env  = state['environment'] ? 1 : 0;
  document.getElementById('stat-subject').textContent =
    (subj + env) > 0 ? `${subj + env}/2 set` : '—';

  const paramFields = ['stylize','quality','chaos','weird'];
  const fp = paramFields.filter(f => state[f] && state[f] !== '').length;
  document.getElementById('stat-params').textContent = fp > 0 ? `${fp}/4 set` : '—';

  setProg('prog-mode',    state['outputType'] ? 100 : 0);
  setProg('prog-subject', subj ? 100 : env ? 50 : 0);
  setProg('prog-params',  (fp / 4) * 100);
}

function setProg(id, pct) {
  const el = document.getElementById(id);
  if (el) el.style.width = pct + '%';
}

// ═══════════════════ PROMPT BUILDER ═══════════════════
function buildPrompt() {
  const parts = [];
  const params = [];

  const subj = (state['subjectMain'] || '').trim();
  if (subj) parts.push(subj);

  const action = state['action'];
  if (action) parts.push(action);

  const env = state['environment'];
  if (env) parts.push(env);

  const time = state['timeOfDay'];
  if (time) parts.push(time);

  const outType = state['outputType'];
  if (outType && STYLE_MAP[outType]) parts.push(STYLE_MAP[outType]);

  const art = state['artMovement'];
  if (art) parts.push(art);

  const pal = state['colorPalette'];
  if (pal) parts.push(pal + ' color palette');

  const rq = state['renderQuality'];
  if (rq) parts.push(rq);

  const ft = state['filmTexture'];
  if (ft) parts.push(ft);

  if (activeChips.size > 0) parts.push([...activeChips].join(', '));

  const light = state['lightingType'];
  if (light) parts.push(light);

  const angle = state['cameraAngle'];
  if (angle) parts.push(angle);

  const lens = state['lensStyle'];
  if (lens) parts.push(lens);

  const comp = state['composition'];
  if (comp) parts.push(comp);

  const ar = state['aspectRatio'];
  if (ar) params.push(`--ar ${ar}`);

  const ver = state['mjVersion'];
  if (ver) params.push(ver);

  const sty = state['stylize'];
  if (sty) params.push(`--s ${sty}`);

  const q = state['quality'];
  if (q) params.push(`--q ${q}`);

  const c = state['chaos'];
  if (c && c !== '0') params.push(`--c ${c}`);

  const w = state['weird'];
  if (w) params.push(`--w ${w}`);

  const tile = state['tileMode'];
  if (tile) params.push(tile);

  const seed = state['seedValue'];
  if (seed) params.push(seed);

  const iw = state['imageWeight'];
  if (iw) params.push(iw);

  const sm = state['styleMode'];
  if (sm) params.push(sm);

  const cr = state['characterRef'];
  if (cr && cr !== '--cref [paste URL above]') params.push(cr);

  const neg = (state['negativePrompt'] || '').trim();
  if (neg) params.push(`--no ${neg}`);

  const txt = parts.filter(Boolean).join(', ');
  const par = params.join(' ');

  if (!txt && !par) return '';
  return `/imagine prompt: ${txt}${par ? ' ' + par : ''}`;
}

function updatePrompt() {
  const prompt = buildPrompt();
  const output = document.getElementById('promptOutput');
  const chips  = document.getElementById('paramChips');

  if (prompt) {
    output.textContent = prompt;
    output.classList.add('has-content');

    const words = prompt.split(/\s+/).filter(Boolean).length;
    document.getElementById('stat-words').textContent = words + ' words';
    document.getElementById('stat-badge').textContent = words > 20 ? 'Ready ✓' : 'Building…';

    const pv = [];
    if (state['aspectRatio']) pv.push(`--ar ${state['aspectRatio']}`);
    if (state['mjVersion'])   pv.push(state['mjVersion']);
    if (state['stylize'])     pv.push(`--s ${state['stylize']}`);
    if (state['quality'])     pv.push(`--q ${state['quality']}`);
    if (state['chaos'] && state['chaos'] !== '0') pv.push(`--c ${state['chaos']}`);
    if (state['weird'])       pv.push(`--w ${state['weird']}`);
    chips.innerHTML = pv.map(p => `<span class="param-chip">${p}</span>`).join('');
  } else {
    output.innerHTML = '<span class="prompt-placeholder">Fill in sections — your Midjourney /imagine prompt builds here in real time…</span>';
    output.classList.remove('has-content');
    document.getElementById('stat-words').textContent = '0 words';
    document.getElementById('stat-badge').textContent = 'Draft';
    chips.innerHTML = '';
  }
}

// ═══════════════════ COPY ═══════════════════
function copyPrompt() {
  const p = buildPrompt();
  if (!p) return;
  forgeCopy(p, () => forgeShowToast(2400));
}

function startNewPrompt() {
  resetAll();
  forgeShowToast(2200, 'Started a new prompt.');
}

function openCollections() {
  forgeShowToast(2200, 'Collections will be available in the SaaS dashboard.');
}

function exportPrompt() {
  const prompt = buildPrompt();
  if (!prompt) {
    forgeShowToast(2200, 'Build a prompt before exporting.');
    return;
  }
  forgeDownloadText(`forge-midjourney-prompt-${new Date().toISOString().slice(0, 10)}.txt`, prompt);
  forgeShowToast(2200, 'Prompt exported as .txt');
}

function showLayoutGrid() {
  const list = document.getElementById('sectionList');
  if (list) list.scrollIntoView({ behavior: 'smooth', block: 'start' });
  forgeShowToast(1800, 'Jumped to your section grid.');
}

function openSettings() {
  const search = document.getElementById('searchInput');
  if (search) search.focus();
  forgeShowToast(2200, 'Focused settings/search controls.');
}

// ═══════════════════ RESET ═══════════════════
function resetAll() {
  state = {};
  activeChips.clear();
  document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
  showSection(0);
  refresh();
}

// ═══════════════════ QUICK PRESETS ═══════════════════
function applyPreset(key, btn) {
  const p = PRESETS[key];
  if (!p) return;
  state = { ...p };
  activeChips.clear();
  document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  showSection(currentIdx);
  refresh();
}

// ═══════════════════ NAVIGATION ═══════════════════
function prevSection() { if (currentIdx > 0) showSection(currentIdx - 1); }
function nextSection() { if (currentIdx < DATA.length - 1) showSection(currentIdx + 1); }

function setFilter(mode, btn) {
  panelFilter = mode;
  document.querySelectorAll('.panel-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  renderList();
}

// ═══════════════════ SEARCH ═══════════════════
function handleSearch(q) {
  const query = q.toLowerCase().trim();
  document.querySelectorAll('.m-chip').forEach(el => {
    el.style.display = !query || el.textContent.toLowerCase().includes(query) ? '' : 'none';
  });
  document.querySelectorAll('.field-select option').forEach(el => {
    if (!el.value) return;
    el.hidden = query && !el.textContent.toLowerCase().includes(query);
  });
}

// ═══════════════════ START ═══════════════════
init();
