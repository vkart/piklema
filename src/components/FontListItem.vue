<template>
  <div class="FontListItem">
    <a :href="`/fonts/${item.id}`">
      <Image class="FontListImtem-Teaser" :image="item.teaser"></Image>
    </a>
  </div>
</template>

<script>
import Image from '@/components/Image.vue';

export default {
  name: 'FontListItem',
  components: {
    Image
  },

  props: {
    item: Object
  }
};
</script>
