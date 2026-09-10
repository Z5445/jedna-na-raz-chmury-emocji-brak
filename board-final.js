(() => {
  const works = {
    w01: {
      pl: {
        kicker: 'GRAFIKA 10/14',
        title: 'Grafika 10',
        text: 'Złość niekontrolowana i niehamowana, nagły wybuch ze skrywanych emocji.',
        details: 'Źródło: anonimowy list umieszczony w internecie.',
        technique: 'Technika: grafika cyfrowa, druk na pleksi.'
      },
      en: {
        kicker: 'ARTWORK 10/14',
        title: 'Artwork 10',
        text: 'Uncontrolled, unrestrained anger: a sudden outburst of suppressed emotions.',
        details: 'Source: anonymous letter published online.',
        technique: 'Technique: digital graphic, print on plexiglass.'
      }
    },
    w02: {
      pl: {
        kicker: 'GRAFIKA 13/14',
        title: 'Grafika 13',
        text: 'Piękno świata zewnętrznego pozostaje w cieniu w obliczu wewnętrznej straty.',
        details: 'Źródło: „Norwegian Wood”, Haruki Murakami, tłum. Jay Rubin.',
        technique: 'Technika: mieszana; fotografia, grafika cyfrowa, druk na pleksi.'
      },
      en: {
        kicker: 'ARTWORK 13/14',
        title: 'Artwork 13',
        text: 'The beauty of the external world remains in the shadow of an inner loss.',
        details: 'Source: “Norwegian Wood” by Haruki Murakami, translated by Jay Rubin.',
        technique: 'Technique: mixed media; photography, digital graphic, print on plexiglass.'
      }
    },
    w03: {
      pl: {
        kicker: 'GRAFIKA 5/14',
        title: 'Grafika 5',
        text: 'Próba ucieczki z trudnego stanu emocjonalnego, jednoczesny brak wiary we własną sprawczość.',
        details: 'Odpuścić? Czuję, że muszę się uwolnić.',
        technique: 'Technika: grafika cyfrowa, druk na pleksi.'
      },
      en: {
        kicker: 'ARTWORK 5/14',
        title: 'Artwork 5',
        text: 'An attempt to escape a difficult emotional state, accompanied by a lack of faith in one’s own agency.',
        details: 'Let go? I feel that I have to set myself free.',
        technique: 'Technique: digital graphic, print on plexiglass.'
      }
    },
    w04: {
      pl: {
        kicker: 'GRAFIKA 4/14',
        title: 'Grafika 4',
        text: 'Natrętna myśl zajmuje miejsce wyobraźni, zajmuje cały umysł.',
        details: '',
        technique: 'Technika: mieszana; długopis, marker piórkowy, grafika cyfrowa, druk na pleksi.'
      },
      en: {
        kicker: 'ARTWORK 4/14',
        title: 'Artwork 4',
        text: 'An intrusive thought replaces imagination and takes over the entire mind.',
        details: '',
        technique: 'Technique: mixed media; ballpoint pen, fibre-tip marker, digital graphic, print on plexiglass.'
      }
    },
    w05: {
      pl: {
        kicker: 'GRAFIKA 14/14',
        title: 'Grafika 14',
        text: 'Odnalezienie ukojenia w sztuce. Poczucie uwolnienia z odosobnienia.',
        details: '',
        technique: 'Technika: mieszana; monotypia, marker, grafika cyfrowa, druk na pleksi.'
      },
      en: {
        kicker: 'ARTWORK 14/14',
        title: 'Artwork 14',
        text: 'Finding solace in art. A sense of release from isolation.',
        details: '',
        technique: 'Technique: mixed media; monotype, marker, digital graphic, print on plexiglass.'
      }
    }
  };

  const currentLanguage = () => new URLSearchParams(window.location.search).get('lang') === 'en' ? 'en' : 'pl';

  const setup = () => {
    const logo = document.querySelector('.gallery-header .logo');
    if (logo && !logo.querySelector('.plutchik-icon')) {
      const icon = document.createElement('img');
      icon.className = 'plutchik-icon';
      icon.src = 'assets/plutchik-smutek.png';
      icon.alt = '';
      icon.setAttribute('aria-hidden', 'true');
      logo.prepend(icon);
    }

    const canvas = document.querySelector('#canvas');
    if (!canvas) return;

    canvas.querySelectorAll('.work').forEach((work) => {
      if (!works[work.classList[1]]) work.remove();
    });

    const dialog = document.querySelector('#workModal');
    const title = document.querySelector('#modalTitle');
    const text = document.querySelector('#modalText');
    const details = document.querySelector('#modalDetails');
    const technique = document.querySelector('#modalTechnique');
    const kicker = document.querySelector('#modalKicker');

    dialog?.querySelectorAll('.work-nav, .modal-nav, .prev, .next, [data-direction]').forEach((element) => {
      if (!element.classList.contains('modal-close')) element.remove();
    });

    const present = (work) => {
      const data = works[work.classList[1]]?.[currentLanguage()];
      if (!data) return;

      if (kicker) kicker.textContent = data.kicker;
      if (title) title.textContent = data.title;
      if (text) text.textContent = data.text;
      if (details) {
        details.textContent = data.details;
        details.hidden = !data.details;
      }
      if (technique) technique.textContent = data.technique;
    };

    canvas.querySelectorAll('.work').forEach((work) => {
      work.addEventListener('click', () => window.setTimeout(() => present(work), 0));
    });

    ['pointerdown', 'pointermove', 'mousedown', 'mousemove', 'touchstart', 'touchmove', 'wheel'].forEach((type) => {
      canvas.addEventListener(type, (event) => event.stopImmediatePropagation(), true);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') event.stopImmediatePropagation();
    }, true);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup, { once: true });
  } else {
    setup();
  }
})();
