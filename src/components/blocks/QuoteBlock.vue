<template>
  <div
    class="Block-Content"
    :data-type="block.type"
    :data-modifier="block.modifier"
    :data-mode="block.mode"
  >
    <span class="Block-Author">
      <Localized :text="block.author.full" />
    </span>:
    <Localized :text="block.text" />
  </div>
</template>

<script>
import Localized from '@/components/Localized.vue';

export default {
  name: 'QuoteBlock',
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
  color: $color-blue;
  margin: auto;
}

.Block-Author {
  text-decoration: underline;
  text-decoration-style: dotted;
  text-decoration-skip-ink: none;
}

@include desktop {
  .Block-Content {
    @include Body-1;
    @include pad(13px, 15px);
    @include fixed-width;
  }
}

@include mobile {
  .Block-Content {
    @include Body-1(Mobile);
    @include pad(13px, 15px);
  }
}
</style>
