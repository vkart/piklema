<template>
  <div class="Slider" :disabled="disabled ? 'disabled' : undefined">
    <slot />
    <VueSlider
      v-model="value"
      class="Slider-Bar"
      :min="Number(min)"
      :max="Number(max)"
      :interval="Number(step || DEFAULT_INTERVAL)"
      :disabled="disabled"
      tooltip="none"
      @change="onChange"
    />
  </div>
</template>

<script>
import { watchEffect } from 'vue';
import VueSlider from 'vue-slider-component';

const DEFAULT_INTERVAL = 1;

export default {
  name: 'Slider',
  components: {
    VueSlider
  },
  emits: [
    'update:modelValue'
  ],
  props: {
    min: [Number, String],
    max: [Number, String],
    step: [Number, String],
    disabled: Boolean,
    modelValue: Number
  },
  data () {
    return {
      value: this.modelValue,
      DEFAULT_INTERVAL
    };
  },
  methods: {
    onChange (value) {
      this.$emit('update:modelValue', value);
    }
  },
  mounted () {
    watchEffect(() => {
      this.value = this.modelValue;
    });
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/common.scss';

.Slider {
  width: 100%;
  height: 32px;
}

.Slider-Bar {
  flex: 1;
  height: 32px !important;
  padding: 0 8px !important;
  cursor: pointer;
  display: flex;
  align-items: center;

  :deep(.vue-slider) {
  }
  :deep(.vue-slider-rail) {
    height: 1px;
    background-color: $color-black;
  }
  :deep(.vue-slider-process) {
    background-color: $color-black;
    height: 1px;
  }
  :deep(.vue-slider-dot) {
    width: 16px !important;
    height: 32px !important;
    border-radius: $microgrid;
    background-color: $color-black;
  }

  &:hover {
    :deep(.vue-slider-process),
    :deep(.vue-slider-dot) {
      background-color: $color-pink;
    }
  }
}

.Slider[disabled] .Slider-Bar {
  &, &:hover {
    :deep(.vue-slider-rail) {
      background-color: $color-grey;
    }
    :deep(.vue-slider-process) {
      background-color: $color-grey;
    }
    :deep(.vue-slider-dot) {
      background-color: $color-grey;
      transition: none !important;
    }
  }
}
</style>
