<template>
  <main class="DistribView">
    <div class="DistribView-Prefs">
      <div class="Row">
        <span class="Field">
          <select v-model="form.dataset" @change="setLevels">
            <template v-for="option in form.datasets">
              <option :value="option" >{{option}}</option>
            </template>
          </select>
          <select v-model="form.l1" @change="setL1">
            <template v-for="option in form.l1List">
              <option :value="option" >{{option}}</option>
            </template>
          </select>
        </span>
        <span class="Checkbox">
          <input type="checkbox" v-model="prefs.borders" id="prefs-borders" />
          <label for="prefs-borders">Границы</label>
        </span>
      </div>
    </div>
    <div class="DistribView-Charts" :data-updating="updating || undefined">
      <template v-for="s in series">
        <div class="DistribView-Title" v-if="series.length > 1">
          {{s.label}}  {{s.avg}}c AVG   ({{s.min}}–{{s.max}}c)  Всего: {{s.count}} {{s.duration}}c {{secToHr(s.duration)}}ч
        </div>
        <TimeChart
          :series="s.data"
          :start="start"
          :end="end"
          :gran="gran"
          color="blue"
          :borders="prefs.borders"
        />
        <NormChart
          :series="s.data"
          field="duration"
          units="c"
          :start="start"
          :end="end"
          :gran="gran"
          color="blue"
          :borders="prefs.borders"
        />
      </template>
    </div>
  </main>
</template>

<script>
import TimeChart from '@/components/TimeChart.vue';
import NormChart from '@/components/NormChart.vue';

import { max, min, avg, sum, secToHr } from '@/lib/utils.js';
import mappers from '@/lib/mappers.js';
import datasets from '@/data/datasets.js';

const DEFAULT_DATASET_ID = Object.keys(datasets)[0];
const DEFAULT_L1 = Object.keys(datasets[DEFAULT_DATASET_ID].sets)[0];

export default {
  name: 'DistribView',
  components: {
    TimeChart,
    NormChart
  },
  props: {
    ds: String,
    l1: String,
    l2: String
  },
  data () {
    const ds = this.ds || DEFAULT_DATASET_ID;
    const l1 = this.l1 || DEFAULT_L1;

    const ret = {
      datasets,
      form: {
        dataset: ds,
        datasets: Object.keys(datasets),
        l1
      },
      start: undefined,
      end: undefined,
      series: undefined,
      gran: 120,
      updating: false,
      prefs: {
        borders: false
      }
    };

    return ret;
  },
  methods: {
    setLevels () {
      const { form } = this;
      const dataset = this.datasets[form.dataset];

      const l1List = Object.keys(dataset.sets);
      const l1 = l1List.includes(form.l1) ? form.l1 : l1List[0];

      this.form.l1 = l1;
      this.form.l1List = l1List;

      this.start = dataset.start;
      this.end = dataset.end;

      console.log('SET LEVELS', this.start, this.end);

      this.setL1();
    },
    setL1 () {
      const { form } = this;
      const dataset = this.datasets[form.dataset].sets[form.l1];

      const sets = Array.isArray(dataset)
        ? { [form.l1]: dataset }
        : dataset;

      const series = [];

      for (const [label, raw] of Object.entries(sets)) {
        const data = mappers[form.l1](raw);

        series.push({
          label,
          count: data.length,
          avg: avg('duration', data),
          min: min('duration', data),
          max: max('duration', data),
          duration: sum('duration', data),
          data
        });
      }

      this.series = series;

      this.$router.replace(`/stats/${form.dataset}/${form.l1}`);
    },
    secToHr
  },
  mounted () {
    this.setLevels();
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/common.scss';

.DistribView {
  padding-bottom: 48px;
}

.DistribView-Charts {
  overflow-x: auto;
  padding-top: 24px;
  padding-bottom: 48px;
}

.DistribView-Charts[data-updating] {
  opacity: 0.25;
}

.DistribView-Prefs {

}

.DistribView-Title {
  font-weight: 600;
}

.Row {
  display: flex;
  gap: 16px;
}

.Row-Right {
  flex: 1 1 auto;
  display: flex;
  justify-content: flex-end;
}

.Col {
  padding-right: 16px;
  flex: 0 0 auto;
}

.ColGroup {
  display: flex;

  & + & {
    border-left: 1px #000 solid;
    padding-left: 16px;
  }
}

.Field {
  display: flex;
  gap: 4px;
  @include no-select;
}

.Checkbox {
  display: flex;
  gap: 4px;
  @include no-select;
}

.Spacer {
  display: block;
  width: 16px;
}

.Loader {
  animation: 0.7s linear 0s infinite sunrise;
}

@keyframes sunrise {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

