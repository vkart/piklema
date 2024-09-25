<template>
  <div class="Icon" :tooltip="name">
    <component :is="ref" />
  </div>
</template>

<script>
import icons from '@/components/icons/Icons.vue';

// TODO: Add general icons list, then <use :xlink:href="#name"/>

export default {
  name: 'Icon',
  components: {
    ...icons
  },
  props: {
    name: String
  },
  computed: {
    ref () {
      return `icon${this.name}`;
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/common.scss';

.Icon {
  display: flex;
}
</style>
