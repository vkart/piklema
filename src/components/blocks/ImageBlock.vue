<template>
  <div
    class="Block-Content"
    @click.stop="onClick"
    :data-fullscreen="block.full ? block.full : undefined"
  >
    <Image
      :image="block"
      :fit="block.fit"
      :size="block.size"
      :orientation="block.orientation"
      :ratio="block.ratio"
    />
    <div class="Block-Caption" v-if="block.caption"><Localized :text="block.caption" /></div>
  </div>
</template>

<script>
import Image from '@/components/Image.vue';
import Localized from '@/components/Localized.vue';

export default {
  name: 'ImageBlock',
  components: {
    Image,
    Localized
  },
  emits: ['fullscreen'],
  props: {
    block: Object
  },
  methods: {
    onClick () {
      const full = this.block.full;

      const event = new CustomEvent('slideshow', {
        detail: { src: full },
        bubbles: true
      });

      this.$el.dispatchEvent(event);
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/common.scss';

.Block-Content[data-fullscreen] {
  &:hover {
    outline: $microgrid solid $color-yellow;
    cursor: pointer;
  }
}

.Block-Caption {
  @include Caption;

  margin-top: $microgrid;
}
</style>
