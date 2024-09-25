<template>
  <Button
    class="Menu-Item"
    :label="item.name"
    :color="item.color"
    :radius="item.radius"
    :href="item.href"
    :selected="selected"
  />
</template>

<script>
import Button from '@/components/Button.vue';

export default {
  name: 'Menu',
  components: {
    Button
  },

  props: {
    item: Object,
    selected: Boolean
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/common.scss';

.Menu-Item {
}
</style>
