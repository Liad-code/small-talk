/**
 * Builds a local QA page for auditing every generated pronunciation.
 *
 * Rationale: the goal is that EVERY word is pronounced correctly, and no
 * automated check can judge that — only a human ear can. Spot-checking 890
 * strings is not verification, so this produces a page that makes a full pass
 * practical: keyboard-driven playback, and a flag list you can hand back so
 * each bad word gets a pronunciation override.
 *
 * Run:  node scripts/build-review-page.mjs
 * Then: npm run dev  ->  http://localhost:3000/audio-review.html
 */

import { readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
const MANIFEST = path.join(ROOT, 'scripts', 'audio-manifest.json')
const OUT = path.join(ROOT, 'public', 'audio-review.html')

/** Groups entries by the data file they came from, so review has structure. */
function groupOf(entry) {
  if (entry.variant === 'sound') return 'Letters — name + short sound'
  if (entry.sources.some(s => s.startsWith('alphabet'))) return 'Letters — names'
  const m = entry.sources[0].match(/src\/(?:data|app|components)\/([^/]+(?:\/[^/]+)?)/)
  return m ? m[1] : 'other'
}

async function main() {
  const { entries } = JSON.parse(await readFile(MANIFEST, 'utf8'))

  const withState = entries.map(e => ({
    key: e.key,
    request: e.request,
    speak: e.speak,
    group: groupOf(e),
    exists: existsSync(path.join(ROOT, 'public', 'audio', `${e.key}.mp3`)),
  }))

  const groups = [...new Set(withState.map(e => e.group))].sort()
  const missing = withState.filter(e => !e.exists).length

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Pronunciation review — ${withState.length} items</title>
<style>
  :root { --bg:#fbfbfd; --fg:#16161a; --muted:#6b6b76; --line:#e3e3ea; --ok:#0f8a4a; --bad:#c62828; --accent:#2b5fd9; }
  * { box-sizing:border-box }
  body { margin:0; font:15px/1.5 system-ui,-apple-system,Segoe UI,sans-serif; background:var(--bg); color:var(--fg) }
  header { position:sticky; top:0; background:var(--bg); border-bottom:1px solid var(--line); padding:14px 20px; z-index:5 }
  h1 { margin:0 0 6px; font-size:17px }
  .meta { color:var(--muted); font-size:13px }
  .bar { display:flex; gap:8px; flex-wrap:wrap; margin-top:10px; align-items:center }
  input[type=search], select { padding:7px 10px; border:1px solid var(--line); border-radius:7px; font-size:14px; background:#fff }
  button { padding:7px 12px; border:1px solid var(--line); border-radius:7px; background:#fff; cursor:pointer; font-size:14px }
  button.primary { background:var(--accent); color:#fff; border-color:var(--accent) }
  main { padding:16px 20px 120px }
  h2 { font-size:13px; text-transform:uppercase; letter-spacing:.06em; color:var(--muted); margin:26px 0 8px }
  table { width:100%; border-collapse:collapse; background:#fff; border:1px solid var(--line); border-radius:9px; overflow:hidden }
  td { padding:7px 10px; border-top:1px solid var(--line); vertical-align:middle }
  tr:first-child td { border-top:none }
  tr.flagged { background:#fff5f5 }
  tr.playing { background:#eef3ff }
  .req { font-weight:600 }
  .say { color:var(--muted); font-size:13px; font-family:ui-monospace,monospace }
  .gone { color:var(--bad); font-size:12px }
  .play { width:34px; height:34px; border-radius:50%; padding:0; font-size:13px }
  .flag { font-size:13px; white-space:nowrap }
  footer { position:fixed; bottom:0; left:0; right:0; background:#fff; border-top:1px solid var(--line); padding:10px 20px; display:flex; gap:10px; align-items:center; font-size:14px }
  #out { width:100%; height:120px; margin-top:8px; font-family:ui-monospace,monospace; font-size:12px; display:none; padding:8px }
  kbd { background:#eee; border:1px solid var(--line); border-radius:4px; padding:1px 5px; font-size:12px }
</style>
</head>
<body>
<header>
  <h1>Pronunciation review — Matilda</h1>
  <div class="meta">
    ${withState.length} strings${missing ? ` &middot; <span style="color:var(--bad)">${missing} not yet generated</span>` : ''}
    &middot; <kbd>J</kbd> play next &middot; <kbd>K</kbd> previous &middot; <kbd>R</kbd> replay &middot; <kbd>X</kbd> flag as wrong
  </div>
  <div class="bar">
    <input type="search" id="q" placeholder="filter words…">
    <select id="g"><option value="">all groups</option>${groups.map(g => `<option>${g}</option>`).join('')}</select>
    <button id="only">show flagged only</button>
    <button class="primary" id="copy">copy flagged list</button>
    <span class="meta" id="count"></span>
  </div>
  <div id="stale" style="display:none; margin-top:8px; padding:8px 10px; border-radius:7px; background:#fff8e6; border:1px solid #f0d9a0; font-size:13px"></div>
  <textarea id="out" readonly></textarea>
</header>
<main id="main"></main>
<footer>
  <span class="meta">Flag anything that sounds wrong, then hand the copied list back so each gets a pronunciation override.</span>
</footer>
<script>
const DATA = ${JSON.stringify(withState)};

// Flags persist in localStorage, but strings get REMOVED from the manifest when
// they turn out not to need audio. Their rows then stop rendering, so they can
// never be unticked — yet they used to be exported anyway, making fixed work
// look broken. Prune anything no longer generated, and say so.
const valid = new Set(DATA.map(e => e.request));
const rawFlags = JSON.parse(localStorage.getItem('pron-flagged') || '[]');
const staleFlags = rawFlags.filter(r => !valid.has(r));
const flagged = new Set(rawFlags.filter(r => valid.has(r)));

const audio = new Audio();
let order = [], cursor = -1;

function save() { localStorage.setItem('pron-flagged', JSON.stringify([...flagged])) }
if (staleFlags.length) save();

function render() {
  const q = document.getElementById('q').value.trim().toLowerCase();
  const g = document.getElementById('g').value;
  const onlyFlagged = document.getElementById('only').dataset.on === '1';
  const rows = DATA.filter(e =>
    (!q || e.request.toLowerCase().includes(q)) &&
    (!g || e.group === g) &&
    (!onlyFlagged || flagged.has(e.request)));
  order = rows;
  const byGroup = {};
  for (const e of rows) (byGroup[e.group] ??= []).push(e);
  document.getElementById('main').innerHTML = Object.entries(byGroup).map(([group, items]) => \`
    <h2>\${group} — \${items.length}</h2>
    <table>\${items.map(e => \`
      <tr id="r-\${e.key}" class="\${flagged.has(e.request) ? 'flagged' : ''}">
        <td style="width:44px"><button class="play" data-key="\${e.key}" \${e.exists ? '' : 'disabled'}>▶</button></td>
        <td class="req">\${escapeHtml(e.request)}</td>
        <td class="say">\${escapeHtml(e.speak)}\${e.exists ? '' : ' <span class="gone">no file</span>'}</td>
        <td style="width:150px"><label class="flag"><input type="checkbox" data-req="\${escapeHtml(e.request)}" \${flagged.has(e.request) ? 'checked' : ''}> sounds wrong</label></td>
      </tr>\`).join('')}</table>\`).join('');
  document.getElementById('count').textContent = rows.length + ' shown · ' + flagged.size + ' flagged';
}

function escapeHtml(s) { return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])) }

function playAt(i) {
  if (i < 0 || i >= order.length) return;
  cursor = i;
  const e = order[i];
  document.querySelectorAll('tr.playing').forEach(r => r.classList.remove('playing'));
  const row = document.getElementById('r-' + e.key);
  if (row) { row.classList.add('playing'); row.scrollIntoView({ block:'center', behavior:'smooth' }) }
  if (!e.exists) return;
  audio.src = '/audio/' + e.key + '.mp3';
  audio.play().catch(()=>{});
}

document.addEventListener('click', ev => {
  const play = ev.target.closest('.play');
  if (play) return playAt(order.findIndex(e => e.key === play.dataset.key));
  if (ev.target.id === 'only') { const b = ev.target; b.dataset.on = b.dataset.on === '1' ? '' : '1'; b.textContent = b.dataset.on ? 'show all' : 'show flagged only'; render() }
  if (ev.target.id === 'copy') {
    const out = document.getElementById('out');
    out.style.display = 'block';
    // Export ONLY strings still in the manifest — never stale flags.
    out.value = JSON.stringify([...flagged].filter(r => valid.has(r)), null, 2);
    out.select(); navigator.clipboard?.writeText(out.value);
  }
});

document.addEventListener('change', ev => {
  const cb = ev.target.closest('input[type=checkbox]');
  if (!cb) return;
  const req = cb.dataset.req;
  cb.checked ? flagged.add(req) : flagged.delete(req);
  document.getElementById('r-' + order.find(e => e.request === req)?.key)?.classList.toggle('flagged', cb.checked);
  save(); document.getElementById('count').textContent = order.length + ' shown · ' + flagged.size + ' flagged';
});

document.getElementById('q').addEventListener('input', render);
document.getElementById('g').addEventListener('change', render);

document.addEventListener('keydown', ev => {
  if (ev.target.matches('input,select,textarea')) return;
  const k = ev.key.toLowerCase();
  if (k === 'j') { ev.preventDefault(); playAt(cursor + 1) }
  if (k === 'k') { ev.preventDefault(); playAt(cursor - 1) }
  if (k === 'r') { ev.preventDefault(); playAt(cursor) }
  if (k === 'x' && cursor >= 0) {
    ev.preventDefault();
    const e = order[cursor];
    flagged.has(e.request) ? flagged.delete(e.request) : flagged.add(e.request);
    save(); render();
  }
});

if (staleFlags.length) {
  const el = document.getElementById('stale');
  el.style.display = 'block';
  el.innerHTML = '<b>' + staleFlags.length + ' old flag(s) cleared.</b> These strings are no longer '
    + 'generated (excluded as not-spoken), so they were removed from your list: '
    + '<code>' + staleFlags.map(escapeHtml).join(', ') + '</code>';
}

render();
</script>
</body>
</html>`

  await writeFile(OUT, html)
  console.log(`review page  ${path.relative(ROOT, OUT)}`)
  console.log(`items        ${withState.length} (${missing} without audio yet)`)
  console.log(`open         http://localhost:3000/audio-review.html  (npm run dev)`)
}

main().catch(err => { console.error(err); process.exit(1) })
