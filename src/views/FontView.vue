<template>
  <main class="Font" v-if="font">
    <FontMenu :font="font" @buy="toggleForm(true)" />
    <Page :content="font.content" />
    <Overlay v-show="showForm">
      <Purchase :font="font" @close="toggleForm(false)" />
    </Overlay>
  </main>
</template>

<script>
import FontMenu from '@/components/FontMenu.vue';
import Page from '@/components/Page.vue';
import Overlay from '@/components/Overlay.vue';
import Purchase from '@/components/Purchase.vue';

import fonts from '@/data/fonts.js';
import { store } from '@/store/store.js';

export default {
  name: 'FontView',
  components: {
    FontMenu,
    Overlay,
    Page,
    Purchase
  },
  props: {
    id: String
  },
  data () {
    return {
      font: null,
      showForm: false
    };
  },
  beforeRouteEnter (to, from, next) {
    const id = to.params.id;
    const font = fonts.find(el => el.id === id);

    if (font) {
      store.setMenuMode('compact');
      next(vm => vm.setFont(font));
    } else {
      next('/fonts');
    }
  },
  beforeRouteLeave () {
    store.setMenuMode('normal');
    store.removePageName(undefined);
  },
  methods: {
    setFont (font) {
      this.font = font;
      store.setPageName(font.id);
    },
    toggleForm (state) {
      console.log('TOGGLE FORM', state);
      this.showForm = state;
    }
  }
};
</script>

<style scoped>
.Font-Hero {
  width: 100%;
  max-width: 1920px;
}
</style>
