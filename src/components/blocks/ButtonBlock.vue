<template>
  <Button
    :type="block.buttonType"
    :modifier="block.modifier"
    :size="block.size"
    :radius="block.radius"
    :color="block.color"
    :outline="block.outline"
    :label="block.label"
    :href="block.href"
  />
</template>

<script>
import Button from '@/components/Button.vue';

export default {
  name: 'ButtonBlock',
  props: {
    block: Object
  },
  components: {
    Button
  }
};
</script>
