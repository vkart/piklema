<template>
  <div class="Overlay"><slot></slot></div>
</template>

<script>
export default {
  name: 'Overlay'
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/common.scss';

.Overlay {
  z-index: 10000;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: transparentize($color-black, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;

  :deep(> *) {
    margin: auto;
  }
}
</style>
