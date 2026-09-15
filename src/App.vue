<template>
  <metainfo />
  <RouterView />
</template>

<script>
import { RouterView } from 'vue-router';
import { useMeta } from 'vue-meta';
import { store } from './store/store';

export default {
  name: 'App',
  components: {
    RouterView
  },
  data () {
    return {
      store
    };
  },
  setup () {
    useMeta({
      htmlAttrs: {
        lang: store.lang // Needed for hyphenation to work correctly
      },
      title: 'Timeline'
    });
  }
};
</script>
