<template>
  <div
    class="Field"
    :data-direction="direction || 'column'"
    :data-size="size || 'M'"
  >
    <div class="Field-Header" v-if="label || counter !== undefined">
      <div class="Field-Label"><Localized :text="label" /></div>
      <div class="Field-Counter" v-if="counter !== undefined">
        <Localized :text="units" />: {{counter}}
      </div>
    </div>
    <div class="Field-Content" v-if="$slots.default"><slot></slot></div>
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
    size: String, // S | M
    label: [Object, String],
    direction: String, // column | row
    counter: [Number, String],
    units: String
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/common.scss';

.Field {
  display: flex;
  gap: $microgrid;

  &[data-direction="column"] {
    flex-direction: column;
  }
}

.Field-Header {
  display: flex;

  :deep(> *) {
    flex: 1;
  }
}

.Field-Label {
  align-self: center;
}

.Field-Counter {
  align-self: center;
  text-align: right;
}

.Field-Content {
  flex: 1;
  display: flex;
  gap: $microgrid;

  :deep(> *) {
    flex: 1;
  }
}

.Field[data-size="M"] {
  padding-top: 12px;
  gap: 12px;

  .Field-Label,
  .Field-Counter {
    @include Interface();
    text-transform: uppercase;
    padding: 0;
  }
}

.Field[data-size="S"] {
  .Field-Label {
    @include Interface(Mobile);
    padding: $microgrid 0;
  }

  .Field-Counter {
    @include Interface(Mobile);
    padding: $microgrid 0;
  }
}
</style>
