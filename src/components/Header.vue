<template>
  <header class="Header" :data-mode="store.mode">
    <div class="Header-Row">
      <div class="Header-Logo" />
      <div class="Header-Col">
        <Menu
          :menu="menu"
          :language="true"
          v-if="!$isMobile()"
          v-show="!compact || menuOpen"
        />
        <Button
          type="Icon"
          :icon="menuOpen ? 'Close' : 'Menu'"
          @click.stop="toggleMenu"
          v-if="compact"
        />
      </div>
    </div>
    <div class="Header-Row" v-show="menuOpen">
      <div class="Header-Col">
        <Menu :menu="menu" :language="true" v-if="$isMobile()" />
      </div>
    </div>
  </header>
</template>

<script>
import menu from '@/data/header-menu.js';
import Button from '@/components/Button.vue';
import Menu from '@/components/Menu.vue';

import { store } from '@/store/store';

export default {
  name: 'Header',
  components: {
    Button,
    Menu
  },
  data () {
    return {
      menuOpen: false,
      menu,
      store
    };
  },
  computed: {
    compact () {
      return this.$isMobile() ||
        store.menuMode === 'compact' ||
        store.mode === 'minimal';
    }
  },
  methods: {
    toggleMenu () {
      this.menuOpen = !this.menuOpen;
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/common.scss';

.Header {
  position: relative;
  padding-bottom: $microgrid;
  z-index: 10;
}

.Header[data-mode="minimal"] {
  position: fixed;
  right: $microgrid;
}

.Header-Row {
  display: flex;
  gap: $gutter;
}

.Header-Logo {
  flex: 0 0 240px;
  mix-blend-mode: exclusion;
  position: fixed;
  z-index: auto;
  opacity: 0;
}

.Header-Col {
  flex: 1;
  display: flex;
  gap: $microgrid;
  align-items: flex-start;
  justify-content: flex-end;
}

.Header-Menu {
  flex: 1;
  align-items: flex-end;
  justify-content: flex-end;
  display: flex;
  gap: $microgrid;
}
</style>
