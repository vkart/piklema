<template>
  <div class="Language">
    <template v-for="lang in langs">
      <div class="Language-Item" :data-selected="store.lang === lang ? true : undefined">
        <Button
          color="grey"
          outline="green"
          radius="round"
          :selected="store.lang === lang ? true : undefined"
          @click="select(lang)"
        >{{lang}}</Button>
      </div>
    </template>
  </div>
</template>

<script>
import Button from '@/components/Button.vue';
import { store } from '@/store/store';

export default {
  name: 'Language',
  components: {
    Button
  },

  props: {
    item: Object
  },

  data () {
    return {
      langs: ['ru', 'en'],
      store
    };
  },

  methods: {
    select (lang) {
      store.setLang(lang);
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/common.scss';

.Language {
  display: flex;
  gap: 0;
  width: 96px + 2 * $gutter;
  transition: all 0.25s ease-in-out;

  &:hover {
    width: 96px * 2 + 4 * $gutter;
    transition-delay: 0.5s;

    .Language-Item {
      transition-delay: 0.5s;
    }
  }

  &:not(:hover) {
    .Language-Item:not([data-selected]) {
      flex: 0 0 0px;
      padding: $gutter 0;
    }
  }
}

.Language-Item {
  overflow: hidden;
  flex: 0 0 (96px + 2 * $gutter);
  transition: all 0.25s ease-in-out;
  padding: $gutter;
  margin: -$gutter 0;

  > .Button {
    width: 96px;
  }
}
</style>
