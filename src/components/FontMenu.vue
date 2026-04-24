<template>
  <div class="FontMenu">
    <Button
      :label="font.id"
      :disabled="true"
      color="pink"
      radius="none"
    />
    <Button :href="font.specimen.href" hrefTarget="_blank">spec</Button>
    <Button>trial</Button>
    <Button>buy</Button>
  </div>
</template>

<script>
import Button from '@/components/Button.vue';

export default {
  name: 'FontMenu',
  components: {
    Button
  },
  props: {
    font: Object
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/common.scss';

.FontMenu {
  left: $gutter;
  right: $gutter;
  z-index: 10;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: $microgrid;
  padding-bottom: $microgrid;
}
</style>
