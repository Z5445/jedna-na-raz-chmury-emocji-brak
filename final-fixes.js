(function () {
  "use strict";

  function currentLanguage() {
    if (typeof window.getCurrentLanguage === "function") {
      return window.getCurrentLanguage() === "en" ? "en" : "pl";
    }

    const requested = new URLSearchParams(window.location.search).get("lang");
    const documentLanguage = document.documentElement.lang;
    return requested === "en" || documentLanguage === "en" ? "en" : "pl";
  }

  function installFinalStyles() {
    if (document.getElementById("final-ui-fixes")) return;

    const style = document.createElement("style");
    style.id = "final-ui-fixes";
    style.textContent = `
      /* The board should show only the artworks, without miniature numbers. */
      #canvas .work::before,
      #canvas .work::after,
      #canvas .work > .work-number,
      #canvas .work > .work-label,
      #canvas .work > [data-work-number] {
        display: none !important;
        content: none !important;
      }

      /* One Plutchik mark, shared by the header on every page. */
      header .logo::before,
      header .logo::after {
        display: none !important;
        content: none !important;
        background: none !important;
      }

      header .logo {
        display: inline-flex !important;
        align-items: center !important;
        gap: 12px !important;
        color: var(--ink, #171717) !important;
        font-size: 13px !important;
        font-weight: 600 !important;
        line-height: .85 !important;
        white-space: nowrap !important;
        text-decoration: none !important;
      }

      header .logo .plutchik-corner-icon {
        display: block !important;
        flex: 0 0 auto !important;
        width: 42px !important;
        height: 42px !important;
        object-fit: contain !important;
      }

      header .logo .logo-copy {
        display: inline-flex !important;
        flex-direction: column !important;
        align-items: flex-start !important;
        line-height: .78 !important;
      }

      header .logo .logo-copy strong,
      header .logo .logo-copy em {
        display: block !important;
      }

      header .logo .logo-copy em {
        font-family: Georgia, "Times New Roman", serif;
        font-style: italic;
        font-weight: 400;
      }

      .static-modal-source[hidden] {
        display: none !important;
      }

      @media (max-width: 720px) {
        header .logo {
          gap: 8px !important;
        }

        header .logo .plutchik-corner-icon {
          width: 32px !important;
          height: 32px !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function removeBoardNumbers() {
    document.querySelectorAll("#canvas .work").forEach((work) => {
      Array.from(work.childNodes).forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE && /^\s*0?\d+\s*$/.test(node.textContent || "")) {
          node.remove();
        }
      });

      work.querySelectorAll(".work-number, .work-label, [data-work-number]").forEach((label) => {
        label.remove();
      });
    });
  }

  function normalizeHeaderLogo() {
    const language = currentLanguage();
    const words = language === "en"
      ? ["emotional", "clouds"]
      : ["chmury", "emocji"];

    document.querySelectorAll("header .logo").forEach((logo) => {
      const icon = document.createElement("img");
      icon.className = "plutchik-corner-icon";
      icon.src = "assets/plutchik-smutek.png";
      icon.alt = "";
      icon.setAttribute("aria-hidden", "true");

      const copy = document.createElement("span");
      copy.className = "logo-copy";

      const firstLine = document.createElement("strong");
      firstLine.textContent = words[0];

      const secondLine = document.createElement("em");
      secondLine.textContent = words[1];

      copy.append(firstLine, secondLine);
      logo.replaceChildren(icon, copy);
      logo.setAttribute("aria-label", words.join(" "));
    });
  }

  function ensureModalSource(info) {
    let source = info.querySelector(".static-modal-source, #modalDetails");
    if (source) {
      source.classList.add("static-modal-source");
      return source;
    }

    source = document.createElement("p");
    source.className = "static-modal-source";
    const technique = info.querySelector(".static-modal-technique, #modalTechnique");
    if (technique) info.insertBefore(source, technique);
    else info.appendChild(source);
    return source;
  }

  function updateModalSource() {
    const modal = document.querySelector("dialog#staticWorkModal, dialog#workModal");
    if (!modal || !modal.open) return;

    const info = modal.querySelector(".static-modal-info, .modal-info");
    const title = modal.querySelector("#staticModalTitle, #modalTitle, h1");
    if (!info || !title) return;

    const match = (title.textContent || "").match(/(?:Grafika|Graphic)\s*0?(\d+)/i);
    if (!match) return;

    const workNumber = Number(match[1]);
    const source = ensureModalSource(info);
    const lang = currentLanguage();
    const sources = {
      10: {
        pl: "Źródło tekstu: anonimowy list umieszczony w internecie",
        en: "Text source: an anonymous letter published online"
      },
      4: {
        pl: "Źródło tekstu: utwór Fleetwood Mac – Silver Springs",
        en: "Text source: Fleetwood Mac — Silver Springs"
      },
      13: {
        pl: "Źródło tekstu: książka „Norwegian Wood”, Haruki Murakami, tłum. Jay Rubin",
        en: "Text source: the novel “Norwegian Wood” by Haruki Murakami, translated by Jay Rubin"
      },
      14: {
        pl: "Źródło tekstu: Rozmowa z AI na temat średniowiecznego utworu \"Roman de Flamenca\"",
        en: "Text source: a conversation with AI about the medieval work “Roman de Flamenca”"
      }
    };

    if (workNumber === 5) {
      source.textContent = "";
      source.hidden = true;
      return;
    }

    if (sources[workNumber]) {
      source.hidden = false;
      source.textContent = sources[workNumber][lang];
    }
  }

  function run() {
    installFinalStyles();
    removeBoardNumbers();
    normalizeHeaderLogo();
    updateModalSource();

    const observer = new MutationObserver(() => {
      removeBoardNumbers();
      updateModalSource();
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["open"]
    });

    window.addEventListener("languagechange", normalizeHeaderLogo);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run, { once: true });
  } else {
    run();
  }
})();
