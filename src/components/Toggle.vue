<template>
  <div
    class="Toggle"
    :data-checked="_checked ? true : undefined"
    :data-modifier="modifier ? modifier : undefined"
    :data-size="size ? size : undefined"
    @click.stop="toggle"
  >
    <div class="Toggle-Toggle" />
    <div class="Toggle-Label">
      {{ label }}
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Toggle',
  components: {
  },
  props: {
    label: String,
    modifier: String,
    size: String, // S | M
    modelValue: Boolean
  },
  emits: ['update:modelValue'],
  data () {
    return {
      _checked: this.modelValue || false
    };
  },
  methods: {
    toggle () {
      this._checked = !this._checked;

      this.$emit('update:modelValue', this._checked);
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/common.scss';

.Toggle {
  display: flex;
  gap: $microgrid;
}

.Toggle-Toggle {
  display: inline-block;
  width: 28px;
  height: 28px;
  border-radius: $microgrid;
  background-color: $color-yellow;
  box-shadow: inset 0 -2px 4px transparentize($color-black, 0.75);
}

.Toggle-Label {
  @include no-select;
  @include Interface;
  padding: 6px 0;
}

.Toggle[data-checked] {
  .Toggle-Toggle {
    background-color: $color-black;
  }
}

.Toggle[data-size="S"] {
  .Toggle-Toggle {
    width: 20px;
    height: 20px;
    border-radius: $microgrid;
  }
  .Toggle-Label {
    @include Interface(Mobile);
    padding: 4px 0;
  }
}
</style>
