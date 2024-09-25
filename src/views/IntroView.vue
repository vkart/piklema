<template>
  <main class="Intro">
    <Disclaimer :text="text.intro.disclaimer" />
    <Blocks class="Intro-Content" :blocks="intro" />
  </main>
</template>

<script>
import Blocks from '@/components/Blocks.vue';
import Disclaimer from '@/components/Disclaimer.vue';

import text from '@/data/static.js';
import intro from '@/data/intro.js';

export default {
  name: 'FontView',
  components: {
    Blocks,
    Disclaimer
  },
  data () {
    return {
      intro,
      text
    };
  }
};
</script>

<style scoped>
.Intro-Content {
  margin: 0 auto;
  padding-top: 16px;
  padding-bottom: 140px;
  width: 61.8vw;
  max-width: 977px;
}
</style>
