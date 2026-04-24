<template>
  <div
    class="Block-Content"
    :data-type="block.type"
    :data-modifier="block.modifier"
    :data-mode="block.mode"
  >
    <Image
      class="Block-Image"
      :image="block.author.avatar"
      v-if="block.authorType === 'full'"
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
  @include Body-2;
}

.Block-Content[data-type="Answer"] {
  @include Body-1;
}

.Block-Author[data-author-type="full"] {
  text-decoration: underline;
}

@include desktop {
  .Block-Image {
    position: absolute;
    left: 0;
    margin-top: 7px;
    width: 72px;
    height: 72px;
    display: none;
  }

  .Block-Content {
    width: grid(34);
    margin: 0 auto;
  }

  .Block-Content:hover {
    .Block-Image {
      display: block;
    }
    .Block-Author[data-author-type="full"] {
      color: $color-red;
      text-decoration: none;
    }
  }
}

@include mobile {
  .Block-Image {
    display: none;
  }
}
</style>
