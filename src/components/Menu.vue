<template>
  <div class="Menu">
    <div class="Menu-Container" data-device="desktop">
      <MenuItem
        v-for="item in menu"
        :key="item.id"
        :item="item"
        :selected="isSelected(item)"
        @click="onClick"
      />
      <Language v-if="language" />
    </div>
    <div class="Menu-Container" data-device="desktop" v-if="submenu">
      <MenuItem
        v-for="item in submenu"
        :key="item.id"
        :item="item"
        :selected="isSelected(item)"
        @click="onClick"
      />
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
    togglable: Boolean,
    language: Boolean
  },
  emits: ['click'],
  data () {
    const selected = this.menu.find(this.isSelected);

    return {
      submenu: null,
      selected
    };
  },
  methods: {
    onClick (item) {
      const isSubmenuOpen = this.submenu === item.items;

      this.submenu = null;

      if (item.href || isSubmenuOpen) return;

      if (item === this.selected && this.togglable) {
        item = null;
      } else if (item.items) {
        this.submenu = item.items;
      }

      this.select(item);

      this.$emit('click', item);
    },
    select (item) {
      this.selected = item;
    },
    isSelected (item) {
      return this.selected?.id
        ? item.id === this.selected.id
        : item.href === this.$route.path || item.location === this.$route.path;
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/common.scss';

.Menu {
  display: flex;
  flex-direction: column;
  gap: $microgrid;
}

.Menu-Container {
  display: flex;
  gap: $microgrid;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: flex-end;
}
</style>
