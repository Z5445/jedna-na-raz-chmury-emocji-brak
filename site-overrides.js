(() => {
  const language = () => new URLSearchParams(window.location.search).get('lang') === 'en' ? 'en' : 'pl';

  const addLogoIcon = () => {
    document.querySelectorAll('header .logo').forEach((logo) => {
      if (logo.querySelector('.logo-icon')) return;

      const icon = document.createElement('img');
      icon.className = 'logo-icon';
      icon.src = 'assets/plutchik-smutek.png';
      icon.alt = '';
      icon.setAttribute('aria-hidden', 'true');
      logo.prepend(icon);
    });
  };

  const addStyles = () => {
    if (document.querySelector('#final-gallery-overrides')) return;

    const style = document.createElement('style');
    style.id = 'final-gallery-overrides';
    style.textContent = `
      header .logo {
        display: grid !important;
        grid-template-columns: 3rem auto !important;
        grid-template-rows: auto auto !important;
        align-items: center !important;
        column-gap: .45rem !important;
        row-gap: 0 !important;
      }
      header .logo::before { content: none !important; display: none !important; }
      header .logo .logo-icon {
        display: block !important;
        grid-column: 1 !important;
        grid-row: 1 / span 2 !important;
        width: 3rem !important;
        height: 3rem !important;
        max-width: none !important;
        object-fit: contain !important;
        opacity: 1 !important;
        filter: contrast(1.2) saturate(1.15) !important;
      }
      header .logo > span { grid-column: 2 !important; grid-row: 1 !important; }
      header .logo > em { grid-column: 2 !important; grid-row: 2 !important; }

      .gallery-page #canvas { overflow: hidden !important; }
      .gallery-page #canvas .work {
        height: auto !important;
        aspect-ratio: auto !important;
        max-height: none !important;
      }
      .gallery-page #canvas .work img {
        display: block !important;
        width: 100% !important;
        height: auto !important;
        max-width: none !important;
        max-height: none !important;
        aspect-ratio: auto !important;
        object-fit: contain !important;
      }
      .gallery-page #canvas .work.w01 { left: 6% !important; top: 15% !important; width: clamp(84px, 11vw, 170px) !important; }
      .gallery-page #canvas .work.w02 { left: 25% !important; top: 42% !important; width: clamp(96px, 13vw, 205px) !important; }
      .gallery-page #canvas .work.w03 { left: 47% !important; top: 17% !important; width: clamp(75px, 9.5vw, 150px) !important; }
      .gallery-page #canvas .work.w04 { left: 67% !important; top: 39% !important; width: clamp(86px, 11vw, 170px) !important; }
      .gallery-page #canvas .work.w05 { left: 84% !important; top: 13% !important; width: clamp(78px, 10vw, 155px) !important; }

      #workModal .modal-prev, #workModal .modal-next, #workModal .modal-nav,
      #workModal .modal-dots, #workModal .modal-pagination { display: none !important; }
      @media (max-width: 680px) {
        header .logo { grid-template-columns: 2.35rem auto !important; }
        header .logo .logo-icon { width: 2.35rem !important; height: 2.35rem !important; }
        .gallery-page #canvas .work.w01 { width: 16vw !important; }
        .gallery-page #canvas .work.w02 { width: 18vw !important; }
        .gallery-page #canvas .work.w03 { width: 14vw !important; }
        .gallery-page #canvas .work.w04 { width: 16vw !important; }
        .gallery-page #canvas .work.w05 { width: 15vw !important; }
      }
    `;
    document.head.append(style);
  };

  const works = [
    {
      number: '10',
      pl: {
        title: 'Grafika 10',
        label: 'GRAFIKA 10 / 14',
        text: 'Złość niekontrolowana i niehamowana, nagły wybuch ze skrywanych emocji.',
        technique: 'Technika: grafika cyfrowa, druk na pleksi.'
      },
      en: {
        title: 'Graphic 10',
        label: 'GRAPHIC 10 / 14',
        text: 'Uncontrolled, uninhibited anger: a sudden outburst of concealed emotions.',
        technique: 'Technique: digital graphic, print on plexiglass.'
      }
    },
    {
      number: '13',
      pl: {
        title: 'Grafika 13',
        label: 'GRAFIKA 13 / 14',
        text: 'Piękno świata zewnętrznego pozostaje w cieniu w obliczu wewnętrznej straty.',
        technique: 'Technika: mieszana; fotografia, grafika cyfrowa, druk na pleksi.'
      },
      en: {
        title: 'Graphic 13',
        label: 'GRAPHIC 13 / 14',
        text: 'The beauty of the external world remains in shadow in the face of inner loss.',
        technique: 'Technique: mixed media; photography, digital graphic, print on plexiglass.'
      }
    },
    {
      number: '5',
      pl: {
        title: 'Grafika 5',
        label: 'GRAFIKA 5 / 14',
        text: 'Próba ucieczki z trudnego stanu emocjonalnego, jednoczesny brak wiary we własną sprawczość.',
        technique: 'Technika: grafika cyfrowa, druk na pleksi.'
      },
      en: {
        title: 'Graphic 5',
        label: 'GRAPHIC 5 / 14',
        text: 'An attempt to escape a difficult emotional state, accompanied by a lack of faith in one’s own agency.',
        technique: 'Technique: digital graphic, print on plexiglass.'
      }
    },
    {
      number: '4',
      pl: {
        title: 'Grafika 4',
        label: 'GRAFIKA 4 / 14',
        text: 'Natrętna myśl zajmuje miejsce wyobraźni, zajmuje cały umysł.',
        technique: 'Technika: mieszana; długopis, marker piórkowy, grafika cyfrowa, druk na pleksi.'
      },
      en: {
        title: 'Graphic 4',
        label: 'GRAPHIC 4 / 14',
        text: 'An intrusive thought takes the place of imagination and occupies the entire mind.',
        technique: 'Technique: mixed media; ballpoint pen, paint marker, digital graphic, print on plexiglass.'
      }
    },
    {
      number: '14',
      pl: {
        title: 'Grafika 14',
        label: 'GRAFIKA 14 / 14',
        text: 'Odnalezienie ukojenia w sztuce. Poczucie uwolnienia z odosobnienia.',
        technique: 'Technika: mieszana; monotypia, marker, grafika cyfrowa, druk na pleksi.'
      },
      en: {
        title: 'Graphic 14',
        label: 'GRAPHIC 14 / 14',
        text: 'Finding solace in art. A sense of release from isolation.',
        technique: 'Technique: mixed media; monotype, marker, digital graphic, print on plexiglass.'
      }
    }
  ];

  const setModalContent = (work) => {
    if (!work) return;
    const content = work[language()];
    const title = document.querySelector('#modalTitle');
    const text = document.querySelector('#modalText');
    const technique = document.querySelector('#modalTechnique');
    if (title) title.textContent = content.title;
    if (text) text.textContent = content.text;
    if (technique) technique.textContent = content.technique;

    const modal = document.querySelector('#workModal');
    if (modal) {
      const labels = [...modal.querySelectorAll('p, span, small')].filter((el) =>
        !el.id && /GRAFIKA|GRAPHIC/i.test(el.textContent || '')
      );
      if (labels[0]) labels[0].textContent = content.label;
    }
  };

  const prepareGallery = () => {
    const buttons = [...document.querySelectorAll('#canvas .work')].slice(0, works.length);
    buttons.forEach((button, index) => {
      const work = works[index];
      if (!work) return;
      button.setAttribute('aria-label', work[language()].title);
      button.addEventListener('click', () => {
        setModalContent(work);
        requestAnimationFrame(() => setModalContent(work));
        window.setTimeout(() => setModalContent(work), 20);
      }, true);
    });

    const modal = document.querySelector('#workModal');
    if (modal) {
      document.addEventListener('keydown', (event) => {
        if (modal.open && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
          event.preventDefault();
          event.stopImmediatePropagation();
        }
      }, true);
    }
  };

  addStyles();
  addLogoIcon();
  prepareGallery();
})();
