<template>
  <button
    class="Button"
    :data-type="type"
    :data-modifier="modifier"
    :data-size="size"
    :data-radius="radius"
    :data-color="color"
    :data-outline="outline"
    :data-selected="selected ? true : undefined"
    :data-href="href"
    @click="handleClick"
  >
    <Icon :name="icon" v-if="icon" />
    <Localized :text="label" v-if="label" />
    <slot></slot>
  </button>
</template>

<script>
import Icon from '@/components/Icon.vue';
import Localized from '@/components/Localized.vue';

export default {
  name: 'Button',
  components: {
    Icon,
    Localized
  },
  props: {
    label: [Object, String],
    modifier: String, // not used
    size: String, // not used
    radius: String, // none / semi / round (default)
    color: String, // grey (default) / blue / pink / black
    outline: String, // yellow / green
    icon: String,
    scrollTo: String,
    href: String,
    hrefTarget: String,
    selected: Boolean,
    type: String
  },
  methods: {
    handleClick (ev) {
      const { href, hrefTarget, scrollTo } = this;

      console.log('HANDLE CLICK', href, hrefTarget);

      if (href) {
        if (hrefTarget) {
          window.open(href, hrefTarget);
        } else {
          window.location.href = href;
        }

        return true;
      }

      if (!scrollTo) {
        return;
      }

      const target = document.querySelector(scrollTo);

      if (!target) {
        return;
      }

      target.scrollIntoView({ behavior: 'smooth' });
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/common.scss';

.Button {
  background-color: $color-grey;
  color: $color-black;
  cursor: pointer;

  border: none !important;
  outline: none !important;

  @include Caption-Button;
  @include pad(2px, 6px);
  padding-left: 14px;
  padding-right: 14px;
  border-radius: 30px;

  box-shadow: inset 0 4px 4px transparentize($color-black, 0.75);

  &:not([disabled]):hover {
    box-shadow: inset 0 8px 8px transparentize($color-black, 0.75);
  }

  &:active,
  &[disabled] {
    box-shadow: none;
  }

  &[disabled] {
    cursor: default;
  }
}

.Button[data-type="icon"] {
  padding: 24px 12px;
}

.Button[data-color="blue"] {
  background-color: $color-blue;
  color: $color-grey;
}

.Button[data-color="pink"] {
  background-color: $color-pink;
  color: $color-red;
}

.Button[data-color="black"] {
  background-color: $color-black;
  color: $color-blue;
}

.Button[data-radius="none"] {
  border-radius: 0;
}

.Button[data-radius="semi"] {
  border-radius: 30px;
}

.Button[data-radius="round"] {
  border-radius: 55px;
}

.Button[data-selected] {
  outline: $color-yellow 4px solid !important;
  box-shadow: none;

  &[data-outline="green"] {
    outline-color: $color-green !important;
  }
}
</style>
