<template>
  <button
    class="Button"
    :data-type="type || 'Text'"
    :data-modifier="modifier"
    :data-size="size || 'medium'"
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
    size: String, // small / medium
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

  border-radius: 28px;
  box-shadow: inset 0 -4px 4px transparentize($color-black, 0.75);

  &:not([disabled]):hover {
    box-shadow: inset 0 -4px 4px transparentize($color-black, 0.75),
      0 4px 4px transparentize($color-black, 0.25);
  }

  &:active,
  &[disabled] {
    box-shadow: none;
  }

  &[disabled] {
    cursor: default;
  }
}

.Button[data-type="Text"] {
  @include Caption-Button;

  &[data-size="medium"] {
    @include pad(9px, 7px);
    padding-left: 12px;
    padding-right: 12px;
  }

  &[data-size="small"] {
    @include pad(0px, 0px);
  }
}

.Button[data-type="Icon"] {
  &[data-size="medium"] {
    padding: 24px 12px 20px 12px;
  }

  &[data-size="small"] {
    padding: 16px 12px 12px 12px;
  }
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
  color: $color-grey;

  &[disabled] {
    background-color: $color-grey;
  }
}

.Button[data-color="black+yellow"] {
  background-color: $color-black;
  color: $color-yellow;

  &[disabled] {
    background-color: $color-grey;
  }
}

.Button[data-color="green"] {
  background-color: $color-green;
  color: $color-black;
}

.Button[data-radius="none"] {
  border-radius: 0;
}

.Button[data-radius="semi"] {
  border-radius: 28px;
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
