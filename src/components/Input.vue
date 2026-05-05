<template>
  <div
    class="Input"
    :type="type"
    :data-icon="Boolean(icon)"
    :data-size="size || 'M'"
    :data-view="view || 'default'"
    :data-error="error ? error : undefined"
  >
    <div class="Input-Icon" v-if="iconLeft">
      <Icon class="Icon" :name="iconLeft" />
    </div>
    <div class="Input-Wrapper">
      <div
        class="Input-Input"
        :type="type"
        ref="input"
        contenteditable
        @input="onInput"
        v-text="modelValue"
      />
      <div class="Input-Placeholder" v-text="placeholder" v-if="empty" />
    </div>
    <div class="Input-Note" v-if="note" v-text="note" />
    <div class="Input-Icon" v-if="icon">
      <Icon class="Icon" :name="icon" />
    </div>
    <Button
      class="Input-Button"
      type="icon"
      icon="Close"
      @click.stop="clear"
      v-if="type === 'search'"
    />
  </div>
</template>

<script>
import { saveCaretPosition, restoreCaretPosition } from '@/lib/browserUtils.js';
import Button from '@/components/Button.vue';
import Icon from '@/components/Icon.vue';

export default {
  name: 'Input',
  components: {
    Button,
    Icon
  },
  props: {
    type: String,
    icon: String,
    iconLeft: String,
    error: String,
    placeholder: String,
    modelValue: [Number, String],
    size: String, // L | M | S
    view: String // default | borderless | border-bottom
  },
  emits: ['update:modelValue'],
  data () {
    return {
      caret: undefined,
      note: this.error
    };
  },
  computed: {
    empty () {
      return this.modelValue === undefined || this.modelValue === null;
    }
  },
  methods: {
    onInput () {
      const text = this.$refs.input.innerText;
      const value = this.type === 'number' ? Number(text) : text;

      this.$emit('update:modelValue', value);
    },
    focus () {
      this.$refs.input.focus();
    },
    blur () {
      this.$refs.input.blur();
    },
    clear () {
      this.$refs.input.innerText = '';
      this.focus();
    }
  },
  beforeUpdate () {
    saveCaretPosition(this);
  },
  updated () {
    restoreCaretPosition(this, this.$refs.input);
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/common.scss';

.Input {
  background-color: $color-mustard;
  display: flex;
}

.Input-Icon,
.Input-Note,
.Input-Button {
  display: none !important; /* NOT USED */
}

.Input-Wrapper {
  flex: 1;
}

.Input-Input,
.Input-Placeholder {
  @include no-select;
  @include Interface;
  padding: 6px 0;
  color: $color-black;
  outline: none;
  white-space: nowrap;
}

.Input-Input:focus {
  color: $color-pink;
}

.Input[type="number"] {
  .Input-Input,
  .Input-Placeholder {
    text-align: right;
  }
}

.Input[disabled] {
  .Input-Input,
  .Input-Placeholder {
    color: $color-grey;
  }
}
</style>

