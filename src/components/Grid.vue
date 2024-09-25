<template>
  <div class="Grid">
    <Block
      v-for="block in blocks"
      :key="block.id"
      :block="block"
      class="Grid-Block"
    />
  </div>
</template>

<script>
import Block from '@/components/Block.vue';

export default {
  name: 'Grid',
  components: {
    Block
  },

  props: {
    blocks: Array
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/common.scss';

.Grid {
  display: flex;
  flex-wrap: wrap;
  gap: $gutter;
}

.Grid-Block {
  flex: 0 0 auto;
}
</style>
