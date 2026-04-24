<template>
  <div class="Page" :data-type="type">
    <Disclaimer class="Page-Disclaimer" :text="disclaimer" v-if="disclaimer" />
    <Blocks class="Page-Blocks" :blocks="content" />
  </div>
</template>

<script>
import Blocks from '@/components/Blocks.vue';
import Disclaimer from '@/components/Disclaimer.vue';

export default {
  name: 'PageView',
  components: {
    Blocks,
    Disclaimer
  },
  props: {
    type: String,
    content: Array, // Blocks
    disclaimer: Object // Localized
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/common.scss';

@include desktop {
  .Page-Blocks {
    display: flex;
    flex-direction: column;
    gap: $gap;
    padding: 40px 0 0 0;
  }

  .Page {
    margin: 0 auto;
  }

  .Page[data-type="text"] {
    padding-bottom: 164px;
  }

  .Page[data-type="grid"] {
    .Page-Blocks {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: $microgrid;
      padding-top: $microgrid;
    }
  }
}
</style>
