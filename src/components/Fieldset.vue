<template>
  <div class="Fieldset"><slot></slot></div>
</template>

<script>
export default {
  name: 'Fieldset'
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/common.scss';

.Fieldset {
  display: flex;
  flex-direction: column;
}
</style>
