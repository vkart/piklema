<template>
  <div
    class="Block"
    :data-type="block.type"
    :data-device="block.device"
    v-if="!block.lang || (block.lang === store.lang)"
  >
    <template v-if="block.type === 'Text'">
      <TextBlock :block="block" />
    </template>

    <template v-if="block.type === 'Question'">
      <QABlock :block="block" />
    </template>

    <template v-if="block.type === 'Answer'">
      <QABlock :block="block" />
    </template>

    <template v-else-if="block.type === 'Image'">
      <ImageBlock :block="block" />
    </template>

    <template v-else-if="block.type === 'Header'">
      <HeaderBlock :block="block" />
    </template>

    <template v-else-if="block.type === 'Collapsible'">
      <CollapsibleBlock :block="block" />
    </template>

    <template v-else-if="block.type === 'Gap'">
      <GapBlock :block="block" />
    </template>
  </div>
</template>

<script>
import CollapsibleBlock from '@/components/blocks/CollapsibleBlock.vue';
import GapBlock from '@/components/blocks/GapBlock.vue';
import ImageBlock from '@/components/blocks/ImageBlock.vue';
import TextBlock from '@/components/blocks/TextBlock.vue';
import HeaderBlock from '@/components/blocks/HeaderBlock.vue';
import QABlock from '@/components/blocks/QABlock.vue';

export default {
  name: 'Block',
  components: {
    CollapsibleBlock,
    GapBlock,
    ImageBlock,
    TextBlock,
    HeaderBlock,
    QABlock
  },
  props: {
    block: Object
  }
};
</script>
