<template>
  <div class="Blocks">
    <template v-for="block in blocks">
      <Columns
        v-if="block.type === 'Columns'"
        :key="block.id"
        :columns="block.columns"
      />
      <Grid
        v-else-if="block.type === 'Grid'"
        :key="block.id"
        :blocks="block.items"
        :props="block"
      />
      <Block v-else :key="block.id" :block="block" />
    </template>
  </div>
</template>

<script>
import Block from '@/components/Block.vue';
import Columns from '@/components/Columns.vue';
import Grid from '@/components/Grid.vue';

export default {
  name: 'Blocks',
  components: {
    Block,
    Columns,
    Grid
  },
  props: {
    blocks: Array
  }
};
</script>
