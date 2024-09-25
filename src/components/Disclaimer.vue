<template>
  <div class="Disclaimer">
    <Localized :text="text" />
  </div>
</template>

<script>
import Localized from '@/components/Localized.vue';

export default {
  name: 'Menu',
  components: {
    Localized
  },

  props: {
    text: [Object, String]
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/common.scss';

.Disclaimer {
  @include Caption-Interface;
  @include pad(1px, 3px);

  text-transform: uppercase;

  padding-left: $gutter;
  padding-right: $gutter;

  background-color: $color-yellow;
  color: $color-black;
}
</style>
