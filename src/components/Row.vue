<template>
  <div class="Row"><slot></slot></div>
</template>

<script>
export default {
  name: 'Row'
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/common.scss';

.Row {
  display: flex;
  gap: $grid;

  :deep(> *) {
    flex: 1;
  }
}
</style>
