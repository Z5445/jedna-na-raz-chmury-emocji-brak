(() => {
  const works = {
    w01: {
      pl: {
        label: "GRAFIKA 10 / 14",
        title: "Grafika 10",
        description: "Złość niekontrolowana i niehamowana, nagły wybuch ze skrywanych emocji.",
        source: "Źródło tekstu: anonimowy list umieszczony w internecie.",
        technique: "Technika: grafika cyfrowa, druk na pleksi."
      },
      en: {
        label: "WORK 10 / 14",
        title: "Work 10",
        description: "Uncontrolled, unrestrained anger — a sudden outburst of concealed emotions.",
        source: "Text source: anonymous letter published online.",
        technique: "Technique: digital graphics, print on plexiglass."
      }
    },
    w02: {
      pl: {
        label: "GRAFIKA 13 / 14",
        title: "Grafika 13",
        description: "Piękno świata zewnętrznego pozostaje w cieniu w obliczu wewnętrznej straty.",
        source: "Źródło tekstu: książka „Norwegian Wood”, Haruki Murakami, tłum. Jay Rubin",
        technique: "Technika: mieszana; fotografia, grafika cyfrowa, druk na pleksi."
      },
      en: {
        label: "WORK 13 / 14",
        title: "Work 13",
        description: "The beauty of the outside world remains in shadow in the face of inner loss.",
        source: "Text source: the novel “Norwegian Wood” by Haruki Murakami, translated by Jay Rubin",
        technique: "Technique: mixed media; photography, digital graphics, print on plexiglass."
      }
    },
    w03: {
      pl: {
        label: "GRAFIKA 5 / 14",
        title: "Grafika 5",
        description: "Próba ucieczki z trudnego stanu emocjonalnego, jednoczesny brak wiary we własną sprawczość.",
        source: "",
        technique: "Technika: grafika cyfrowa, druk na pleksi."
      },
      en: {
        label: "WORK 5 / 14",
        title: "Work 5",
        description: "An attempt to escape a difficult emotional state, accompanied by a lack of faith in one’s own agency.",
        source: "",
        technique: "Technique: digital graphics, print on plexiglass."
      }
    },
    w04: {
      pl: {
        label: "GRAFIKA 4 / 14",
        title: "Grafika 4",
        description: "Natrętna myśl zajmuje miejsce wyobraźni, zajmuje cały umysł.",
        source: "Źródło tekstu: utwór Fleetwood Mac – Silver Springs",
        technique: "Technika: mieszana; długopis, marker piórkowy, grafika cyfrowa, druk na pleksi."
      },
      en: {
        label: "WORK 4 / 14",
        title: "Work 4",
        description: "An intrusive thought takes the place of imagination; it occupies the whole mind.",
        source: "Text source: Fleetwood Mac — Silver Springs",
        technique: "Technique: mixed media; ballpoint pen, fountain marker, digital graphics, print on plexiglass."
      }
    },
    w05: {
      pl: {
        label: "GRAFIKA 14 / 14",
        title: "Grafika 14",
        description: "Odnalezienie ukojenia w sztuce. Poczucie uwolnienia z odosobnienia.",
        source: "Źródło tekstu: Rozmowa z AI na temat średniowiecznego utworu \"Roman de Flamenca\"",
        technique: "Technika: mieszana; monotypia, marker, grafika cyfrowa, druk na pleksi."
      },
      en: {
        label: "WORK 14 / 14",
        title: "Work 14",
        description: "Finding solace in art. A sense of release from isolation.",
        source: "Text source: a conversation with AI about the medieval work “Roman de Flamenca”",
        technique: "Technique: mixed media; monotype, marker, digital graphics, print on plexiglass."
      }
    }
  };

  const lang = new URLSearchParams(window.location.search).get("lang") === "en" ? "en" : "pl";

  const setLogo = () => {
    const logo = document.querySelector("header.gallery-header .logo");
    if (!logo) return;

    const icon = document.createElement("img");
    icon.className = "plutchik-logo";
    icon.src = "assets/plutchik-smutek.png";
    icon.alt = lang === "en" ? "Plutchik emotion wheel" : "Koło emocji Plutchika";

    const title = document.createElement("span");
    title.className = "logo-title";
    title.innerHTML = lang === "en" ? "emotion<br><em>clouds</em>" : "chmury<br><em>emocji</em>";

    logo.replaceChildren(icon, title);

    document
      .querySelectorAll(".plutchik-logo, .plutchik-icon, [data-plutchik]")
      .forEach((element) => {
        if (!logo.contains(element)) element.remove();
      });
  };

  const getWorkKey = (element) => Object.keys(works).find((key) => element.classList.contains(key));

  const setModalContent = (key, image) => {
    const modal = document.querySelector("#workModal");
    if (!modal) return;

    const data = works[key][lang];
    const title = modal.querySelector("#modalTitle");
    const description = modal.querySelector("#modalText");
    const details = modal.querySelector("#modalDetails");
    const technique = modal.querySelector("#modalTechnique");
    const modalImage = modal.querySelector("#modalImage, .modal-work img");

    let kicker = modal.querySelector("#modalKicker");
    if (!kicker && title?.parentNode) {
      kicker = document.createElement("p");
      kicker.id = "modalKicker";
      kicker.className = "mono";
      title.parentNode.insertBefore(kicker, title);
    }

    if (kicker) kicker.textContent = data.label;
    if (title) title.textContent = data.title;
    if (description) description.textContent = data.description;
    if (details) {
      details.textContent = data.source;
      details.hidden = !data.source;
    }
    if (technique) technique.textContent = data.technique;
    if (modalImage && image) {
      modalImage.src = image.currentSrc || image.src;
      modalImage.alt = image.alt || data.title;
    }

    modal
      .querySelectorAll(".modal-work button, .modal-work [class*='nav'], .modal-work [class*='dot']")
      .forEach((element) => {
        element.hidden = true;
        element.setAttribute("aria-hidden", "true");
      });

    if (typeof modal.showModal === "function" && !modal.open) {
      modal.showModal();
    } else {
      modal.setAttribute("open", "");
    }
  };

  const buildBoard = () => {
    const board = document.querySelector("#canvas");
    if (!board) return;

    const nextBoard = board.cloneNode(false);

    Object.keys(works).forEach((key) => {
      const original = board.querySelector(`.work.${key}`);
      if (!original) return;

      const card = original.cloneNode(true);
      card.type = "button";
      card.removeAttribute("style");
      card.setAttribute("aria-label", works[key][lang].title);
      nextBoard.append(card);
    });

    board.replaceWith(nextBoard);

    nextBoard.addEventListener(
      "click",
      (event) => {
        const card = event.target.closest(".work");
        if (!card) return;
        const key = getWorkKey(card);
        const image = card.querySelector("img");
        if (key && image) setModalContent(key, image);
        event.preventDefault();
        event.stopImmediatePropagation();
      },
      true
    );

    nextBoard.addEventListener("dragstart", (event) => event.preventDefault());
  };

  const init = () => {
    setLogo();
    buildBoard();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
