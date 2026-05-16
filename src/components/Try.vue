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
      <Form>
        <div class="Try-Header" data-mode="compact">
          <Localized :text="font.name" />
        </div>
        <Fieldset>
          <Row>
            <Field>
              <Select :options="fontOptions" size="S" v-model="currentFont" />
            </Field>
            <Field>
              <Selector :options="weights" size="S" v-model="fontWeight" v-if="weights.length > 1" />
            </Field>
          </Row>
        </Fieldset>
        <Fieldset>
          <Field size="S" label="Font size" direction="row">
            <Slider
              :min="FONT_SIZE_MIN"
              :max="FONT_SIZE_MAX"
              :step="FONT_SIZE_STEP"
              size="S"
              v-model="fontSize"
            />
            <Input type="number" v-model="fontSize" />
          </Field>
          <Field size="S" label="Line height" direction="row">
            <Slider
              :min="LINE_HEIGHT_MIN"
              :max="LINE_HEIGHT_MAX"
              :step="LINE_HEIGHT_STEP"
              :disabled="lockRatio ? 'disabled' : undefined"
              size="S"
              v-model="lineHeight"
            />
            <Input
              type="number"
              v-model="lineHeight"
              :disabled="lockRatio ? 'disabled' : undefined"
            />
          </Field>
          <Field size="S" label="Tracking" direction="row">
            <Slider
              :min="TRACKING_MIN"
              :max="TRACKING_MAX"
              step="0.1"
              size="S"
              v-model="letterSpacing"
            />
            <Input type="number" v-model="letterSpacing" />
          </Field>
          <Field size="S" label="Cols" direction="row">
            <Slider
              :min="COLS_MIN"
              :max="COLS_MAX"
              step="1"
              size="S"
              v-model="columns"
            />
            <Input type="number" v-model="columns" />
          </Field>
          <Field>
            <Toggle label="Lock LH/FS ratio" size="S" v-model="lockRatio" />
          </Field>
        </Fieldset>
        <Fieldset>
          <Row>
            <Field size="S" label="Color" direction="row">
              <Select :options="COLOR_OPTIONS" size="S" position="top" v-model="color" />
            </Field>
            <Field size="S" label="Background" direction="row">
              <Select :options="COLOR_OPTIONS" size="S" position="top" v-model="backgroundColor" />
            </Field>
          </Row>
        </Fieldset>
        <Fieldset>
          <Row>
            <Field>
              <Selector :options="CASE_OPTIONS" size="S" v-model="textTransform" />
            </Field>
            <Field>
              <Selector :options="ALIGN_OPTIONS" size="S" v-model="textAlign" />
            </Field>
          </Row>
        </Fieldset>
        <Fieldset>
          <template v-for="(set, index) in sets">
            <Field>
              <Toggle :label="set.name" size="S" v-model="sets[index].on" />
            </Field>
          </template>
        </Fieldset>
      </Form>
    </div>
  </div>
</template>

<script>
import { watchEffect } from 'vue';

import Field from '@/components/Field.vue';
import Fieldset from '@/components/Fieldset.vue';
import Form from '@/components/Form.vue';
import Input from '@/components/Input.vue';
import Localized from '@/components/Localized.vue';
import Toggle from '@/components/Toggle.vue';
import Row from '@/components/Row.vue';
import Slider from '@/components/Slider.vue';
import Select from '@/components/Select.vue';
import Selector from '@/components/Selector.vue';

import text from '@/data/static.js';
import fonts from '@/data/fonts.js';

const DEFAULT_FONT_SIZE = 96;
const DEFAULT_LINE_HEIGHT = 72;
const DEFAULT_TRACKING = 0;
const DEFAULT_COLUMNS = 1;
const HIDE_TIMEOUT = 1000;

const SETTINGS = {
  FONT_SIZE_MIN: 8,
  FONT_SIZE_MAX: 320,
  FONT_SIZE_STEP: 4,
  LINE_HEIGHT_MIN: 8,
  LINE_HEIGHT_MAX: 320,
  LINE_HEIGHT_STEP: 4,
  TRACKING_MIN: -20,
  TRACKING_MAX: 40,
  COLS_MIN: 1,
  COLS_MAX: 12
};

const CASE_OPTIONS = [{
  name: 'Mix',
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
    Field,
    Fieldset,
    Form,
    Input,
    Localized,
    Toggle,
    Row,
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
    const sets = font.sets.map(set => ({
      ...set,
      on: features.includes(set.value)
    }));
    const fontOptions = fonts.map(font => ({
      name: font.name.en,
      value: font.id
    }));

    const initial = {
      fontWeight: q.fw || font.weights[0].value,
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
      fontOptions,
      currentFont: font.id,
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
      weights: font.weights,
      CASE_OPTIONS,
      ALIGN_OPTIONS,
      COLOR_OPTIONS,
      ...SETTINGS
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

      const reset = this.currentFont !== this.font.id;
      const path = `/try/${this.currentFont}`;
      const query = {
        fs: this.fontSize,
        lh: this.lineHeight,
        ls: this.letterSpacing,
        col: this.columns,
        tt: this.textTransform,
        ta: this.textAlign,
        fc: this.color,
        bg: this.backgroundColor
      };

      if (reset) {
        this.$router.replace({ path, query });
        this.$router.go();

        return;
      }

      const sets = this.sets.filter(set => set.on);
      const features = sets.map(set => set.value).join(',');

      query.fw = this.fontWeight;
      query.ff = features;

      this.$router.replace({ path, query });
    });
  },
  methods: {
    onMouseEnter () {
      window.clearTimeout(this.timer);
      this.open();
    },
    onMouseLeave () {
      this.timer = window.setTimeout(this.minimize, HIDE_TIMEOUT);
    },
    minimize () {
      this.mode = 'compact';
    },
    open () {
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
  min-height: calc(100vh - 2 * $microgrid);
  outline: none !important;
  background-color: $color-grey;
  padding: 0.15em 0;

  &:focus {
    background-color: $color-yellow;
  }
}

.Try-Controls {
  position: fixed;
  bottom: $microgrid;
  left: $microgrid;
  padding: $microgrid;
  overflow: auto;
  transition: all 0.25s ease-in-out;
  color: $color-black;
  background-color: $color-yellow;

  &[data-mode="normal"] {
    width: grid(20);
    max-height: grid(16);

    [data-mode="compact"] {
      display: none;
      overflow: hidden;
    }
  }

  &[data-mode="compact"] {
    height: 36px;
    width: grid(5);

    .Field {
      opacity: 0;
    }
  }
}

.Try-Title {
  @include Interface(Mobile);
}

.Try .Field {
  transition: all 0.25s ease-in-out;

  .Slide, .Select {
    flex: 1;
  }

  .Input {
    flex: 0 0 grid(3);
  }
}

.Try .Fieldset {
  gap: $microgrid;
}
</style>
