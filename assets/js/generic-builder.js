// ══════════════════════════════════════════════════
// GENERIC PROMPT BUILDER
// Used by new Dall-e, Nano Banana, and Characters pages.
// ══════════════════════════════════════════════════

function buildPrompt() {
  const fields = [...document.querySelectorAll('.prompt-field')];
  const sections = new Map();

  fields.forEach((field) => {
    const label = field.dataset.promptLabel || field.name || 'Field';
    const group = field.dataset.promptGroup || 'content';
    const value = field.value.trim();
    if (!value) return;
    if (!sections.has(group)) {
      sections.set(group, []);
    }
    sections.get(group).push(`${label}: ${value}`);
  });

  const output = [...sections.values()].map((items) => items.join(' | ')).join('\n');
  const outputBox = document.getElementById('promptOutput');
  if (!output || !output.trim()) {
    outputBox.innerHTML = '<span class="prompt-placeholder">Fill in the sections — your prompt builds here in real time…</span>';
    outputBox.classList.remove('has-content');
  } else {
    outputBox.textContent = output;
    outputBox.classList.add('has-content');
  }

  const wordCount = output.trim().split(/\s+/).filter(Boolean).length;
  const statWords = document.getElementById('stat-words');
  if (statWords) {
    statWords.textContent = `${wordCount} words`;
  }

  updateStatCards(sections);
}

function updateStatCards(sections) {
  const statusMap = {
    stat-subject: 'subject',
    stat-style: 'style',
    stat-format: 'format',
    stat-concept: 'core',
    stat-texture: 'details',
    stat-tone: 'mood',
    stat-identity: 'identity',
    stat-appearance: 'appearance',
    stat-personality: 'personality'
  };

  Object.entries(statusMap).forEach(([elementId, group]) => {
    const el = document.getElementById(elementId);
    if (!el) return;
    const values = sections.get(group) || [];
    const text = values.length
      ? values.map(v => v.split(':').slice(1).join(':').trim()).filter(Boolean).join(', ')
      : '—';
    el.textContent = text || '—';
  });

  const badge = document.getElementById('stat-badge');
  if (badge) {
    const ready = [...sections.values()].some(items => items.length > 0);
    badge.textContent = ready ? 'Ready' : 'Draft';
    badge.style.background = ready ? 'var(--lime)' : '';
    badge.style.color = ready ? '#111' : '';
  }
}

function copyPrompt() {
  const box = document.getElementById('promptOutput');
  const text = box.textContent.trim();
  if (!text || text.includes('Fill in the sections')) {
    forgeShowToast(2200, 'Build the prompt first before copying.');
    return;
  }
  forgeCopy(text, () => forgeShowToast(2200, 'Copied to clipboard!'));
}

function resetAll() {
  const fields = [...document.querySelectorAll('.prompt-field')];
  fields.forEach((field) => {
    if (field.tagName === 'SELECT') {
      field.selectedIndex = 0;
    } else {
      field.value = '';
    }
  });
  buildPrompt();
}

function forgeExportPromptText(filenamePrefix) {
  const box = document.getElementById('promptOutput');
  const text = box.textContent.trim();
  if (!text || text.includes('Fill in the sections')) {
    forgeShowToast(2200, 'Build the prompt first before exporting.');
    return;
  }
  const date = new Date().toISOString().slice(0, 10);
  forgeDownloadText(`${filenamePrefix || 'forge-prompt'}-${date}.txt`, text);
  forgeShowToast(2200, 'Prompt exported as .txt');
}

window.addEventListener('DOMContentLoaded', () => {
  const fields = document.querySelectorAll('.prompt-field');
  fields.forEach((field) => {
    field.addEventListener(field.tagName === 'SELECT' ? 'change' : 'input', buildPrompt);
  });
  buildPrompt();
});
