<template>
  <div
    class="Block-Content"
    :data-type="block.type"
    :data-modifier="block.modifier"
    :data-mode="block.mode"
  >
    <Image
      class="Block-Image"
      :image="block.image"
      :size="block.image.size"
      v-if="block.image"
    />
    <span class="Block-Author" :data-author-type="block.authorType">
      <Localized :text="block.author[block.authorType || 'full']" />
    </span>:
    <Localized :text="block.text" />
  </div>
</template>

<script>
import Image from '@/components/Image.vue';
import Localized from '@/components/Localized.vue';

export default {
  name: 'QABlock',
  components: {
    Image,
    Localized
  },

  props: {
    block: Object
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/common.scss';

.Block-Content[data-type="Question"] {
  @include Caption-Intro;
}

.Block-Author[data-author-type="full"] {
  text-decoration: underline;
}

@include desktop {
  .Block-Content {
    @include Body-2;
    @include pad(13px, 15px);
  }

  .Block-Image {
    position: absolute;
    left: 0;
    margin-top: 7px;

    &[data-size="intro-type-1"] {
      width: 72px;
      height: 72px;
    }
    &[data-size="intro-type-2"] {
      width: 72px;
      height: 100px;
    }
    &[data-size="intro-type-3"] {
      width: 100px;
      height: 72px;
    }
  }
}

@include mobile {
  .Block-Content {
    @include Body-2(Mobile);
    @include pad(13px, 15px);
  }

  .Block-Image {
    display: none;
  }
}
</style>
