<template>
  <main class="Intro">
    <Page
      type="grid"
      :content="content"
      :disclaimer="text.terms.disclaimer"
    />
  </main>
</template>

<script>
import Page from '@/components/Page.vue';

import text from '@/data/static.js';
import content from '@/data/terms.js';

export default {
  name: 'TermsView',
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
