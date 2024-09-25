<template>
  <div class="Columns">
    <template v-for="column in columns">
      <div class="Column" :data-device="column.device">
        <Block v-for="block in column.blocks" :key="block.id" :block="block" />
      </div>
    </template>
  </div>
</template>

<script>
import Block from '@/components/Block.vue';

export default {
  name: 'Columns',
  components: {
    Block
  },

  props: {
    columns: Array
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/common.scss';

@include desktop {
  .Columns {
    display: flex;
    gap: $gutter;
  }

  .Column {
    flex: 1;
  }
}
</style>
