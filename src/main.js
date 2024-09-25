import { createApp } from 'vue';
import { createMetaManager, defaultConfig as metaConfig } from 'vue-meta';
import App from './App.vue';
import router from './router';
import { isMobile, isMobileReactive } from './composables/useMedia';

import './assets/main.scss';

const app = createApp(App);

app.config.globalProperties.$isMobile = isMobile;
app.provide('isMobileReactive', isMobileReactive);

app.use(router);
app.use(createMetaManager(false, {
  ...metaConfig,
  meta: { tag: 'meta', nameless: true }
}));

app.mount('#app');
