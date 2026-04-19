<?php
$pageTitle = 'Forge — Dall-e Builder';
$pageId = 'dalle';
$pageStyles = [];
$pageScripts = ['assets/js/generic-builder.js'];
$newPromptAction = 'resetAll()';
$newPromptLabel = 'Reset';
include 'partials/header.php';
?>

<div class="page-header">
  <h1 class="page-title">Dall-e Builder</h1>
  <p class="page-sub">Structure prompts for Dall-e with clarity, object detail, and simple descriptive language.</p>
</div>

<div class="stats-row">
  <div class="stat-card">
    <div class="stat-label">Subject</div>
    <div class="stat-value" id="stat-subject">—</div>
    <div class="stat-sub">Main object</div>
  </div>
  <div class="stat-card">
    <div class="stat-label">Style</div>
    <div class="stat-value" id="stat-style">—</div>
    <div class="stat-sub">Visual tone</div>
  </div>
  <div class="stat-card">
    <div class="stat-label">Format</div>
    <div class="stat-value" id="stat-format">—</div>
    <div class="stat-sub">Image structure</div>
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
      <div class="field-section-title">Dall-e Best Practices</div>
      <p style="margin:0;color:var(--text-muted);line-height:1.6;">Use concise English descriptions, avoid platform-specific flags, and emphasize nouns plus clear visual modifiers. Dall-e performs best when the subject, scene, lighting, and style are expressed directly.</p>
    </div>
  </div>

  <div class="right-panel">
    <div class="detail-body">
      <div class="field-section">
        <div class="field-section-title">Prompt Fields</div>
        <div class="fields-grid">
          <div class="field-group">
            <label class="field-label">Main Subject</label>
            <input class="field-input prompt-field" data-prompt-group="subject" data-prompt-label="Subject" id="dalle-subject" placeholder="A golden retriever wearing sunglasses" />
          </div>
          <div class="field-group">
            <label class="field-label">Scene / Background</label>
            <input class="field-input prompt-field" data-prompt-group="scene" data-prompt-label="Scene" id="dalle-scene" placeholder="on a sunny beach with palm trees" />
          </div>
          <div class="field-group">
            <label class="field-label">Style / Medium</label>
            <select class="field-select prompt-field" data-prompt-group="style" data-prompt-label="Style" id="dalle-style">
              <option value="">— select style —</option>
              <option>digital illustration</option>
              <option>photorealistic</option>
              <option>cartoon</option>
              <option>oil painting</option>
              <option>minimalist flat design</option>
            </select>
          </div>
          <div class="field-group">
            <label class="field-label">Image Size / Format</label>
            <select class="field-select prompt-field" data-prompt-group="format" data-prompt-label="Format" id="dalle-format">
              <option value="">— select size —</option>
              <option>1024x1024</option>
              <option>512x512</option>
              <option>512x768 portrait</option>
              <option>768x512 landscape</option>
            </select>
          </div>
          <div class="field-group">
            <label class="field-label">Composition / View</label>
            <select class="field-select prompt-field" data-prompt-group="format" data-prompt-label="Composition" id="dalle-composition">
              <option value="">— select composition —</option>
              <option>close-up</option>
              <option>wide shot</option>
              <option>bird's-eye view</option>
              <option>low-angle perspective</option>
              <option>symmetrical composition</option>
            </select>
          </div>
          <div class="field-group">
            <label class="field-label">Lighting / Mood</label>
            <select class="field-select prompt-field" data-prompt-group="mood" data-prompt-label="Lighting" id="dalle-lighting">
              <option value="">— select lighting —</option>
              <option>soft natural light</option>
              <option>dramatic studio lighting</option>
              <option>golden hour glow</option>
              <option>neon color contrast</option>
              <option>moody cinematic shadows</option>
            </select>
          </div>
          <div class="field-group" style="grid-column:1/-1">
            <label class="field-label">Additional Details</label>
            <textarea class="field-textarea prompt-field" data-prompt-group="details" data-prompt-label="Details" id="dalle-details" placeholder="include texture, materials, color palette, or composition notes..."></textarea>
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
