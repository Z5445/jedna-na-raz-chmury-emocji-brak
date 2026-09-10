(() => {
  const ready = (fn) => document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', fn, { once: true })
    : fn();

  ready(() => {
    const language = new URLSearchParams(window.location.search).get('lang') === 'en' ? 'en' : 'pl';
    const works = {
      w01: {
        pl: { label: 'Grafika 10/14', title: 'Grafika 10', description: 'Złość niekontrolowana i niehamowana, nagły wybuch ze skrywanych emocji.', source: 'Źródło: anonimowy list umieszczony w internecie', technique: 'Technika: grafika cyfrowa, druk na pleksi.' },
        en: { label: 'Work 10/14', title: 'Work 10', description: 'Uncontrolled, unrestrained anger — a sudden outburst of concealed emotions.', source: 'Source: anonymous letter published online.', technique: 'Technique: digital graphics, print on plexiglass.' }
      },
      w02: {
        pl: { label: 'Grafika 13/14', title: 'Grafika 13', description: 'Piękno świata zewnętrznego pozostaje w cieniu w obliczu wewnętrznej straty.', source: 'Źródło: książka „Norwegian Wood”, Haruki Murakami, tłum. Jay Rubin', technique: 'Technika: mieszana; fotografia, grafika cyfrowa, druk na pleksi.' },
        en: { label: 'Work 13/14', title: 'Work 13', description: 'The beauty of the outside world remains in shadow in the face of inner loss.', source: 'Source: Haruki Murakami, Norwegian Wood, trans. Jay Rubin.', technique: 'Technique: mixed media; photography, digital graphics, print on plexiglass.' }
      },
      w03: {
        pl: { label: 'Grafika 5/14', title: 'Grafika 5', description: 'Próba ucieczki z trudnego stanu emocjonalnego, jednoczesny brak wiary we własną sprawczość.', source: '„Odpuścić? Czuję, że muszę się uwolnić”', technique: 'Technika: grafika cyfrowa, druk na pleksi.' },
        en: { label: 'Work 5/14', title: 'Work 5', description: 'An attempt to escape a difficult emotional state, accompanied by a lack of faith in one’s own agency.', source: '“Let go? I feel that I have to free myself.”', technique: 'Technique: digital graphics, print on plexiglass.' }
      },
      w04: {
        pl: { label: 'Grafika 4/14', title: 'Grafika 4', description: 'Natrętna myśl zajmuje miejsce wyobraźni, zajmuje cały umysł.', source: '', technique: 'Technika: mieszana; długopis, marker piórkowy, grafika cyfrowa, druk na pleksi.' },
        en: { label: 'Work 4/14', title: 'Work 4', description: 'An intrusive thought takes the place of imagination; it occupies the whole mind.', source: '', technique: 'Technique: mixed media; ballpoint pen, fountain marker, digital graphics, print on plexiglass.' }
      },
      w05: {
        pl: { label: 'Grafika 14/14', title: 'Grafika 14', description: 'Odnalezienie ukojenia w sztuce. Poczucie uwolnienia z odosobnienia.', source: '', technique: 'Technika: mieszana; monotypia, marker, grafika cyfrowa, druk na pleksi.' },
        en: { label: 'Work 14/14', title: 'Work 14', description: 'Finding solace in art. A sense of release from isolation.', source: '', technique: 'Technique: mixed media; monotype, marker, digital graphics, print on plexiglass.' }
      }
    };

    const canvas = document.getElementById('canvas');
    if (!canvas) return;
    canvas.classList.add('static-five-board');

    const logo = document.querySelector('.gallery-header .logo');
    if (logo && !logo.querySelector('.plutchik-logo-icon')) {
      const label = document.createElement('span');
      label.className = 'plutchik-logo-label';
      const icon = document.createElement('img');
      icon.className = 'plutchik-logo-icon';
      icon.src = 'assets/plutchik-smutek.png';
      icon.alt = '';
      icon.setAttribute('aria-hidden', 'true');
      Array.from(logo.childNodes).forEach((node) => label.appendChild(node));
      logo.replaceChildren(icon, label);
    }

    const dialog = document.createElement('dialog');
    dialog.id = 'staticWorkModal';
    dialog.innerHTML = `
      <div class="static-modal-shell">
        <button class="static-modal-close" type="button" aria-label="Close">×</button>
        <div class="static-modal-art"><img alt=""></div>
        <div class="static-modal-info">
          <p class="static-modal-kicker"></p>
          <h1 class="static-modal-title"></h1>
          <p class="static-modal-description"></p>
          <p class="static-modal-source"></p>
          <p class="static-modal-technique"></p>
        </div>
      </div>`;
    document.body.appendChild(dialog);

    const modalImage = dialog.querySelector('.static-modal-art img');
    const modalKicker = dialog.querySelector('.static-modal-kicker');
    const modalTitle = dialog.querySelector('.static-modal-title');
    const modalDescription = dialog.querySelector('.static-modal-description');
    const modalSource = dialog.querySelector('.static-modal-source');
    const modalTechnique = dialog.querySelector('.static-modal-technique');
    const close = () => dialog.close();

    dialog.querySelector('.static-modal-close').addEventListener('click', close);
    dialog.addEventListener('click', (event) => { if (event.target === dialog) close(); });

    document.addEventListener('keydown', (event) => {
      if (!dialog.open) return;
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    }, true);

    const keyFor = (button) => Array.from(button.classList).find((name) => Object.hasOwn(works, name));
    document.addEventListener('click', (event) => {
      const button = event.target.closest('#canvas .work');
      if (!button) return;
      const key = keyFor(button);
      if (!key) return;
      const item = works[key][language];
      const original = button.querySelector('img');
      event.preventDefault();
      event.stopImmediatePropagation();
      modalImage.src = original.currentSrc || original.src;
      modalImage.alt = original.alt || item.title;
      modalKicker.textContent = item.label;
      modalTitle.textContent = item.title;
      modalDescription.textContent = item.description;
      modalSource.textContent = item.source;
      modalSource.hidden = !item.source;
      modalTechnique.textContent = item.technique;
      dialog.showModal();
    }, true);
  });
})();
