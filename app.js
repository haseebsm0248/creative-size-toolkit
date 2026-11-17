'use strict';
const PRESETS = [
  ['Instagram portrait',1080,1350], ['Instagram square',1080,1080],
  ['Story / Reel',1080,1920], ['YouTube thumbnail',1280,720],
  ['HD landscape',1920,1080], ['A4 at 300 DPI',2480,3508]
];
const $ = id => document.getElementById(id);
const width = $('width'), height = $('height');
const presetBox = $('presets');
for (const [name,w,h] of PRESETS) {
  const btn = document.createElement('button');
  btn.type = 'button'; btn.textContent = name;
  btn.addEventListener('click', () => { width.value = w; height.value = h; update(); });
  presetBox.append(btn);
}
function update() {
  const w = Number(width.value), h = Number(height.value);
  $('status').textContent = '';
  try {
    const data = SizeMath.calculate(w,h);
    $('error').textContent = '';
    $('ratio').textContent = data.ratio;
    $('orientation').textContent = data.orientation;
    $('pixels').textContent = data.pixels.toLocaleString('en-US');
    $('preview-label').textContent = `${w} × ${h}`;
    const scale = Math.min(310/w,225/h);
    $('preview').style.width = `${w*scale}px`;
    $('preview').style.height = `${h*scale}px`;
    $('copy').disabled = false;
  } catch (error) {
    $('error').textContent = error.message;
    $('ratio').textContent = $('orientation').textContent = $('pixels').textContent = '—';
    $('preview-label').textContent = 'Invalid dimensions';
    $('copy').disabled = true;
  }
}
width.addEventListener('input',update);
height.addEventListener('input',update);
$('swap').addEventListener('click', () => { const tmp=width.value;width.value=height.value;height.value=tmp;update(); });
$('copy').addEventListener('click', async () => {
  const text = `${width.value} × ${height.value} px`;
  try { await navigator.clipboard.writeText(text); $('status').textContent='Copied: '+text; }
  catch { $('status').textContent='Copy unavailable. Select and copy: '+text; }
});
update();
