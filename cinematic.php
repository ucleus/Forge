<?php
$pageTitle = 'Mockup Forge — Cinematic';
$pageId = 'cinematic';
$pageStyles = ['assets/css/cinematic.css'];
$pageScripts = ['assets/js/cinematic.js'];
$exportAction = "forgeShowToast(2200, 'Cinematic export not yet available.');";
$newPromptAction = 'addShot()';
$newPromptLabel = '+ Add Shot';
include 'partials/header.php';
?>

<!-- PAGE HEADER -->
<div class="page-header">
  <div class="page-title-block">
    <div class="page-eyebrow">AI Video / Text-to-Video</div>
    <h1 class="page-title">Cinematic Builder</h1>
    <p class="page-sub">Build shot-by-shot prompts for Sora, Veo 3, Midjourney, Runway, Kling &amp; Pika</p>
  </div>
</div>

<!-- PLATFORM TABS -->
<div class="platform-bar" id="platformBar">
  <button class="platform-tab active" data-p="sora" onclick="switchPlatform('sora', this)">
    <span class="pt-dot"></span> Sora
  </button>
  <button class="platform-tab" data-p="veo3" onclick="switchPlatform('veo3', this)">
    <span class="pt-dot"></span> Veo 3
  </button>
  <button class="platform-tab" data-p="mj" onclick="switchPlatform('mj', this)">
    <span class="pt-dot"></span> Midjourney
  </button>
  <button class="platform-tab" data-p="runway" onclick="switchPlatform('runway', this)">
    <span class="pt-dot"></span> Runway Gen-4
  </button>
  <button class="platform-tab" data-p="kling" onclick="switchPlatform('kling', this)">
    <span class="pt-dot"></span> Kling
  </button>
  <button class="platform-tab" data-p="pika" onclick="switchPlatform('pika', this)">
    <span class="pt-dot"></span> Pika
  </button>
</div>

<!-- MAIN GRID -->
<div class="main-grid">

  <!-- LEFT: Character Lock + Shot List -->
  <div class="left-panel">

    <!-- Character Lock -->
    <div class="char-lock-card">
      <div class="card-header">
        <div class="card-icon lime">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </div>
        <div>
          <div class="card-title">Character Lock</div>
          <div class="card-subtitle">Paste into every prompt</div>
        </div>
      </div>
      <div class="field-group">
        <label class="field-label">Character Name</label>
        <input class="field-input" id="charName" placeholder="e.g. Marcus, The Hero" oninput="buildCurrentShot()">
      </div>
      <div class="field-group">
        <label class="field-label">Age / Gender / Ethnicity</label>
        <input class="field-input" id="charDemo" placeholder="e.g. 10yr old Black Jamaican boy" oninput="buildCurrentShot()">
      </div>
      <div class="field-group">
        <label class="field-label">Physical Description</label>
        <textarea class="field-textarea" id="charPhysical" placeholder="build, skin tone, hair, face features..." oninput="buildCurrentShot()"></textarea>
      </div>
      <div class="field-group">
        <label class="field-label">Outfit</label>
        <input class="field-input" id="charOutfit" placeholder="e.g. white tee, ripped jeans, yellow sneakers" oninput="buildCurrentShot()">
      </div>
      <div class="field-group">
        <label class="field-label">Props / Objects Carrying</label>
        <input class="field-input" id="charProps" placeholder="e.g. bag of mangoes, yellow BMX bike" oninput="buildCurrentShot()">
      </div>
    </div>

    <!-- Shot List -->
    <div class="shot-list-card">
      <div class="slc-header">
        <span class="slc-title">Shot List <span id="shotCountBadge" style="color:var(--lime)">1</span></span>
        <button class="add-shot-btn" onclick="addShot()">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add Shot
        </button>
      </div>
      <div class="shot-list" id="shotList"></div>
    </div>

  </div>

  <!-- RIGHT: Platform-specific form -->
  <div class="right-panel">

    <!-- ══════════ SORA PANEL ══════════════════ -->
    <div class="platform-panel active" id="panel-sora">
      <div class="shot-form">
        <div class="info-box cyan">
          <strong>Sora (OpenAI)</strong> — up to 20s clips, 1080p. Excels at cinematic physics, complex motion, and scene continuity. Max results come from precise shot direction + camera language.
        </div>

        <div class="form-section">
          <div class="form-section-title">Shot Identity</div>
          <div class="fields-grid">
            <div class="field-group">
              <label class="field-label">Shot Title</label>
              <input class="field-input" id="sora-shotTitle" placeholder="e.g. The Mango Heist" oninput="buildCurrentShot()">
            </div>
            <div class="field-group">
              <label class="field-label">Scene Number</label>
              <input class="field-input" id="sora-sceneNum" placeholder="Scene 1 of 3" oninput="buildCurrentShot()">
            </div>
            <div class="field-group">
              <label class="field-label">Duration</label>
              <select class="field-select" id="sora-duration" onchange="buildCurrentShot()">
                <option value="">— Select —</option>
                <option>5 seconds</option>
                <option>10 seconds</option>
                <option>15 seconds</option>
                <option>20 seconds</option>
              </select>
            </div>
            <div class="field-group">
              <label class="field-label">Aspect Ratio</label>
              <select class="field-select" id="sora-ratio" onchange="buildCurrentShot()">
                <option value="">— Select —</option>
                <option>16:9 (Landscape)</option>
                <option>9:16 (Vertical)</option>
                <option>1:1 (Square)</option>
                <option>4:3</option>
                <option>2.39:1 (Cinematic)</option>
              </select>
            </div>
          </div>
        </div>

        <div class="form-section">
          <div class="form-section-title">Environment &amp; World</div>
          <div class="fields-grid">
            <div class="field-group">
              <label class="field-label">Location / Setting</label>
              <input class="field-input" id="sora-location" placeholder="e.g. Jamaican hillside village" oninput="buildCurrentShot()">
            </div>
            <div class="field-group">
              <label class="field-label">Time of Day</label>
              <select class="field-select" id="sora-timeofday" onchange="buildCurrentShot()">
                <option value="">— Select —</option>
                <option>Dawn</option><option>Morning</option><option>Midday</option>
                <option>Golden Hour</option><option>Dusk / Sunset</option>
                <option>Blue Hour</option><option>Night</option><option>Midnight</option>
              </select>
            </div>
            <div class="field-group">
              <label class="field-label">Weather</label>
              <select class="field-select" id="sora-weather" onchange="buildCurrentShot()">
                <option value="">— Select —</option>
                <option>Clear / Sunny</option><option>Partly Cloudy</option>
                <option>Overcast</option><option>Rain</option><option>Heavy Rain</option>
                <option>Fog / Mist</option><option>Snow</option><option>Storm</option>
                <option>Heat Haze</option>
              </select>
            </div>
            <div class="field-group">
              <label class="field-label">Season</label>
              <select class="field-select" id="sora-season" onchange="buildCurrentShot()">
                <option value="">— Select —</option>
                <option>Summer</option><option>Spring</option><option>Autumn / Fall</option><option>Winter</option><option>Tropical / Rainy Season</option>
              </select>
            </div>
          </div>
          <div class="field-group" style="margin-top:8px">
            <label class="field-label">Environment Details (anchor for consistency)</label>
            <textarea class="field-textarea" id="sora-envDetails" placeholder="e.g. colorful zinc-fence houses, mango trees, narrow dirt road, vibrant foliage..." oninput="buildCurrentShot()"></textarea>
          </div>
        </div>

        <div class="form-section">
          <div class="form-section-title">Camera Direction</div>
          <div class="fields-grid">
            <div class="field-group">
              <label class="field-label">Shot Type</label>
              <select class="field-select" id="sora-shotType" onchange="buildCurrentShot()">
                <option value="">— Select —</option>
                <option>Extreme Close-Up (ECU)</option><option>Close-Up (CU)</option>
                <option>Medium Close-Up (MCU)</option><option>Medium Shot (MS)</option>
                <option>Medium Wide (MWS)</option><option>Wide Shot (WS)</option>
                <option>Extreme Wide / Establishing</option>
                <option>Over-the-Shoulder (OTS)</option>
                <option>POV (Point of View)</option><option>Two-Shot</option>
              </select>
            </div>
            <div class="field-group">
              <label class="field-label">Camera Movement</label>
              <select class="field-select" id="sora-camMove" onchange="buildCurrentShot()">
                <option value="">— Select —</option>
                <option>Static / Locked Off</option><option>Pan Left</option><option>Pan Right</option>
                <option>Tilt Up</option><option>Tilt Down</option>
                <option>Dolly In (Push)</option><option>Dolly Out (Pull)</option>
                <option>Dolly Left / Right</option>
                <option>Tracking Shot (Follow)</option><option>Crane Up</option><option>Crane Down</option>
                <option>360° Orbit</option><option>Handheld (Shaky)</option>
                <option>Steadicam (Smooth Float)</option><option>Drone / Aerial</option>
                <option>Dutch Tilt</option><option>Whip Pan</option>
              </select>
            </div>
            <div class="field-group">
              <label class="field-label">Camera Angle</label>
              <select class="field-select" id="sora-camAngle" onchange="buildCurrentShot()">
                <option value="">— Select —</option>
                <option>Eye Level</option><option>Low Angle</option><option>High Angle</option>
                <option>Bird's Eye / Top Down</option><option>Worm's Eye</option>
                <option>Dutch / Canted</option><option>Aerial</option>
              </select>
            </div>
            <div class="field-group">
              <label class="field-label">Lens / Depth of Field</label>
              <select class="field-select" id="sora-lens" onchange="buildCurrentShot()">
                <option value="">— Select —</option>
                <option>Wide Angle (Deep Focus)</option>
                <option>Normal Lens</option><option>Telephoto (Compression)</option>
                <option>Shallow DOF (Bokeh Background)</option>
                <option>Macro (Extreme Detail)</option>
                <option>Anamorphic (Lens Flares)</option>
              </select>
            </div>
          </div>
        </div>

        <div class="form-section">
          <div class="form-section-title">Style & Effects</div>
          <div class="fields-grid">
            <div class="field-group">
              <label class="field-label">Lighting</label>
              <select class="field-select" id="sora-lighting" onchange="buildCurrentShot()">
                <option value="">— Select —</option>
                <option>Soft Natural Light</option><option>Moody Cinematic Contrast</option>
                <option>Warm Sunset Glow</option><option>Cool Blue Night Tone</option>
                <option>Foggy Atmosphere</option><option>High Key Studio Light</option>
                <option>Volumetric God Rays</option>
              </select>
            </div>
            <div class="field-group">
              <label class="field-label">Color Palette</label>
              <input class="field-input" id="sora-palette" placeholder="e.g. muted earth tones, neon blue and pink" oninput="buildCurrentShot()">
            </div>
            <div class="field-group">
              <label class="field-label">Emotion / Mood</label>
              <select class="field-select" id="sora-emotion" onchange="buildCurrentShot()">
                <option value="">— Select —</option>
                <option>Intense</option><option>Dreamy</option><option>Suspenseful</option><option>Epic</option><option>Warm</option><option>Dark</option>
              </select>
            </div>
            <div class="field-group">
              <label class="field-label">Post FX</label>
              <select class="field-select" id="sora-postfx" onchange="buildCurrentShot()">
                <option value="">— Select —</option>
                <option>Film Grain</option><option>Lens Flare</option><option>Glow</option><option>Vignette</option><option>Chromatic Aberration</option>
              </select>
            </div>
          </div>
        </div>

        <div class="form-section">
          <div class="form-section-title">Story / Audio Notes</div>
          <div class="fields-grid">
            <div class="field-group" style="grid-column:1/-1">
              <label class="field-label">Action / Movement</label>
              <input class="field-input" id="sora-action" placeholder="e.g. running through market, jumping off wall" oninput="buildCurrentShot()">
            </div>
            <div class="field-group">
              <label class="field-label">Sound Design</label>
              <input class="field-input" id="sora-sound" placeholder="e.g. distant drums, rain on tin roof" oninput="buildCurrentShot()">
            </div>
            <div class="field-group">
              <label class="field-label">Music / Tone</label>
              <input class="field-input" id="sora-music" placeholder="e.g. ambient synth, tribal drums" oninput="buildCurrentShot()">
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>

<?php include 'partials/footer.php'; ?>
