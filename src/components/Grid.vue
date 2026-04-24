<template>
  <div
    class="Grid"
    :data-modifier="props.modifier"
    :data-background="props.background"
  >
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
    blocks: Array,
    props: Object
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/common.scss';

.Grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2 * $gutter + $grid;

  &[data-modifier="fixed-width"] {
    @include fixed-width;
    margin: auto;
  }

  &[data-modifier="center"] {
    justify-content: center;
  }

  &[data-background="grey"] {
    background-color: $color-grey;
  }

  &[data-background="yellow"] {
    background-color: $color-yellow;
  }
}

.Grid-Block {
  flex: 0 0 auto;
}
</style>
