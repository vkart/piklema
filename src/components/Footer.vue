<template>
  <footer class="Footer">
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
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/common.scss';

.Footer {
  padding: $gutter;
  display: flex;
  justify-content: flex-end;
}

.Footer-Content {
  display: flex;
  gap: $gutter;
}

.Footer-Copyright {
  @include Caption-Button;
  @include pad(2px, 6px);
  padding-left: 14px;
  padding-right: 14px;
  background-color: $color-black;
  color: $color-grey;
}
</style>
