<template>
  <div
    v-html="typeof text === 'object' ? text[lang] : text"
    class="Text"
  />
</template>

<script>
import { store } from '@/store/store';

export default {
  name: 'Localized',
  props: {
    text: [Object, String]
  },
  computed: {
    lang () {
      return store.lang;
    }
  }
};
</script>

<style scoped lang="scss">
.Text {
  display: contents;
}
</style>
