<template>
  <div class="Block-Content">
    <Image :image="block" :fit="block.fit" :size="block.size" />
  </div>
</template>

<script>
import Image from '@/components/Image.vue';

export default {
  name: 'ImageBlock',
  components: {
    Image
  },

  props: {
    block: Object
  }
};
</script>
