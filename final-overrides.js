(() => {
  const workMeta = {
    w01: {
      pl: {
        title: 'Grafika 10',
        kicker: 'GRAFIKA 10 / 14',
        text: 'Złość niekontrolowana i niehamowana, nagły wybuch ze skrywanych emocji.',
        details: 'Źródło: anonimowy list umieszczony w internecie.',
        technique: 'Technika: grafika cyfrowa, druk na pleksi.'
      },
      en: {
        title: 'Artwork 10',
        kicker: 'ARTWORK 10 / 14',
        text: 'Uncontrolled, unrestrained anger: a sudden outburst of suppressed emotions.',
        details: 'Source: an anonymous letter published online.',
        technique: 'Technique: digital graphics, print on plexiglass.'
      }
    },
    w02: {
      pl: {
        title: 'Grafika 13',
        kicker: 'GRAFIKA 13 / 14',
        text: 'Piękno świata zewnętrznego pozostaje w cieniu w obliczu wewnętrznej straty.',
        details: 'Źródło: książka „Norwegian Wood”, Haruki Murakami, tłum. Jay Rubin.',
        technique: 'Technika: mieszana; fotografia, grafika cyfrowa, druk na pleksi.'
      },
      en: {
        title: 'Artwork 13',
        kicker: 'ARTWORK 13 / 14',
        text: 'The beauty of the outside world remains in shadow in the face of inner loss.',
        details: 'Source: Haruki Murakami, Norwegian Wood, translated by Jay Rubin.',
        technique: 'Technique: mixed media; photography, digital graphics, print on plexiglass.'
      }
    },
    w03: {
      pl: {
        title: 'Grafika 5',
        kicker: 'GRAFIKA 5 / 14',
        text: 'Próba ucieczki z trudnego stanu emocjonalnego, jednoczesny brak wiary we własną sprawczość.',
        details: 'Odpuścić? Czuję, że muszę się uwolnić.',
        technique: 'Technika: grafika cyfrowa, druk na pleksi.'
      },
      en: {
        title: 'Artwork 5',
        kicker: 'ARTWORK 5 / 14',
        text: 'An attempt to escape a difficult emotional state, alongside a lack of faith in one’s own agency.',
        details: 'Let go? I feel that I need to free myself.',
        technique: 'Technique: digital graphics, print on plexiglass.'
      }
    },
    w04: {
      pl: {
        title: 'Grafika 4',
        kicker: 'GRAFIKA 4 / 14',
        text: 'Natrętna myśl zajmuje miejsce wyobraźni, zajmuje cały umysł.',
        details: '',
        technique: 'Technika: mieszana; długopis, marker piórkowy, grafika cyfrowa, druk na pleksi.'
      },
      en: {
        title: 'Artwork 4',
        kicker: 'ARTWORK 4 / 14',
        text: 'An intrusive thought takes the place of imagination and occupies the entire mind.',
        details: '',
        technique: 'Technique: mixed media; ballpoint pen, fountain marker, digital graphics, print on plexiglass.'
      }
    },
    w05: {
      pl: {
        title: 'Grafika 14',
        kicker: 'GRAFIKA 14 / 14',
        text: 'Odnalezienie ukojenia w sztuce. Poczucie uwolnienia z odosobnienia.',
        details: '',
        technique: 'Technika: mieszana; monotypia, marker, grafika cyfrowa, druk na pleksi.'
      },
      en: {
        title: 'Artwork 14',
        kicker: 'ARTWORK 14 / 14',
        text: 'Finding solace in art. A sense of release from isolation.',
        details: '',
        technique: 'Technique: mixed media; monotype, marker, digital graphics, print on plexiglass.'
      }
    }
  };

  const currentLanguage = () =>
    new URLSearchParams(window.location.search).get('lang') === 'en' ? 'en' : 'pl';

  const keyForWork = (work) =>
    Object.keys(workMeta).find((key) => work.classList.contains(key));

  const setText = (selector, value) => {
    const element = document.querySelector(selector);
    if (!element) return;
    element.textContent = value;
    element.hidden = !value;
  };

  const addHeaderIcon = () => {
    const logo = document.querySelector('.gallery-header .logo, header .logo');
    if (!logo || logo.querySelector('.plutchik-icon')) return;

    const icon = document.createElement('img');
    icon.className = 'plutchik-icon';
    icon.src = 'assets/plutchik-smutek.png';
    icon.alt = '';
    icon.setAttribute('aria-hidden', 'true');
    logo.prepend(icon);
  };

  const removeModalNavigation = () => {
    const dialog = document.querySelector('#workModal');
    if (!dialog) return;

    dialog.querySelectorAll(
      '.modal-nav, .modal-pagination, .slider-controls, [data-direction], [data-slide]'
    ).forEach((element) => element.remove());

    dialog.querySelectorAll('button, a').forEach((element) => {
      const label = element.textContent.trim();
      if (/^[‹›←→]+$/.test(label) || /^(previous|next|poprzednia|następna)$/i.test(label)) {
        element.remove();
      }
    });

    dialog.querySelectorAll('*').forEach((element) => {
      if (element.children.length === 0 && /^[‹›←→●·.\s]+$/.test(element.textContent)) {
        element.remove();
      }
    });
  };

  const setModal = (key) => {
    const data = workMeta[key]?.[currentLanguage()];
    if (!data) return;

    setText('#modalTitle', data.title);
    setText('#modalText', data.text);
    setText('#modalDetails', data.details);
    setText('#modalTechnique', data.technique);

    const dialog = document.querySelector('#workModal');
    if (!dialog) return;
    dialog.dataset.work = key;

    const kicker = [...dialog.querySelectorAll('small, span, p, div')].find((element) =>
      element.children.length === 0 &&
      /^(GRAFIKA|ARTWORK)\s+\d+\s*\/\s*\d+/i.test(element.textContent.trim())
    );
    if (kicker) kicker.textContent = data.kicker;
  };

  const setUpBoard = () => {
    const canvas = document.querySelector('#canvas');
    if (!canvas) return;

    canvas.querySelectorAll('.work').forEach((work) => {
      const key = keyForWork(work);
      if (!key) {
        work.remove();
        return;
      }
      work.setAttribute('aria-label', workMeta[key][currentLanguage()].title);
    });

    canvas.addEventListener('wheel', (event) => event.preventDefault(), { passive: false });
    canvas.addEventListener('dragstart', (event) => event.preventDefault(), true);

    canvas.addEventListener('click', (event) => {
      const work = event.target.closest('.work');
      if (!work) return;
      const key = keyForWork(work);
      if (!key) return;
      window.setTimeout(() => setModal(key), 0);
    }, true);
  };

  const initialise = () => {
    addHeaderIcon();
    removeModalNavigation();
    setUpBoard();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialise, { once: true });
  } else {
    initialise();
  }
})();
