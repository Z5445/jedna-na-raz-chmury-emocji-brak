(() => {
  const text = {
    'nav-start': { pl: 'start', en: 'start' },
    'nav-about': { pl: 'o projekcie', en: 'about' },
    'nav-process': { pl: 'proces', en: 'process' },
    'nav-me': { pl: 'o mnie', en: 'about me' },
    'modal-artwork': { pl: 'Grafika', en: 'Artwork' },
    'modal-text': { pl: 'Opis pracy, jej kontekst oraz tłumaczenie tekstu znajdą się w tym miejscu.', en: 'The description, context, and translation of the text will appear here.' },
    'modal-details': { pl: 'Źródło i szczegółowe informacje do uzupełnienia.', en: 'Source and detailed information to be added.' },
    'modal-technique': { pl: 'Technika: grafika cyfrowa, druk, farba akrylowa / technika mieszana.', en: 'Technique: digital graphics, print, acrylic paint / mixed media.' },
    'close': { pl: 'Zamknij', en: 'Close' },
    'project-label': { pl: '01 / o projekcie', en: '01 / about the project' },
    'project-title': { pl: 'Jedna na raz.<br /><em>Chmury emocji.</em><br />Brak.', en: 'One at a time.<br /><em>Emotional clouds.</em><br />Lack.' },
    'project-p1': { pl: 'Instalacja skupia się na afekcie wywołanym stratą – zarówno tą mierzalną, dokonaną, jak i subiektywnym poczuciem niespodziewanego braku. To przytłaczający zmysły stan zawieszony gdzieś w pobliżu melancholii i żalu, w którym jednak pojawiają się przebłyski złości, nadziei czy wdzięczności – ponieważ żadne doświadczenie nigdy nie jest zero-jedynkowe. Przedstawiam ten gęsty stan, przywołując teksty z różnych źródeł, tworząc z nich wizualną interpretację stojących za nimi nagich emocji.', en: 'The installation focuses on the affect caused by loss—both the measurable, completed kind and the subjective sense of an unexpected absence. It is a sensory-overwhelming state suspended somewhere near melancholy and grief, in which flashes of anger, hope, or gratitude still appear—because no experience is ever black and white. I present this dense state by evoking texts from different sources and creating a visual interpretation of the raw emotions behind them.' },
    'project-p2': { pl: 'Poprzez wyciąganie poszczególnych słów, ujawniam mój własny filtr „czytania” i przeżywania osobistych doświadczeń – opowiadam o tym, jak sama przepuszczam je przez własną empatię i wrażliwość. Teksty pochodzą z rozmaitych źródeł, bo mimo że mamy na swoje przeżycia różne nazwy i osobiście je ubieramy w różne zachowania, to w zarodku bazujemy na tych samych emocjach. Emocje pojawiają się i znikają, w tej pracy zachęcam do dostrzeżenia ich i podkreślam, że wybór tego, na czym się skupiamy, jak to interpretujemy i wykorzystujemy, należy do nas. Wizualnie przez rozmycia, powtarzalność, nawarstwienia i brutalność ekspresji podkreślam ulotność tych zdarzeń i szum przetwarzania ich.', en: 'By drawing out individual words, I reveal my own filter of “reading” and living through personal experiences. I speak about how I pass them through my own empathy and sensitivity. The texts come from many sources because, although we give our experiences different names and express them through different behaviours, at their origin we rely on the same emotions. Emotions appear and disappear; this work encourages us to notice them and emphasises that the choice of what we focus on, how we interpret it, and how we use it belongs to us. Through blur, repetition, layering, and the brutality of expression, I underline the ephemerality of these events and the noise of processing them.' },
    'project-visualisation': { pl: 'instalacja w przestrzeni – wizualizacje', en: 'installation in space — visualisations' },
    'project-documentation': { pl: 'dokumentacja instalacji', en: 'installation documentation' },
    'project-film': { pl: 'film z instalacji', en: 'installation film' },
    'project-film-placeholder': { pl: 'miejsce na materiał wideo', en: 'space for video material' },
    'process-label': { pl: '02 / proces', en: '02 / process' },
    'process-title': { pl: 'Od myśli<br /><em>na pleksi</em>', en: 'From an idea<br /><em>to plexiglass</em>' },
    'process-intro': { pl: 'Proces wymienia kroki niezbędne do stworzenia finalnej wersji instalacji.', en: 'The process lists the steps required to create the final version of the installation.' },
    'step-1-title': { pl: 'Wybór tematu', en: 'Choosing the subject' },
    'step-1-text': { pl: 'Rozpoznanie emocji, które stanowią intrygujący wpływ na człowieka. Strata wywołuje taki rodzaj bólu, który może zmienić życie.', en: 'Identifying emotions that exert an intriguing influence on people. Loss triggers a kind of pain that can change a life.' },
    'step-2-title': { pl: 'Wyszukiwanie tekstów', en: 'Searching for texts' },
    'step-2-text': { pl: 'Gromadzenie źródeł, fragmentów literackich, piosenek i wypowiedzi, które rozbrajają emocje do naga, albo poprzez proste metafory pozostają blisko oryginalnej emocji.', en: 'Collecting sources, literary fragments, songs, and statements that strip emotions bare or, through simple metaphors, remain close to the original emotion.' },
    'step-3-title': { pl: 'Przerabianie tekstów', en: 'Reworking texts' },
    'step-3-text': { pl: 'Wybór, tłumaczenie, wymazywanie, podkreślanie oraz łączenie słów z wrażeniowo wybranym obrazem. Działanie intuicyjne, w odpowiedzi na pierwszy odbiór tekstu.', en: 'Selecting, translating, erasing, highlighting, and pairing words with an image chosen by intuition. An intuitive response to the first reading of the text.' },
    'step-4-title': { pl: 'Dopracowywanie grafik', en: 'Refining the graphics' },
    'step-4-text': { pl: 'Praca nad kompozycją, kolorem, zależnościami pomiędzy grafikami, przygotowanie właściwych projektów do druku - na bazie skanów, edycji, wizualizacji, założeń projektowych.', en: 'Working on composition, colour, and relationships between graphics; preparing print-ready designs from scans, edits, visualisations, and design assumptions.' },
    'step-5-title': { pl: 'Iteracje', en: 'Iterations' },
    'step-5-text': { pl: 'Kolejne edycje wynikające z wyzwań druku na wybranym materiale (który doskonale obrazuje „filtr” widzenia świata i ulotność powyższych uczuć), zmiany zmotywowane właściwym zobrazowaniem tematu i stworzeniem spójnej całości instalacji.', en: 'Further editions arising from the challenges of printing on the selected material, which vividly represents the “filter” of seeing the world and the transience of these feelings. Changes are driven by the need to portray the subject accurately and create a coherent installation.' },
    'step-6-title': { pl: 'Druk', en: 'Printing' },
    'step-6-text': { pl: 'Dobór materiałów, techniki druku, testy przejrzystości i przygotowanie prac do ekspozycji.', en: 'Selecting materials and printing techniques, testing transparency, and preparing works for display.' },
    'step-7-title': { pl: 'Montaż w przestrzeni', en: 'Installation in space' },
    'step-7-text': { pl: 'Zawieszenie grafik w przestrzeni w korespondujących sobie miejscach, bliżej centrum emocje nagłe i silne, na peryferiach te trudniejsze do dostrzeżenia i zaangażowania się. Montaż systemu dźwiękowego.', en: 'Hanging the graphics in corresponding places in space: sudden and intense emotions closer to the centre, and those harder to notice or engage with at the periphery. Installing the sound system.' },
    'step-8-title': { pl: 'Budowa strony', en: 'Building the website' },
    'step-8-text': { pl: 'Przeniesienie instalacji do cyfrowej, interaktywnej przestrzeni.', en: 'Translating the installation into a digital, interactive space.' },
    'about-label': { pl: '03 / o mnie', en: '03 / about me' },
    'about-name': { pl: 'Zuzanna<br /><em>Zajączkowska</em>', en: 'Zuzanna<br /><em>Zajączkowska</em>' },
    'about-photo': { pl: 'miejsce na<br />zdjęcie', en: 'space for<br />a portrait' },
    'about-description': { pl: 'Artystka wizualna pracująca z tekstem, obrazem, dźwiękiem i instalacją. Fascynuje mnie funkcjonowanie umysłu człowieka, a w szczególności kwestia podświadomości i idących za nią doświadczeń emocjonalnych, duchowych i cielesnych. Ciekawi mnie, jak funkcjonują ludzie w społeczeństwie i szerzej myśląc, w kulturze, a co za tym idzie, jak wpływ ma to na język, estetykę, tradycje i vice versa. Jednocześnie w tych samych miejscach szukam powtarzalności: w schematach, w historii – zarówno na poziomie antropologicznym, jak i jednostki, stale zadając sobie pytanie: jakie reguły rządzą życiem?', en: 'A visual artist working with text, image, sound, and installation. I am fascinated by the way the human mind functions, especially by the subconscious and the emotional, spiritual, and bodily experiences that follow from it. I am curious about how people function in society and, more broadly, in culture—and how this affects language, aesthetics, and traditions, and vice versa. At the same time, I search for repetition in these places: in patterns and in history, both at the anthropological and individual level, constantly asking myself: what rules govern life?' },
    'contact': { pl: 'skontaktuj się <span aria-hidden="true">→</span>', en: 'get in touch <span aria-hidden="true">→</span>' }
  };

  let stored = null;
  try { stored = localStorage.getItem('chmury-emocji-language'); } catch (_) {}
  const requested = new URLSearchParams(window.location.search).get('lang');
  let language = requested === 'en' || requested === 'pl' ? requested : (stored === 'en' ? 'en' : 'pl');

  const applyLanguage = next => {
    language = next;
    try { localStorage.setItem('chmury-emocji-language', language); } catch (_) {}
    document.documentElement.lang = language;
    document.querySelectorAll('[data-i18n]').forEach(node => {
      const value = text[node.dataset.i18n]?.[language];
      if (value) node.innerHTML = value;
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(node => {
      const value = text[node.dataset.i18nAria]?.[language];
      if (value) node.setAttribute('aria-label', value);
    });
    document.querySelectorAll('[data-lang]').forEach(button => button.classList.toggle('active', button.dataset.lang === language));
    document.querySelectorAll('a[href]').forEach(link => {
      const rawHref = link.getAttribute('href');
      if (!rawHref || rawHref.startsWith('#') || rawHref.startsWith('mailto:')) return;
      const destination = new URL(rawHref, window.location.href);
      if (!destination.pathname.endsWith('.html')) return;
      destination.searchParams.set('lang', language);
      link.setAttribute('href', `${destination.pathname.split('/').pop()}?${destination.searchParams.toString()}`);
    });
    const title = document.body.dataset[`title${language === 'en' ? 'En' : 'Pl'}`];
    if (title) document.title = title;
    window.dispatchEvent(new CustomEvent('languagechange', { detail: { language } }));
  };

  window.getCurrentLanguage = () => language;
  window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-lang]').forEach(button => button.addEventListener('click', () => applyLanguage(button.dataset.lang)));
    applyLanguage(language);
  });
})();
