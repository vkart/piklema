<template>
  <header class="Header">
    <div class="Header-Row">
      <div class="Header-Logo">
        <a href="/"><img src="@/assets/images/ptf-logo-80px.svg" width="235" height="80" alt="" /></a>
      </div>
      <div class="Header-Col">
        <Menu
          :menu="menu"
          :language="true"
          v-if="!$isMobile()"
          v-show="!compact || menuOpen"
        />
        <Button
          type="icon"
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
      return this.$isMobile() || store.menuMode === 'compact';
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
  padding-bottom: $gutter;
  z-index: 10;
}

.Header-Row {
  display: flex;
  gap: $gutter;
}

.Header-Logo {
  flex: 0 0 320px;
}

.Header-Col {
  flex: 1;
  display: flex;
  gap: $gutter;
  align-items: flex-end;
  justify-content: flex-end;
}

.Header-Menu {
  flex: 1;
  align-items: flex-end;
  justify-content: flex-end;
  display: flex;
  gap: $gutter;
}
</style>
