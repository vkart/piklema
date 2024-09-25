<template>
  <div
    class="Block-Content"
    :data-modifier="block.modifier"
    :data-mode="block.mode"
  >
    <template v-if="block.href">
      <a :href="block.href" :target="block.target"><Localized :text="block.text" /></a>
    </template>
    <template v-else>
      <Localized :text="block.text" />
    </template>
  </div>
</template>

<script>
import Localized from '@/components/Localized.vue';

export default {
  name: 'TextBlock',
  components: {
    Localized
  },

  props: {
    block: Object
  }
};
</script>

<style>
.Block[data-type="Image"] + .Block[data-type="Text"] {
  margin-top: 20px;
}
</style>

<style scoped lang="scss">
@import '@/assets/scss/common.scss';

@include desktop {
  .Block-Content {
    @include Body-1;
    @include pad(7px, 13px);
  }
}

@include mobile {
  .Block-Content {
    @include Body-1(Mobile);
    @include pad(7px, 13px);
  }
}
</style>
