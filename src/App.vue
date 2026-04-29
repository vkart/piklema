<template>
  <metainfo />
  <Logo v-if="store.mode !== 'minimal'" />
  <Header />
  <RouterView />
  <Slideshow />
  <Footer v-if="store.mode !== 'minimal'" />
</template>

<script>
import { RouterView } from 'vue-router';
import { useMeta } from 'vue-meta';
import { store } from './store/store';

import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Logo from '@/components/Logo.vue';
import Slideshow from '@/components/Slideshow.vue';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    Logo,
    Slideshow,
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
      title: 'PTF'
    });
  }
};
</script>
