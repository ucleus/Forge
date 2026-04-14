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

function forgeShowToast(duration) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), duration || 2200);
}
