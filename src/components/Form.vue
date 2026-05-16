<template>
  <div class="Form"><slot></slot></div>
</template>

<script>
export default {
  name: 'Form'
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/common.scss';

.Form {
  display: flex;
  flex-direction: column;
  gap: $grid + $gutter;

  :deep(.Button) {
    flex: 0 0 auto;
    align-self: flex-start;
  }
}
</style>
