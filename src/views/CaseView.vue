<template>
  <main class="Case">
    <Menu :menu="items" :togglable="true" @click="setItem" />
    <Page :content="item ? item.content : defaultContent" />
  </main>
</template>

<script>
import { shuffle } from '@/lib/utils.js';
import Menu from '@/components/Menu.vue';
import Page from '@/components/Page.vue';

import items from '@/data/cases.js';
import { store } from '@/store/store.js';

export default {
  name: 'CaseView',
  components: {
    Menu,
    Page
  },
  props: {
    id: String
  },
  data () {
    const defaultContent = this.buildDefaultContent(items);

    return {
      defaultContent,
      item: null,
      items
    };
  },
  beforeRouteEnter (to, from, next) {
    const id = to.params.id;
    const item = items.find(el => el.id === id);

    next(vm => vm.setItem(item || null));
  },
  beforeRouterLeave () {
    store.removePageName(undefined);
  },
  computed: {
    content () {
      return this.item ? this.item.content : this.defaultContent;
    }
  },
  methods: {
    setItem (item) {
      const update = item !== this.item;

      this.item = update ? item : null;
      store.setPageName(item ? item.id : 'Services');

      const route = this.item ? `/cases/${this.item.id}` : '/cases';

      this.$router.push(route);
    },
    buildDefaultContent (items) {
      const images = items.map(item => {
        if (!item.content) return [];

        const grid = item.content.find(el => el.type === 'Grid');

        if (!grid) return [];

        return grid.items;
      });

      const shuffled = images.flat(1);

      shuffle(shuffled);

      return [{
        type: 'Grid',
        items: shuffled
      }];
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
