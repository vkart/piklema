<template>
  <div class="Block-Content" :data-modifier="modifier || block.modifier">
    <a :name="block.anchor" v-if="block.anchor"></a>
    <Localized :text="block.title" />
  </div>
</template>

<script>
import Localized from '@/components/Localized.vue';

export default {
  name: 'HeaderBlock',
  components: {
    Localized
  },

  props: {
    block: Object,
    modifier: String
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/common.scss';

.Block-Content {
  position: relative;
}
</style>
