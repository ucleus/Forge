<?php
$pageTitle = 'Forge — Fashion Builder';
$pageId = 'fashion';
$pageStyles = [];
$pageScripts = ['assets/js/script.js'];
$newPromptAction = 'forgeStartNewPrompt(resetAll)';
$newPromptLabel = '+ New Prompt';
include 'partials/header.php';
?>

<!-- ── PAGE HEADER ── -->
<div class="page-header">
  <h1 class="page-title">Fashion Builder</h1>
  <div style="display:flex;align-items:center;gap:8px">
    <div class="progress-dots" id="progressDots"></div>
    <span class="prog-label" id="progressLabel">0 / 5 sections</span>
  </div>
</div>

<!-- ── STAT CARDS ── -->
<div class="stats-row">
  <div class="stat-card">
    <div class="stat-label">Garment</div>
    <div class="stat-value" id="stat-garment">—</div>
    <div class="stat-sub">Type selected</div>
    <div class="stat-progress"><div class="stat-progress-fill" id="prog-garment" style="width:0%"></div></div>
  </div>
  <div class="stat-card">
    <div class="stat-label">Model</div>
    <div class="stat-value" id="stat-model">—</div>
    <div class="stat-sub">Attributes set</div>
    <div class="stat-progress"><div class="stat-progress-fill" id="prog-model" style="width:0%"></div></div>
  </div>
  <div class="stat-card">
    <div class="stat-label">Styling</div>
    <div class="stat-value" id="stat-styling">—</div>
    <div class="stat-sub">Items chosen</div>
    <div class="stat-progress"><div class="stat-progress-fill" id="prog-styling" style="width:0%"></div></div>
  </div>
  <div class="stat-card accent">
    <div class="stat-label">Prompt Status</div>
    <div class="stat-value" id="stat-words">0 words</div>
    <div class="stat-sub">Click Copy to use</div>
    <div class="stat-lime-badge" id="stat-badge">Draft</div>
  </div>
</div>

<!-- ── FILTER BAR ── -->
<div class="filter-bar">
  <div class="filter-label">
    Active sections
    <span class="filter-count">5</span>
  </div>
  <select class="filter-select" id="filterGarmentType" onchange="syncFilter('garmentType', this.value)">
    <option value="">All Garments</option>
  </select>
  <select class="filter-select" id="filterStyleDir" onchange="syncFilter('styleDir', this.value)">
    <option value="">All Styles</option>
  </select>
  <div class="filter-spacer"></div>
  <div class="search-box">
    <span style="color:var(--text-muted);font-size:14px">⌕</span>
    <input type="text" placeholder="Search options..." id="searchInput" oninput="handleSearch(this.value)">
  </div>
</div>

<!-- ── MAIN SPLIT ── -->
<div class="main-split">

  <!-- LEFT: Section List -->
  <div class="left-panel">
    <div class="panel-tabs">
      <button class="panel-tab active" onclick="setFilter('all',this)">All <span class="panel-tab-count">5</span></button>
      <button class="panel-tab" onclick="setFilter('done',this)">Done <span class="panel-tab-count" id="doneCount">0</span></button>
    </div>
    <div class="section-list" id="sectionList"></div>
  </div>

  <!-- RIGHT: Detail + Form -->
  <div class="right-panel">
    <div class="detail-header">
      <div>
        <div class="detail-ref" id="detailRef">SECTION — 01</div>
        <div>
          <span class="detail-title" id="detailTitle">Garment</span>
          <span class="detail-status" id="detailStatus">Incomplete</span>
        </div>
      </div>
      <div class="detail-actions">
        <button class="icon-btn" onclick="prevSection()" title="Previous" aria-label="Previous section">←</button>
        <button class="icon-btn" onclick="nextSection()" title="Next" aria-label="Next section">→</button>
      </div>
    </div>

    <div class="detail-body" id="detailBody"></div>

    <div class="prompt-bar">
      <div class="prompt-output" id="promptOutput">
        <span class="prompt-placeholder">Fill in the sections — your prompt builds here in real time…</span>
      </div>
      <div class="prompt-actions">
        <button class="btn btn-ghost" onclick="resetAll()">↺ Reset</button>
        <div class="spacer"></div>
        <button class="btn btn-dark" onclick="buildPrompt()">⚡ Build</button>
        <button class="btn btn-lime" onclick="copyPrompt()"><span class="btn-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg></span>Copy Prompt</button>
      </div>
    </div>
  </div>

</div>

<?php include 'partials/footer.php'; ?>
