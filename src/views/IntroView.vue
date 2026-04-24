<template>
  <main class="Intro">
    <Page
      type="text"
      :content="content"
      :disclaimer="text.intro.disclaimer"
    />
  </main>
</template>

<script>
import Page from '@/components/Page.vue';

import text from '@/data/static.js';
import content from '@/data/intro.js';

export default {
  name: 'IntroView',
  components: {
    Page
  },
  data () {
    return {
      content,
      text
    };
  }
};
</script>
