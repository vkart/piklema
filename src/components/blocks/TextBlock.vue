<template>
  <div
    class="Block-Content"
    :data-modifier="block.modifier"
    :data-mode="block.mode || 'body'"
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

<style scoped lang="scss">
@import '@/assets/scss/common.scss';

.Block-Content {
  :deep(em) {
    @include Em;
  }

  &[data-mode="credits"] {
    @include Interface;

    text-transform: uppercase;

    width: auto;
    padding: 6px 0;
    background-color: $color-grey;
  }

  &[data-mode="title"] {
    margin: auto;
    text-align: center;
    padding-top: 2 * $microgrid;
    @include Emphasis;
  }

  &[data-mode="tiny"] {
    @include Emphasis;
    @include fixed-width;
  }

  &[data-modifier="center"] {
    margin: auto;
  }
}

@include desktop {
  .Block-Content[data-mode="body"] {
    @include Body-1;
    @include fixed-width;
  }
}

@include mobile {
  .Block-Content[data-mode="body"] {
    @include Body-1(Mobile);
  }
}
</style>
