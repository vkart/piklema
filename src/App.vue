<template>
  <metainfo />
  <Header />
  <RouterView />
  <Footer />
</template>

<script>
import { RouterView } from 'vue-router';
import { useMeta } from 'vue-meta';
import { store } from './store/store';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    RouterView
  },
  setup () {
    useMeta({
      htmlAttrs: {
        lang: store.lang // Needed for hyphenation to work correctly
      },
      title: 'PTF'
    });
  }
};
</script>
