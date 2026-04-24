<template>
  <main class="Case" v-if="item">
    <Image class="Case-Hero" :image="item.heroImage" />
    <Menu :menu="items" @click="setItem" />
    <Page :content="item.content" />
  </main>
</template>

<script>
import Image from '@/components/Image.vue';
import Menu from '@/components/Menu.vue';
import Page from '@/components/Page.vue';

import items from '@/data/cases.js';
import { store } from '@/store/store.js';

export default {
  name: 'CaseView',
  components: {
    Image,
    Menu,
    Page
  },
  props: {
    id: String
  },
  data () {
    return {
      item: null,
      items
    };
  },
  beforeRouteEnter (to, from, next) {
    const id = to.params.id;
    const item = items.find(el => el.id === id);

    next(vm => vm.setItem(item || items[0]));
  },
  beforeRouterLeave () {
    store.removePageName(undefined);
  },
  methods: {
    setItem (item) {
      const update = !this.item;
      this.item = item;
      store.setPageName(item.id);

      const route = `/cases/${item.id}`;

      if (update) {
        this.$router.push(route);
      } else {
        history.pushState({}, null, route);
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/common.scss';

.Case-Hero {
  width: 100%;
  max-width: 1920px;
  margin-bottom: $microgrid;
}
</style>
