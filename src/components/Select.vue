<template>
  <div class="Select"
    :data-size="size || 'M'"
    :data-position="position || 'bottom'"
    @click="toggleModal"
    v-click-outside="hideModal"
  >
    <div class="Select-Label" v-text="option.name" />
    <Icon class="Select-Icon" name="ChevronDown" />
    <div class="Select-Modal" v-show="modal">
      <div class="Select-Options">
        <template v-for="(option, i) in options">
          <div
            class="Select-Option"
            v-text="option.name"
            :data-selected="index === i ? true : undefined"
            @click.stop="select(i)"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { clickOutside } from '@/directives/clickOutside';

import Icon from '@/components/Icon.vue';

export default {
  name: 'Select',
  directives: {
    clickOutside
  },
  components: {
    Icon
  },
  props: {
    options: Array,
    size: String, // M | S
    position: String, // top | bottom
    modelValue: String
  },
  emits: ['change', 'update:modelValue'],
  data () {
    const index = this.getOptionIndex(this.modelValue) || 0;
    const option = this.options[index];

    return {
      modal: false,
      index,
      option
    };
  },
  methods: {
    select (i) {
      const option = this.options[i];
      const value = option.value;

      this.index = i;
      this.option = option;

      this.$emit('update:modelValue', value, option);
      this.$emit('change', value, option);

      this.toggleModal();
    },
    getOptionIndex (name) {
      if (!name) return undefined;

      const index = this.options.findIndex(
        option => option.value === this.modelValue
      );

      return index < 0 ? undefined : index;
    },
    hideModal () {
      this.modal = false;
    },
    toggleModal () {
      this.modal = !this.modal;
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/common.scss';

.Select {
  background-color: $color-mustard;
  display: flex;
  position: relative;
}

.Select-Icon {
  pointer-events: none;
}

.Select[disabled] {
  .Select-Label {
    color: $color-grey;
  }
}

.Select-Modal {
  position: absolute;
  min-width: 100%;
  background-color: $color-mustard;
  z-index: 100;
}

.Select-Label {
  flex: 1;
  @include no-select;
  color: $color-black;
  outline: none;
}

.Select-Option {
  @include no-select;
  color: $color-black;
  outline: none;

  &:hover {
    background-color: $color-olive;
  }
}

.Select[data-size="M"] {
  padding-right: 6px;

  .Select-Icon {
    flex: 0 0 28px;
  }

  &[data-position="top"] {
    .Select-Modal {
      bottom: 28px;
    }
  }

  &[data-position="bottom"] {
    .Select-Modal {
      top: 28px;
    }
  }

  .Select-Label {
    @include Interface;
    padding: 6px 12px 6px 6px;
  }

  .Select-Option {
    @include Interface;
    padding: 6px 12px;
  }
}

.Select[data-size="S"] {
  padding-right: 4px;

  .Select-Icon {
    flex: 0 0 20px;
    height: 20px;
  }

  &[data-position="top"] {
    .Select-Modal {
      bottom: 20px;
    }
  }

  &[data-position="bottom"] {
    .Select-Modal {
      top: 20px;
    }
  }

  .Select-Label {
    @include Interface(Mobile);
    padding: 4px 8px;
  }

  .Select-Option {
    @include Interface(Mobile);
    padding: 4px 8px;
  }
}
</style>
