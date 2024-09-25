import { reactive } from 'vue';

const DEFAULT_LANG = 'en';

export const store = reactive({
  lang: DEFAULT_LANG,
  pageName: undefined,
  menuMode: 'normal',

  setLang (lang) {
    this.lang = lang;
  },
  setMenuMode (mode) {
    this.menuMode = mode;
  },
  setPageName (name) {
    this.pageName = name;
  },
  removePageName () {
    this.pageName = undefined;
  }
});
