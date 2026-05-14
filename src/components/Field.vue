<template>
  <div class="Field" :data-direction="direction || 'column'">
    <div class="Field-Label" v-if="label"><Localized :text="label" /></div>
    <div class="Field-Content"><slot></slot></div>
  </div>
</template>

<script>
import Localized from '@/components/Localized.vue';

export default {
  name: 'Field',
  components: {
    Localized
  },
  props: {
    label: [Object, String],
    direction: String // column | row
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/common.scss';

.Field {
  display: flex;
  gap: $microgrid;
}

.Field[direction="column"] {
  flex-direction: column;
}

.Field-Label {
  flex: 0 0 grid(5);
  @include Interface(Mobile);
  padding: $microgrid 0;
  align-self: center;
}

.Field-Content {
  flex: 1;
  display: flex;
  gap: $microgrid;

  :deep(> *) {
    flex: 1;
  }
}
</style>
