<template>
  <div class="Try">
    <div class="Try-Edit" :style="style" contenteditable="true">
      {{text.try.sample}}
    </div>
    <div class="Try-Controls">
      <div class="Try-Fieldset">
        <div class="Try-Field">
          <div class="Try-Label"><Localized :text="font.name" /></div>
          <Selector :options="weights" size="S" v-model="fontWeight" />
        </div>
      </div>
      <div class="Try-Fieldset">
        <div class="Try-Field">
          <div class="Try-Label">Font size</div>
          <Slider
            :min="8"
            :max="240"
            :step="4"
            v-model="fontSize"
          />
          <Input type="number" v-model="fontSize" />
        </div>
        <div class="Try-Field">
          <div class="Try-Label">Line height</div>
          <Slider
            min="8"
            max="240"
            step="4"
            :disabled="lockRatio ? 'disabled' : undefined"
            v-model="lineHeight"
          />
          <Input
            type="number"
            v-model="lineHeight"
            :disabled="lockRatio ? 'disabled' : undefined"
          />
        </div>
        <div class="Try-Field">
          <div class="Try-Label">Tracking</div>
          <Slider
            min="-20"
            max="20"
            step="0.1"
            v-model="letterSpacing"
          />
          <Input type="number" v-model="letterSpacing" />
        </div>
        <div class="Try-Field">
          <div class="Try-Label">Cols</div>
          <Slider
            min="1"
            max="12"
            step="1"
            v-model="columns"
          />
          <Input type="number" v-model="columns" />
        </div>
        <div class="Try-Field">
          <Toggle label="Lock LH/FS ratio" size="S" v-model="lockRatio" />
        </div>
      </div>
      <div class="Try-Fieldset">
        <div class="Try-Row">
          <div class="Try-Field">
            <Selector :options="CASE_OPTIONS" size="S" v-model="textTransform" />
          </div>
          <div class="Try-Field">
            <Selector :options="ALIGN_OPTIONS" size="S" v-model="textAlign" />
          </div>
        </div>
      </div>
      <div class="Try-Fieldset">
        <template v-for="(set, index) in sets">
          <div class="Try-Field">
            <Toggle :label="set.name" size="S" v-model="sets[index].on" />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { watchEffect } from 'vue';

import Input from '@/components/Input.vue';
import Localized from '@/components/Localized.vue';
import Toggle from '@/components/Toggle.vue';
import Slider from '@/components/Slider.vue';
import Selector from '@/components/Selector.vue';

import text from '@/data/static.js';

const DEFAULT_FONT_SIZE = 96;
const DEFAULT_LINE_HEIGHT = 72;
const DEFAULT_TRACKING = 0;
const DEFAULT_COLUMNS = 1;

const CASE_OPTIONS = [{
  name: 'Norm',
  value: undefined
}, {
  name: 'CAPS',
  value: 'uppercase'
}, {
  name: 'low',
  value: 'lowercase'
}];

const ALIGN_OPTIONS = [{
  name: 'left',
  value: undefined
}, {
  name: 'center',
  value: 'center'
}, {
  name: 'right',
  value: 'right'
}];

export default {
  name: 'Try',
  components: {
    Input,
    Localized,
    Toggle,
    Slider,
    Selector
  },
  props: {
    font: Object
  },
  data () {
    const font = this.font;
    const q = this.$route.query;
    const features = q.ff.split(',');
    const sets = font.try.sets.map(set => ({
      ...set,
      on: features.includes(set.value)
    }));

    const initial = {
      fontWeight: q.fw || font.try.weights[0].value,
      fontSize: Number(q.fs) || DEFAULT_FONT_SIZE,
      lineHeight: Number(q.lh) || DEFAULT_LINE_HEIGHT,
      letterSpacing: Number(q.ls) || DEFAULT_TRACKING,
      columns: Number(q.col) || DEFAULT_COLUMNS,
      textTransform: q.tt || undefined,
      textAlign: q.ta || undefined,
      sets
    };

    return {
      text,
      fontFamily: `${font.try.family}`,
      fontWeight: initial.fontWeight,
      fontSize: initial.fontSize,
      lineHeight: initial.lineHeight,
      letterSpacing: initial.letterSpacing,
      columns: initial.columns,
      lockRatio: true,
      ratio: initial.lineHeight / initial.fontSize,
      textTransform: initial.textTransform,
      textAlign: initial.textAlign,
      sets: initial.sets,
      weights: font.try.weights,
      CASE_OPTIONS,
      ALIGN_OPTIONS
    };
  },
  computed: {
    style () {
      const sets = this.sets.filter(set => set.on);
      const features = sets.map(set => `'${set.value}' on`).join(' ');

      const style = {
        fontFamily: this.fontFamily,
        fontWeight: this.fontWeight,
        fontSize: `${this.fontSize}px`,
        lineHeight: `${this.lineHeight}px`,
        letterSpacing: `${this.letterSpacing / 100}em`,
        columnCount: this.columns,
        textTransform: this.textTransform,
        textAlign: this.textAlign,
        'font-feature-settings': features
      };

      return style;
    }
  },
  watch: {
    lockRatio (lock) {
      if (lock) {
        this.ratio = this.lineHeight / this.fontSize;
      }
    }
  },
  mounted () {
    watchEffect(() => {
      if (this.lockRatio) {
        this.lineHeight = Math.round(this.fontSize * this.ratio);
      }

      const sets = this.sets.filter(set => set.on);
      const features = sets.map(set => set.value).join(',');

      this.$router.push({
        path: `/try/${this.font.id}`,
        query: {
          fw: this.fontWeight,
          fs: this.fontSize,
          lh: this.lineHeight,
          ls: this.letterSpacing,
          col: this.columns,
          tt: this.textTransform,
          ta: this.textAlign,
          ff: features
        }
      });
    });
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/common.scss';

.Try {
}

.Try-Edit {
  min-height: calc(100vh - grid(3) * 2 - 4 * $microgrid);
  outline: none !important;
  background-color: $color-grey;

  &:focus {
    background-color: $color-yellow;
  }
}

.Try-Controls {
  position: fixed;
  bottom: $microgrid;
  left: $microgrid;
  padding: $microgrid;
  background-color: $color-yellow;
  width: grid(18);

  display: flex;
  flex-direction: column;
  gap: $grid + $gutter;
}

.Try-Fieldset {
  display: flex;
  flex-direction: column;
  gap: $microgrid;
}

.Try-Row {
  display: flex;
  gap: $grid;
}

.Try-Title {
  @include Interface(Mobile);
}

.Try-Label {
  flex: 0 0 grid(5);
  @include Interface(Mobile);
  padding: $microgrid 0;
  align-self: center;
}

.Try-Field {
  display: flex;
  gap: $microgrid;

  .Slide {
    flex: 1;
  }
  .Input {
    flex: 0 0 grid(3);
  }
}
</style>
