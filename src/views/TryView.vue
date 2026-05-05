<template>
  <main class="Try">
    <Try :font="font" />
  </main>
</template>

<script>
import Try from '@/components/Try.vue';

import fonts from '@/data/fonts.js';
import { store } from '@/store/store.js';

export default {
  name: 'TryView',
  components: {
    Try
  },
  props: {
    id: String
  },
  data () {
    const id = this.id;
    const font = fonts.find(el => el.id === id) || fonts[0];

    return {
      font
    };
  },
  beforeRouteEnter (to, from, next) {
    store.setMode('minimal');
    next();
  },
  beforeRouteLeave () {
    store.setMenuMode('normal');
  }
};
</script>
