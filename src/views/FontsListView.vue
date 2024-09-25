<template>
  <main class="FontsList">
    <FontListItem v-for="font in fonts" :item="font" />
  </main>
</template>

<script>
import FontListItem from '@/components/FontListItem.vue';

import fonts from '@/data/fonts.js';

export default {
  name: 'FontView',
  components: {
    FontListItem
  },
  data () {
    return {
      fonts
    };
  }
};
</script>

<style scoped>
.FontsList {
  margin-top: -88px;
}
</style>
