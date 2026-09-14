(function () {
  "use strict";

  const style = document.createElement("style");
  style.textContent = `
    /* Na tablicy miniatury pozostają bez numerów; numeracja w opisach jest zachowana. */
    #canvas .work::before,
    #canvas .work::after,
    #canvas .work > .work-number,
    #canvas .work > .work-label,
    #canvas .work > [data-work-number] {
      display: none !important;
      content: none !important;
    }

    /* W nagłówku zostaje dokładnie jeden znak koła Plutchika. */
    .logo.has-single-plutchik::before,
    .logo.has-single-plutchik::after {
      display: none !important;
      content: none !important;
    }

    .logo.has-single-plutchik > img:not(:first-of-type) {
      display: none !important;
    }
  `;
  document.head.appendChild(style);

  function normalizeHeaderLogo() {
    const header = document.querySelector("header");
    const logo = header && header.querySelector("a.logo, .logo");
    if (!header || !logo) return;

    const iconCandidates = Array.from(header.querySelectorAll("img")).filter((img) => {
      const signature = `${img.getAttribute("src") || ""} ${img.getAttribute("alt") || ""} ${img.className || ""}`;
      return /plutchik|smutek|logo-icon|plutchik-icon/i.test(signature);
    });

    if (!iconCandidates.length) return;

    const icon = iconCandidates[0];
    iconCandidates.slice(1).forEach((duplicate) => duplicate.remove());
    if (!logo.contains(icon)) logo.prepend(icon);
    logo.classList.add("has-single-plutchik");
  }

  const modalSources = {
    4: {
      pl: "Źródło tekstu: utwór Fleetwood Mac – Silver Springs",
      en: "Text source: Fleetwood Mac — Silver Springs"
    },
    5: { pl: "", en: "" },
    13: {
      pl: "Źródło tekstu: książka „Norwegian Wood”, Haruki Murakami, tłum. Jay Rubin",
      en: "Text source: the novel “Norwegian Wood” by Haruki Murakami, translated by Jay Rubin"
    },
    14: {
      pl: "Źródło tekstu: Rozmowa z AI na temat średniowiecznego utworu \"Roman de Flamenca\"",
      en: "Text source: a conversation with AI about the medieval work “Roman de Flamenca”"
    }
  };

  function currentLanguage() {
    const queryLanguage = new URLSearchParams(window.location.search).get("lang");
    const language = queryLanguage || document.documentElement.lang || "pl";
    return language.toLowerCase().startsWith("en") ? "en" : "pl";
  }

  function updateModalSource() {
    const modal = document.querySelector("#staticWorkModal");
    if (!modal) return;

    const title = modal.querySelector("h1");
    const source = modal.querySelector(".static-modal-source");
    if (!title || !source) return;

    const match = title.textContent.match(/\d+/);
    const graphicNumber = match ? Number(match[0]) : NaN;
    const sourceData = modalSources[graphicNumber];
    if (!sourceData) return;

    const value = sourceData[currentLanguage()];
    if (source.textContent !== value) source.textContent = value;
    source.hidden = !value;
    source.style.display = value ? "" : "none";
  }

  normalizeHeaderLogo();
  updateModalSource();

  const modal = document.querySelector("#staticWorkModal");
  if (modal) {
    const observer = new MutationObserver(updateModalSource);
    observer.observe(modal, { subtree: true, childList: true, characterData: true, attributes: true });
  }

})();
