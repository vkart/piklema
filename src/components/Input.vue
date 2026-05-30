<template>
  <div
    class="Input"
    :type="type"
    :data-icon="Boolean(icon)"
    :data-size="size || 'M'"
    :data-view="view || 'default'"
    :data-error="error ? error : undefined"
    :data-rows="rows || 1"
    :disabled="disabled ? disabled : undefined"
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
      <div class="Input-Placeholder" v-if="empty">
        <Localized :text="placeholder"/>
      </div>
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
import Localized from '@/components/Localized.vue';

export default {
  name: 'Input',
  components: {
    Button,
    Icon,
    Localized
  },
  props: {
    type: String,
    icon: String,
    iconLeft: String,
    disabled: Boolean,
    error: String,
    placeholder: [String, Object],
    modelValue: [Number, String],
    size: String, // L | M | S
    view: String, // default | borderless | border-bottom
    rows: [Number, String]
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
      const value = this.modelValue;

      if (value === undefined || value === null) return true;

      if (typeof value === 'string' && value.replace(/(\r\n|\n|\r)/gm, '') === '') return true;

      return false;
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
  --row-height: 28px;
  position: relative;
  background-color: $color-mustard;
  display: flex;
  min-height: calc(var(--row-height) * attr(data-rows number, 1));
}

.Input-Icon,
.Input-Note,
.Input-Button {
  display: none !important; /* NOT USED */
}

.Input-Wrapper {
  flex: 1;
  display: flex;
}

.Input-Input,
.Input-Placeholder {
  @include no-select;
  width: 100%;
  @include Interface;
  padding: 6px 0;
}

.Input-Input {
  color: $color-black;
  position: relative;
  outline: none;
  z-index: 2;
}

.Input-Placeholder {
  /* Standard input placeholder forces `line-height: normal` */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  color: $color-olive;
}

.Input[type="number"],
.Input[type="text"] {
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
