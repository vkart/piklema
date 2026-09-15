import { reactive } from 'vue';

const DEFAULT_LANG = 'ru';

export const store = reactive({
  lang: DEFAULT_LANG
});
