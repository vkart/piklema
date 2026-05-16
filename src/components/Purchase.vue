<template>
  <div class="Purchase" v-click-outside="close">
    <Form>
      <Fieldset>
        <Field>
          <Row>
            <template v-for="(weight, index) in weights">
              <Toggle :label="weight.name" v-model="weights[index].checked"/>
            </template>
          </Row>
        </Field>
      </Fieldset>
      {{count}} — {{price}}
      <Fieldset>
        <Field label="Desktop license" :counter="desktopCount" units="users">
          <Slider
            :min="DESKTOP_MIN"
            :max="DESKTOP_MAX"
            :step="DESKTOP_STEP"
            v-model="desktopCount"
          />
        </Field>
        <Field label="Web license" :counter="webCount" units="views/month">
          <Slider
            :min="WEB_MIN"
            :max="WEB_MAX"
            :step="WEB_STEP"
            v-model="webCount"
          />
        </Field>
        <Field label="" units="TOTAL" :counter="`\$${price}`"/>
        <Field>
          <Input type="textarea" v-model="comment" :placeholder="text.comment" rows="2" />
        </Field>
      </Fieldset>
      <Fieldset>
        <Row>
          <Field>
            <Input type="text" v-model="name" :placeholder="text.name" />
          </Field>
          <Field>
            <Input type="text" v-model="email" :placeholder="text.email" />
          </Field>
        </Row>
        <Field>
          <Toggle :label="text.agree" v-model="agree" />
        </Field>
        <div class="Purchase-Disclaimer">
          <Localized :text="text.disclaimer"/>
        </div>
      </Fieldset>
      <Fieldset>
        <Button color="black+yellow" size="small" radius="round">Order</Button>
      </Fieldset>
    </Form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { clickOutside } from '@/directives/clickOutside';

import Button from '@/components/Button.vue';
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

const SETTINGS = {
  DESKTOP_MIN: 0,
  DESKTOP_MAX: 100,
  DESKTOP_STEP: 1,
  WEB_MIN: 0,
  WEB_MAX: 10000000,
  WEB_STEP: 100000
};

export default {
  name: 'Try',
  directives: {
    clickOutside
  },
  components: {
    Button,
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
  emits: ['close'],
  data () {
    const weights = ref([]);

    weights.value = this.font.weights.map(
      weight => ({
        ...weight,
        checked: false
      })
    );

    weights.value[0].checked = true;

    return {
      text: text.buy,
      desktopCount: 1,
      webCount: 0,
      comment: undefined,
      name: undefined,
      email: undefined,
      agree: undefined,
      weights,
      ...SETTINGS
    };
  },
  computed: {
    count () {
      const ret = this.weights.filter(w => w.checked).length;

      console.log('COMPUTE COUNT', this.weights, ret);

      return ret;
    },
    price () {
      const { count, webCount, desktopCount, font } = this;
      const { price } = font;

      return count * (webCount * price.web + desktopCount * price.desktop);
    }
  },
  methods: {
    close () {
      console.log('CLOSE');
      this.$emit('close');
    },
    onKeyDown (e) {
      switch (e.key) {
        case 'Escape':
          this.close();
          break;
      }
    }
  },
  mounted () {
    this.keyevent = document.addEventListener('keydown', this.onKeyDown);
  },
  unmounted () {
    document.removeEventListener('keydown', this.keyevent);
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/common.scss';

.Purchase {
  padding: 16px 26px;
  border-radius: 28px;
  overflow: auto;
  color: $color-black;
  background-color: $color-yellow;
  width: grid(35);
  max-height: calc(100vh - 2 * $grid);

  :deep(.Input-Input),
  :deep(.Input-Placeholder),
  :deep(.Text) {
    text-transform: uppercase;
  }
}

.Purchase-Disclaimer {
  @include Interface;
  padding: 12px 0;
  text-transform: uppercase;
}
</style>
