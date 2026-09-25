/* Wealth Intelligence — app logic
 * Depends on FRAMEWORKS (frameworks.js), loaded first.
 */

const DRAFT_KEY = 'wi-drafts-v1';
let activeId = null;
let builtPrompt = '';

/* ---------- helpers ---------- */

const $ = id => document.getElementById(id);

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function numLabel(fw) {
  // Display sequential numbers (01–09) regardless of internal ids
  return '#' + String(FRAMEWORKS.indexOf(fw) + 1).padStart(2, '0');
}

function loadDrafts() {
  try { return JSON.parse(localStorage.getItem(DRAFT_KEY)) || {}; }
  catch (e) { return {}; }
}

function saveDraft(fwId, key, value) {
  try {
    const drafts = loadDrafts();
    drafts[fwId] = drafts[fwId] || {};
    drafts[fwId][key] = value;
    localStorage.setItem(DRAFT_KEY, JSON.stringify(drafts));
  } catch (e) { /* storage unavailable — drafts just won't persist */ }
}

/* ---------- rendering ---------- */

function render() {
  $('fwGrid').innerHTML = FRAMEWORKS.map(fw => `
    <button type="button" class="fw-card${activeId === fw.id ? ' active' : ''}" data-id="${fw.id}" aria-pressed="${activeId === fw.id}">
      <div class="fw-card-top">
        <span class="fw-num">${numLabel(fw)}</span>
        <span class="fw-icon" aria-hidden="true">${fw.icon}</span>
      </div>
      <div class="fw-title">${escapeHtml(fw.title)}</div>
      <div class="fw-desc">${escapeHtml(fw.desc)}</div>
    </button>
  `).join('');
  $('fwCount').textContent = FRAMEWORKS.length + ' frameworks';
}

function selectFw(id) {
  activeId = id;
  builtPrompt = '';
  const fw = FRAMEWORKS.find(f => f.id === id);
  const drafts = loadDrafts()[id] || {};

  render();

  $('builderPanel').classList.add('visible');
  $('emptyState').hidden = true;
  $('outputPanel').classList.remove('visible');
  $('errorMsg').classList.remove('visible');
  $('builderTitle').textContent = fw.title;
  $('builderId').textContent = numLabel(fw);

  $('fieldsContainer').innerHTML = fw.fields.map(field => {
    const val = escapeHtml(drafts[field.key] || '');
    const ph = escapeHtml(field.placeholder);
    return `
      <div class="field-group">
        <label class="field-label" for="field_${field.key}">${escapeHtml(field.label)}</label>
        ${field.rows > 1
          ? `<textarea id="field_${field.key}" data-key="${field.key}" rows="${field.rows}" placeholder="${ph}">${val}</textarea>`
          : `<input type="text" id="field_${field.key}" data-key="${field.key}" placeholder="${ph}" value="${val}">`}
      </div>`;
  }).join('');

  setTimeout(() => $('builderPanel').scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
}

function buildPrompt() {
  const fw = FRAMEWORKS.find(f => f.id === activeId);
  if (!fw) return;

  const values = {};
  let allFilled = true;
  fw.fields.forEach(field => {
    const el = $('field_' + field.key);
    const val = el ? el.value.trim() : '';
    values[field.key] = val;
    if (!val) allFilled = false;
  });

  if (!allFilled) {
    $('errorMsg').classList.add('visible');
    return;
  }
  $('errorMsg').classList.remove('visible');

  builtPrompt = fw.buildPrompt(values);

  // Highlight the user's own words in the preview
  let displayHtml = escapeHtml(builtPrompt);
  fw.fields.forEach(field => {
    const escaped = escapeHtml(values[field.key]);
    if (escaped) displayHtml = displayHtml.replace(escaped, `<em class="filled">${escaped}</em>`);
  });

  $('promptText').innerHTML = displayHtml;
  $('promptArrows').innerHTML = fw.arrows.map(a => `<div class="prompt-arrow">${escapeHtml(a)}</div>`).join('');
  $('promptTagline').textContent = fw.tagline;

  resetCopyBtn();
  $('outputPanel').classList.add('visible');
  setTimeout(() => $('outputPanel').scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
}

/* ---------- copy / open ---------- */

function fullPromptText() {
  const fw = FRAMEWORKS.find(f => f.id === activeId);
  return builtPrompt + '\n\n' + fw.arrows.map(a => '→ ' + a).join('\n') + '\n\n' + fw.tagline;
}

function resetCopyBtn() {
  const btn = $('copyBtn');
  btn.textContent = 'Copy Prompt';
  btn.classList.remove('copied');
}

function flashCopied() {
  const btn = $('copyBtn');
  btn.textContent = '✓ Copied!';
  btn.classList.add('copied');
  setTimeout(resetCopyBtn, 2200);
}

function copyText(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text).then(flashCopied).catch(() => fallbackCopy(text));
  }
  fallbackCopy(text);
  return Promise.resolve();
}

function fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.setAttribute('readonly', '');
  ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0;';
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy'); flashCopied(); } catch (e) {}
  document.body.removeChild(ta);
}

function copyPrompt() {
  if (builtPrompt) copyText(fullPromptText());
}

function openInClaude() {
  if (!builtPrompt) return;
  const text = fullPromptText();
  // Copy first so the prompt is on the clipboard even if the prefill doesn't carry over
  copyText(text);
  window.open('https://claude.ai/new?q=' + encodeURIComponent(text), '_blank', 'noopener');
}

/* ---------- events ---------- */

$('fwGrid').addEventListener('click', e => {
  const card = e.target.closest('.fw-card');
  if (card) selectFw(Number(card.dataset.id));
});

$('fieldsContainer').addEventListener('input', e => {
  const key = e.target.dataset.key;
  if (key && activeId !== null) saveDraft(activeId, key, e.target.value);
});

$('buildBtn').addEventListener('click', buildPrompt);
$('copyBtn').addEventListener('click', copyPrompt);
$('openBtn').addEventListener('click', openInClaude);

// Ctrl/Cmd + Enter builds the prompt from any field
document.addEventListener('keydown', e => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'Enter' && activeId !== null) buildPrompt();
});

/* ---------- offline / installable ---------- */

if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}

render();
