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
}
</style>
