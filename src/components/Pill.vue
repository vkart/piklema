<template>
  <div
    class="Pill"
    :data-size="size || 'M'"
    :data-color="color"
    :data-active="active ? active : undefined"
    @click="onClick"
  >
    <div class="Pill-Label" v-text="label" v-if="label" />
  </div>
</template>

<script>
export default {
  name: 'Pill',
  props: {
    label: String,
    active: Boolean,
    color: String,
    size: String // S / M / L
  },
  methods: {
    onClick () {
      this.$emit('click');
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/common.scss';

.Pill {
  background-color: $color-yellow;
  box-shadow: inset 0 -2px 4px transparentize($color-black, 0.75);
  border-radius: $microgrid;
  cursor: pointer;

  &:not([data-active]):hover {
    box-shadow:
      inset 0 -2px 4px transparentize($color-black, 0.75),
      0px 2px 2px transparentize($color-black, 0.75);
  }

  &[data-active] {
    background-color: $color-black;
    color: $color-yellow;
  }
}

.Pill-Label {
  @include no-select;
}

.Pill[data-size="S"] {
  .Pill-Label {
    @include Interface(Mobile);
    padding: 4px 8px;
  }
}

.Pill[data-size="M"] {
  .Pill-Label {
    @include Interface;
    padding: 6px 8px;
  }
}

</style>
