<?php
$pageTitle = 'Forge — Characters Builder';
$pageId = 'characters';
$pageStyles = [];
$pageScripts = ['assets/js/generic-builder.js'];
$newPromptAction = 'resetAll()';
$newPromptLabel = 'Reset';
include 'partials/header.php';
?>

<div class="page-header">
  <h1 class="page-title">Characters Builder</h1>
  <p class="page-sub">Create character-focused prompts with rich personality, appearance, and storytelling cues.</p>
</div>

<div class="stats-row">
  <div class="stat-card">
    <div class="stat-label">Identity</div>
    <div class="stat-value" id="stat-identity">—</div>
    <div class="stat-sub">Name & role</div>
  </div>
  <div class="stat-card">
    <div class="stat-label">Appearance</div>
    <div class="stat-value" id="stat-appearance">—</div>
    <div class="stat-sub">Physical details</div>
  </div>
  <div class="stat-card">
    <div class="stat-label">Personality</div>
    <div class="stat-value" id="stat-personality">—</div>
    <div class="stat-sub">Behavior / mood</div>
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
      <div class="field-section-title">Character Prompt Notes</div>
      <p style="margin:0;color:var(--text-muted);line-height:1.6;">For strong character prompts, describe the character's role, emotion, outfit, and setting. Use vivid adjectives but keep the structure clear.</p>
    </div>
  </div>

  <div class="right-panel">
    <div class="detail-body">
      <div class="field-section">
        <div class="field-section-title">Character Builder</div>
        <div class="fields-grid">
          <div class="field-group">
            <label class="field-label">Name / Title</label>
            <input class="field-input prompt-field" data-prompt-group="identity" data-prompt-label="Name" id="char-name" placeholder="Ezra, the desert alchemist" />
          </div>
          <div class="field-group">
            <label class="field-label">Role / Archetype</label>
            <input class="field-input prompt-field" data-prompt-group="identity" data-prompt-label="Role" id="char-role" placeholder="a cunning thief" />
          </div>
          <div class="field-group">
            <label class="field-label">Physical Description</label>
            <textarea class="field-textarea prompt-field" data-prompt-group="appearance" data-prompt-label="Appearance" id="char-appearance" placeholder="tall, lean, silver hair, glowing green eyes..."></textarea>
          </div>
          <div class="field-group">
            <label class="field-label">Wardrobe / Gear</label>
            <input class="field-input prompt-field" data-prompt-group="appearance" data-prompt-label="Wardrobe" id="char-wardrobe" placeholder="worn leather coat with brass buckles" />
          </div>
          <div class="field-group">
            <label class="field-label">Personality / Mood</label>
            <select class="field-select prompt-field" data-prompt-group="personality" data-prompt-label="Personality" id="char-mood">
              <option value="">— choose mood —</option>
              <option>brooding and mysterious</option>
              <option>confident and playful</option>
              <option>stoic and disciplined</option>
              <option>gentle and compassionate</option>
            </select>
          </div>
          <div class="field-group">
            <label class="field-label">Character Goal / Conflict</label>
            <input class="field-input prompt-field" data-prompt-group="goal" data-prompt-label="Goal" id="char-goal" placeholder="wants to escape the city" />
          </div>
          <div class="field-group">
            <label class="field-label">Setting</label>
            <input class="field-input prompt-field" data-prompt-group="setting" data-prompt-label="Setting" id="char-setting" placeholder="in a misty forest clearing" />
          </div>
          <div class="field-group" style="grid-column:1/-1">
            <label class="field-label">Story Hook</label>
            <textarea class="field-textarea prompt-field" data-prompt-group="hook" data-prompt-label="Story Hook" id="char-hook" placeholder="Add motivation, conflict, or action for the scene..."></textarea>
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
