<template>
  <div class="Purchase" :data-state="state" v-click-outside="close">
    <Form>
      <Fieldset>
        <Field>
          <Row>
            <Toggle
              :label="text.all"
              v-model="checkAllWeights"
              @toggle="toggleWeights"
            />
            <template v-for="(weight, index) in form.weights">
              <Toggle
                :label="weight.name"
                :disabled="disabled"
                v-model="form.weights[index].checked"
                @toggle="updateAllCheckbox"
              />
            </template>
          </Row>
        </Field>
      </Fieldset>
      <Fieldset>
        <Field
          :label="text.desktop"
          :counter="form.desktopCount"
          :units="text.users"
        >
          <Slider
            :min="DESKTOP_MIN"
            :max="DESKTOP_MAX"
            :step="DESKTOP_STEP"
            :disabled="disabled"
            v-model="form.desktopCount"
          />
        </Field>
        <Field :label="text.web" :counter="form.webCount" :units="text.views">
          <Slider
            :min="WEB_MIN"
            :max="WEB_MAX"
            :step="WEB_STEP"
            :disabled="disabled"
            v-model="form.webCount"
          />
        </Field>
        <Field label="" :units="text.total" :counter="`\$${total}`"/>
      </Fieldset>
      <Fieldset>
        <Field>
          <Input
            type="textarea"
            v-model="form.comment"
            :placeholder="text.comment"
            :disabled="disabled"
            rows="2"
          />
        </Field>
      </Fieldset>
      <Fieldset>
        <Row>
          <Field>
            <Input
              type="text"
              v-model="form.name"
              :placeholder="text.name"
              :disabled="disabled"
            />
          </Field>
          <Field>
            <Input
              type="text"
              v-model="form.email"
              :placeholder="text.email"
              :disabled="disabled"
            />
          </Field>
        </Row>
        <Field>
          <Toggle :label="text.agree" v-model="form.agree" :disabled="disabled" />
        </Field>
        <div class="Purchase-Disclaimer">
          <Localized :text="text.disclaimer"/>
        </div>
      </Fieldset>
      <Fieldset>
        <Row>
          <Button
            color="black+yellow"
            size="small"
            radius="round"
            :disabled="disabled"
            :label="text.order"
            @click="order"
            v-if="state !== 'success'"
          />
          <Button
            color="black+yellow"
            size="small"
            radius="round"
            @click="close"
            v-if="state === 'success'"
          >OK</Button>
          <div class="Purchase-Message" v-if="message">
            <Localized :text="message"/>
            <div class="Purchase-MessageDetails" v-text="details" />
          </div>
        </Row>
      </Fieldset>
    </Form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { clickOutside } from '@/directives/clickOutside';
import { supabase } from '@/lib/supabase';

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
    Slider
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
      message: undefined,
      details: undefined,
      state: 'default',
      disabled: false,
      form: {
        desktopCount: 1,
        webCount: 0,
        comment: undefined,
        name: undefined,
        email: undefined,
        agree: undefined,
        weights
      },
      checkAllWeights: false,
      ...SETTINGS
    };
  },
  computed: {
    count () {
      return this.form.weights.filter(w => w.checked).length;
    },
    total () {
      const { count, font } = this;
      const { webCount, desktopCount } = this.form;
      const { price } = font;

      return count * (webCount * price.web + desktopCount * price.desktop);
    }
  },
  methods: {
    close () {
      this.reset();
      this.$emit('close');
    },
    reset () {
      this.disabled = false;
      this.setState('default');
    },
    onKeyDown (e) {
      switch (e.key) {
        case 'Escape':
          this.close();
          break;
      }
    },
    setState (state, details) {
      const text = this.text.states[state];

      this.message = text || undefined;
      this.details = details || undefined;
      this.state = state;
    },
    toggleWeights (checked) {
      this.form.weights.forEach(w => { w.checked = checked; });
    },
    updateAllCheckbox (checked) {
      this.checkAllWeights = this.form.weights.length === this.count;
    },
    async order () {
      const { font, total } = this;
      const {
        webCount,
        desktopCount,
        comment,
        name,
        email
      } = this.form;

      const weights = this.form.weights
        .filter(w => w.checked)
        .map(w => w.name)
        .join(',');

      const order = {
        items: [{
          font: font.id,
          weights,
          web: webCount,
          desktop: desktopCount
        }],
        total,
        name,
        email,
        comment
      };

      this.setState('sending');
      this.disabled = true;

      const resp = await supabase.from('orders').insert(order);

      if (resp.error) {
        this.setState('error', resp.error.message);
        this.disabled = false;
      } else {
        this.setState('success');
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

  :deep(.Toggle-Label),
  :deep(.Input-Input),
  :deep(.Input-Placeholder) {
    text-transform: uppercase;
  }
}

.Purchase-Disclaimer {
  @include Interface;
  padding: 12px 0;
  text-transform: uppercase;
}

.Purchase-Message {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.Purchase[data-state="error"] {
  .Purchase-Message {
    color: $color-red;
  }
}
</style>
