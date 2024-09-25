<template>
  <div class="Block-Content" :data-collapsed="!expanded">
    <div class="Block-Header" @click="toggle">
      <div class="Block-Title">
        <Localized :text="block.title" />
      </div>
    </div>

    <div class="Block-Text" >
      <Localized :text="block.text" />
    </div>
  </div>
</template>

<script>
import Localized from '@/components/Localized.vue';

export default {
  name: 'CollapsibleBlock',
  components: {
    Localized
  },

  props: {
    block: Object
  },

  data () {
    const collapsed = this.block.collapsed !== undefined
      ? this.block.collapsed
      : false;

    return {
      expanded: !collapsed
    };
  },

  methods: {
    toggle () {
      this.expanded = !this.expanded;
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/common.scss';

.Block-Content {
  display: flex;
  flex-direction: column;
}

.Block-Header {
  flex: 1;
  user-select: none;
}

.Block-Title {
  color: $color-pink;
  cursor: pointer;

  &:after {
  }
}

.Block-Text {
  flex: 1;
}

.Block-Content[data-collapsed="true"] {
  .Block-Text {
    display: none;
  }

  .Block-Title {
    color: $color-blue;
    cursor: pointer;

    &:after {
    }
  }
}
</style>
