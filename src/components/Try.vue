<template>
  <div class="Try">
    <div class="Try-Edit" :style="style" contenteditable="true">
      {{text.try.sample}}
    </div>
    <div
      class="Try-Controls"
      :data-mode="mode"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
      <div class="Try-Form">
        <div class="Try-Fieldset">
          <div class="Try-Header" data-mode="compact"><Localized :text="font.name" /></div>
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
              <div class="Try-Label">Color</div>
              <Select :options="COLOR_OPTIONS" size="S" v-model="color" />
            </div>
            <div class="Try-Field">
              <div class="Try-Label">Background</div>
              <Select :options="COLOR_OPTIONS" size="S" v-model="backgroundColor" />
            </div>
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
  </div>
</template>

<script>
import { watchEffect } from 'vue';

import Input from '@/components/Input.vue';
import Localized from '@/components/Localized.vue';
import Toggle from '@/components/Toggle.vue';
import Slider from '@/components/Slider.vue';
import Select from '@/components/Select.vue';
import Selector from '@/components/Selector.vue';

import text from '@/data/static.js';

const DEFAULT_FONT_SIZE = 96;
const DEFAULT_LINE_HEIGHT = 72;
const DEFAULT_TRACKING = 0;
const DEFAULT_COLUMNS = 1;
const HIDE_TIMEOUT = 1000;

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

const COLOR_OPTIONS = [
  { name: 'none', value: undefined },
  { name: 'black', value: '#000000' },
  { name: 'white', value: '#FFFFFF' },
  { name: 'grey', value: '#C4C4C4' },
  { name: 'yellow', value: '#FAFF00' },
  { name: 'mustard', value: '#E6EA05' },
  { name: 'olive', value: '#969900' },
  { name: 'pink', value: '#FF00F5' },
  { name: 'green', value: '#00FF00' },
  { name: 'blue', value: '#000AFF' }
];

export default {
  name: 'Try',
  components: {
    Input,
    Localized,
    Toggle,
    Slider,
    Select,
    Selector
  },
  props: {
    font: Object
  },
  data () {
    const font = this.font;
    const q = this.$route.query;
    const features = q.ff ? q.ff.split(',') : [];
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
      color: q.fc || undefined,
      backgroundColor: q.bg || undefined,
      sets
    };

    return {
      mode: 'normal',
      timer: undefined,
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
      color: initial.color,
      backgroundColor: initial.backgroundColor,
      sets: initial.sets,
      weights: font.try.weights,
      CASE_OPTIONS,
      ALIGN_OPTIONS,
      COLOR_OPTIONS
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
        color: this.color,
        backgroundColor: this.backgroundColor,
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
          fc: this.color,
          bg: this.backgroundColor,
          ff: features
        }
      });
    });
  },
  methods: {
    onMouseEnter () {
      console.log('ENTER');
      window.clearTimeout(this.timer);
      this.open();
    },
    onMouseLeave () {
      console.log('LEAVE');
      this.timer = window.setTimeout(this.minimize, HIDE_TIMEOUT);
    },
    minimize () {
      console.log('MIN');
      this.mode = 'compact';
    },
    open () {
      console.log('OPEN');
      this.mode = 'normal';
    }
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
  overflow: hidden;
  transition: all 0.25s ease-in-out;
  color: $color-black;
  background-color: $color-yellow;

  &[data-mode="normal"] {
    width: grid(20);
    height: grid(16);

    [data-mode="compact"] {
      display: none;
    }
  }

  &[data-mode="compact"] {
    height: 36px;
    width: grid(5);

    .Try-Field {
      opacity: 0;
    }
  }
}

.Try-Form {
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

  .Try-Field {
    flex: 1;
  }
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
  transition: all 0.25s ease-in-out;

  .Slide, .Select {
    flex: 1;
  }
  .Input {
    flex: 0 0 grid(3);
  }
}
</style>
