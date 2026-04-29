<template>
  <div class="Selector">
    <template v-for="(option, i) in options">
      <Pill
        class="Selector-Option"
        :label="option.name"
        :size="size"
        :active="index === i ? true : undefined"
        @click="select(i)"
      />
    </template>
  </div>
</template>

<script>
import Pill from '@/components/Pill.vue';

export default {
  name: 'Selector',
  components: {
    Pill
  },
  props: {
    options: Array,
    size: String, // M | S
    modelValue: String
  },
  emits: ['update:modelValue'],
  data () {
    const index = this.getOptionIndex(this.modelValue) || 0;
    const option = this.options[index];

    return {
      index,
      option
    };
  },
  methods: {
    select (i) {
      const option = this.options[i];
      const value = option.value;

      this.index = i;
      this.option = option;

      this.$emit('update:modelValue', value, option);
    },
    getOptionIndex (name) {
      if (!name) return undefined;

      const index = this.options.findIndex(
        option => option.value === this.modelValue
      );

      return index < 0 ? undefined : index;
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/common.scss';

.Selector {
  display: flex;
  gap: $microgrid;
}
</style>
