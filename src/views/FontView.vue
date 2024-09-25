<template>
  <main class="Font" v-if="font">
    <FontMenu :font="font" />
    <Image class="Font-Hero" :image="font.heroImage" />
    <PageView :content="font.content" />
  </main>
</template>

<script>
import Image from '@/components/Image.vue';
import FontMenu from '@/components/FontMenu.vue';
import PageView from '@/views/PageView.vue';

import fonts from '@/data/fonts.js';
import { store } from '@/store/store.js';

export default {
  name: 'FontView',
  components: {
    Image,
    FontMenu,
    PageView
  },
  props: {
    id: String
  },
  data () {
    return {
      font: null
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
  beforeRouterLeave () {
    store.setMenuMode('normal');
    store.removePageName(undefined);
  },
  methods: {
    setFont (font) {
      this.font = font;
      store.setPageName(font.id);
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
