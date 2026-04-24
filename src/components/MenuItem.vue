<template>
  <Button
    class="Menu-Item"
    :label="item.name"
    :color="item.color"
    :radius="item.radius"
    :href="item.href"
    :selected="selected"
    @click.stop="onClick"
  />
</template>

<script>
import Button from '@/components/Button.vue';

export default {
  name: 'Menu',
  components: {
    Button
  },
  emits: ['click'],
  props: {
    item: Object,
    selected: Boolean
  },
  methods: {
    onClick () {
      this.$emit('click', this.item);
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/common.scss';

.Menu-Item {
}
</style>
