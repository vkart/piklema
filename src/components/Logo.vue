<template>
  <div class="Logo">
    <a href="/"><img src="@/assets/images/ptf-logo-72px.svg" width="292" height="72" alt="" /></a>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/common.scss';

.Logo {
  flex: 0 0 320px;
  mix-blend-mode: exclusion;
  position: fixed;
  top: $microgrid;
  left: $microgrid;
  z-index: 1000;
}
</style>
