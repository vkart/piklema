<template>
  <footer class="Footer">
    <Button @click.prevent="scrollToTop" color="black">to the top</Button>
    <div class="Footer-Content" v-show="open">
      <div class="Footer-Copyright"><Localized :text="text.copyright" /></div>
      <Menu class="Footer-Menu" :menu="menu" />
      <Button type="Icon" icon="Close" @click.prevent="toggle" />
    </div>
    <Button @click.prevent="toggle" color="blue" v-show="!open">Footer</Button>
  </footer>
</template>

<script>
import menu from '@/data/footer-menu.js';
import text from '@/data/static.js';
import Button from '@/components/Button.vue';
import Localized from '@/components/Localized.vue';
import Menu from '@/components/Menu.vue';

export default {
  name: 'Footer',
  components: {
    Button,
    Localized,
    Menu
  },
  data () {
    return {
      open: false,
      menu,
      text
    };
  },
  methods: {
    toggle () {
      this.open = !this.open;
    },
    scrollToTop () {
      window.scrollTo(0, 0);
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/common.scss';

.Footer {
  display: flex;
  justify-content: flex-end;

  gap: $microgrid;
  padding-top: $microgrid;
}

.Footer-Content {
  display: flex;
  gap: $gutter;
}

.Footer-Copyright {
  @include Caption-Button;
  @include pad(9px, 7px);
  padding-left: 12px;
  padding-right: 12px;
  color: $color-black;
}
</style>
