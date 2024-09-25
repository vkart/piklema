<template>
  <div class="Page">
    <Blocks :blocks="content" />
  </div>
</template>

<script>
import Blocks from '@/components/Blocks.vue';

export default {
  name: 'PageView',
  components: {
    Blocks
  },
  props: {
    content: Array
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/common.scss';

@include desktop {
  .Page {
    margin: 0 auto;
    padding: 60px 0 152px 0;
    width: 75vw;
    max-width: 1440px;
    min-width: 768px;
  }
}

@include mobile {
  .Page {
    margin: 0 auto;
    padding: 60px 0 152px 0;
    width: calc(100vw - 2 * $gutter);
  }
}
</style>
