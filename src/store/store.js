import { reactive } from 'vue';

const DEFAULT_LANG = 'ru';

export const store = reactive({
  lang: DEFAULT_LANG,
  pageName: undefined,
  mode: 'normal',
  menuMode: 'normal',
  slides: null,
  currentSlide: null,

  setLang (lang) {
    this.lang = lang;
  },
  setMode (mode) {
    this.mode = mode;
  },
  setMenuMode (mode) {
    this.menuMode = mode;
  },
  setPageName (name) {
    this.pageName = name;
  },
  removePageName () {
    this.pageName = undefined;
  },
  slideshow (slides, selected) {
    this.slides = slides;
    this.currentSlide = slides ? selected || slides[0] : null;
  }
});
