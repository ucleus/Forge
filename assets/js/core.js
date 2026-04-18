// ═══════════════════════════════════════════════════
// FORGE — core.js
// Shared utilities used across all builder modules.
// ═══════════════════════════════════════════════════

// ── Clipboard ──────────────────────────────────────

function forgeFallbackCopy(text, cb) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0';
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  try { document.execCommand('copy'); if (cb) cb(); } catch (e) {}
  document.body.removeChild(ta);
}

function forgeCopy(text, cb) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(() => { if (cb) cb(); })
      .catch(() => forgeFallbackCopy(text, cb));
  } else {
    forgeFallbackCopy(text, cb);
  }
}

// ── Toast ──────────────────────────────────────────
// Shows the #toast element. Pass a duration in ms (default 2200).
// For modules with a dynamic toast message, set the text before calling.

function forgeShowToast(duration, message) {
  const t = document.getElementById('toast');
  if (!t) return;
  if (!t.dataset.defaultHtml) t.dataset.defaultHtml = t.innerHTML;
  if (message) {
    const icon = t.querySelector('.t-lime');
    const iconHtml = icon ? `${icon.outerHTML} ` : '';
    t.innerHTML = `${iconHtml}${message}`;
  } else if (t.dataset.defaultHtml) {
    t.innerHTML = t.dataset.defaultHtml;
  }
  t.classList.add('show');
  setTimeout(() => {
    t.classList.remove('show');
    if (t.dataset.defaultHtml) t.innerHTML = t.dataset.defaultHtml;
  }, duration || 2200);
}

function forgeDownloadText(filename, text) {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ── Shared nav action helpers ─────────────────────

function forgeStartNewPrompt(resetFn) {
  if (typeof resetFn === 'function') resetFn();
  forgeShowToast(2200, 'Started a new prompt.');
}

function forgeShowLayoutGrid(sectionListId) {
  const list = document.getElementById(sectionListId || 'sectionList');
  if (list) list.scrollIntoView({ behavior: 'smooth', block: 'start' });
  forgeShowToast(1800, 'Jumped to your section grid.');
}

function forgeOpenSettings(searchInputId) {
  const search = document.getElementById(searchInputId || 'searchInput');
  if (search) search.focus();
  forgeShowToast(2200, 'Focused settings/search controls.');
}
