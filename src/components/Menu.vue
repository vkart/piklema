<template>
  <div class="Menu">
    <div class="Menu-Container" data-device="desktop">
      <MenuItem
        v-for="item in menu"
        :key="item.id"
        :item="item"
        :selected="item.href === $route.path"
      />
      <Language v-if="language" />
    </div>
  </div>
</template>

<script>
import Language from '@/components/Language.vue';
import MenuItem from '@/components/MenuItem.vue';

export default {
  name: 'Menu',
  components: {
    Language,
    MenuItem
  },
  props: {
    menu: Array,
    language: Boolean
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/common.scss';

.Menu-Container {
  display: flex;
  gap: $gutter;
  align-items: flex-end;
  justify-content: flex-end;
}

@include mobile {
  .Menu-Container {
    flex-wrap: wrap;
  }
}
</style>
