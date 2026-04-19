<?php
$pageTitle = 'Forge — Nano Banana Builder';
$pageId = 'nanobanana';
$pageStyles = [];
$pageScripts = ['assets/js/generic-builder.js'];
$newPromptAction = 'resetAll()';
$newPromptLabel = 'Reset';
include 'partials/header.php';
?>

<div class="page-header">
  <h1 class="page-title">Nano Banana Builder</h1>
  <p class="page-sub">Craft imaginative, vibrant prompts tailored for Nano Banana's creative image generation.</p>
</div>

<div class="stats-row">
  <div class="stat-card">
    <div class="stat-label">Concept</div>
    <div class="stat-value" id="stat-concept">—</div>
    <div class="stat-sub">Core idea</div>
  </div>
  <div class="stat-card">
    <div class="stat-label">Textures</div>
    <div class="stat-value" id="stat-texture">—</div>
    <div class="stat-sub">Surface and detail</div>
  </div>
  <div class="stat-card">
    <div class="stat-label">Tone</div>
    <div class="stat-value" id="stat-tone">—</div>
    <div class="stat-sub">Mood / lighting</div>
  </div>
  <div class="stat-card accent">
    <div class="stat-label">Prompt Status</div>
    <div class="stat-value" id="stat-words">0 words</div>
    <div class="stat-sub">Ready to copy</div>
    <div class="stat-lime-badge" id="stat-badge">Draft</div>
  </div>
</div>

<div class="main-split">
  <div class="left-panel">
    <div class="field-section">
      <div class="field-section-title">Nano Banana Tips</div>
      <p style="margin:0;color:var(--text-muted);line-height:1.6;">Nano Banana favors bold visual concepts with clear adjectives, strong composition cues, and playful creative direction. Keep the prompt focused on imagery, colors, and mood.</p>
    </div>
  </div>

  <div class="right-panel">
    <div class="detail-body">
      <div class="field-section">
        <div class="field-section-title">Prompt Builder</div>
        <div class="fields-grid">
          <div class="field-group">
            <label class="field-label">Core Subject</label>
            <input class="field-input prompt-field" data-prompt-group="core" data-prompt-label="Core Subject" id="banana-subject" placeholder="A cyberpunk banana street vendor" />
          </div>
          <div class="field-group">
            <label class="field-label">Environment</label>
            <input class="field-input prompt-field" data-prompt-group="environment" data-prompt-label="Environment" id="banana-env" placeholder="in a neon-drenched market alley" />
          </div>
          <div class="field-group">
            <label class="field-label">Style / Genre</label>
            <select class="field-select prompt-field" data-prompt-group="genre" data-prompt-label="Style" id="banana-style">
              <option value="">— choose style —</option>
              <option>surreal illustration</option>
              <option>high contrast digital art</option>
              <option>retro synthwave</option>
              <option>whimsical children's book</option>
            </select>
          </div>
          <div class="field-group">
            <label class="field-label">Color Palette</label>
            <select class="field-select prompt-field" data-prompt-group="palette" data-prompt-label="Color Palette" id="banana-palette">
              <option value="">— choose colors —</option>
              <option>bright saturated neon</option>
              <option>pastel dreamscape</option>
              <option>dark cinematic tones</option>
              <option>warm golden hues</option>
            </select>
          </div>
          <div class="field-group" style="grid-column:1/-1">
            <label class="field-label">Creative Notes</label>
            <textarea class="field-textarea prompt-field" data-prompt-group="notes" data-prompt-label="Notes" id="banana-notes" placeholder="Add any extra details, motion, or focal interest..."></textarea>
          </div>
        </div>
      </div>
    </div>

    <div class="prompt-bar">
      <div class="prompt-output" id="promptOutput">
        <span class="prompt-placeholder">Fill in the sections — your prompt builds here in real time…</span>
      </div>
      <div class="prompt-actions">
        <button class="btn btn-ghost" onclick="resetAll()">↺ Reset</button>
        <div class="spacer"></div>
        <button class="btn btn-dark" onclick="buildPrompt()">⚡ Build</button>
        <button class="btn btn-lime" onclick="copyPrompt()">Copy Prompt</button>
      </div>
    </div>
  </div>
</div>

<?php include 'partials/footer.php'; ?>
