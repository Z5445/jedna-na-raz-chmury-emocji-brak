const viewport = document.querySelector('#viewport');
const canvas = document.querySelector('#canvas');
const modal = document.querySelector('#workModal');
const image = document.querySelector('#modalImage');
let position = { x: -1180, y: -240 };
let dragStart = null;
let dragging = false;
let activeWork = 1;

if (window.innerWidth <= 700) {
  position = { x: -1300, y: -390 };
}

const visibleWorkNumbers = [1, 2, 3, 4, 5, 12, 13, 14, 15, 16, 17, 18];
const works = visibleWorkNumbers.map(number => ({
  number,
  image: `public/assets/works/${String(number).padStart(2, '0')}.png`,
  title: String(number).padStart(2, '0')
}));

function renderCanvas() {
  canvas.style.transform = `translate(${position.x}px, ${position.y}px)`;
}

renderCanvas();

viewport.addEventListener('pointerdown', event => {
  if (event.target.closest('.work')) return;
  dragStart = { x: event.clientX - position.x, y: event.clientY - position.y, moved: false };
  viewport.setPointerCapture(event.pointerId);
});
viewport.addEventListener('pointermove', event => {
  if (!dragStart) return;
  const nextX = event.clientX - dragStart.x;
  const nextY = event.clientY - dragStart.y;
  if (Math.abs(nextX - position.x) > 4 || Math.abs(nextY - position.y) > 4) dragStart.moved = true;
  position = { x: nextX, y: nextY };
  dragging = dragStart.moved;
  viewport.classList.toggle('dragging', dragging);
  renderCanvas();
});
viewport.addEventListener('pointerup', () => {
  window.setTimeout(() => { dragging = false; viewport.classList.remove('dragging'); }, 0);
  dragStart = null;
});
viewport.addEventListener('wheel', event => {
  event.preventDefault();
  position.x -= event.deltaX;
  position.y -= event.deltaY;
  renderCanvas();
}, { passive: false });

function openWork(number) {
  const work = works.find(item => item.number === number);
  if (!work) return;
  activeWork = work.number;
  const english = window.getCurrentLanguage?.() === 'en';
  const label = english ? 'Artwork' : 'Grafika';
  image.src = work.image;
  image.alt = `${label} ${work.title}`;
  document.querySelector('#modalNumber').textContent = `${label.toLowerCase()} ${work.title} / ${works.length}`;
  document.querySelector('#modalTitle').textContent = `${label} ${work.title}`;
  document.querySelector('#modalText').textContent = english ? 'The description, context, and translation of the text will appear here.' : 'Opis pracy, jej kontekst oraz tłumaczenie tekstu znajdą się w tym miejscu.';
  document.querySelector('#modalDetails').textContent = english ? 'Source and detailed information to be added.' : 'Źródło i szczegółowe informacje do uzupełnienia.';
  document.querySelector('#modalTechnique').textContent = english ? 'Technique: digital graphics, print, acrylic paint / mixed media.' : 'Technika: grafika cyfrowa, druk, farba akrylowa / technika mieszana.';
  document.querySelector('#pageDots').textContent = works.map((_, i) => i + 1 === number ? '●' : '·').join('');
  if (!modal.open) modal.showModal();
}

document.querySelectorAll('.work').forEach(button => button.addEventListener('click', event => {
  event.stopPropagation();
  openWork(Number(button.dataset.work));
}));
document.querySelector('.modal-close').addEventListener('click', () => modal.close());
document.querySelector('#previousWork').addEventListener('click', () => {
  const currentIndex = works.findIndex(work => work.number === activeWork);
  openWork(works[(currentIndex - 1 + works.length) % works.length].number);
});
document.querySelector('#nextWork').addEventListener('click', () => {
  const currentIndex = works.findIndex(work => work.number === activeWork);
  openWork(works[(currentIndex + 1) % works.length].number);
});
modal.addEventListener('click', event => { if (event.target === modal) modal.close(); });
window.addEventListener('languagechange', () => { if (modal.open) openWork(activeWork); });
