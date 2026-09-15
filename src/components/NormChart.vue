<template>
  <Chart
    class="NormChart"
    :borders="false"
    :segments="segments"
    :ticks="ticks"
    :label="label"
    :color="color"
    :tick="8"
    :bar="160"
    @updated="updated"
    @time="time"
  />
</template>

<script>
import Chart from '@/components/Chart.vue';

import { max, min, groupBy } from '@/lib/utils.js';

export default {
  name: 'NormChart',
  components: {
    Chart
  },
  emits: ['updated', 'time'],
  props: {
    start: [Date, String],
    end: [Date, String],
    gran: Number,
    label: String,
    field: String,
    units: String,
    series: Array,
    color: String,
    borders: Boolean
  },
  data () {
    return {
      updating: false
    };
  },
  computed: {
    segments () {
      return this.getSegments();
    },
    ticks () {
      return this.getTicks();
    }
  },
  methods: {
    getSegments () {
      const units = this.units || '';
      const field = this.field;
      const series = this.series;
      const segments = [];

      const minValue = min(field, series);
      const maxValue = max(field, series);

      const grouped = groupBy(field, series);
      const arrays = Object.values(grouped);
      const H = max('length', arrays);

      const first = 0;
      const last = maxValue;
      const d = 1;

      let index = first;

      do {
        const start = index;
        const end = index + d;

        const arr = grouped[index];

        const segment = {
          start,
          end,
          meta: arr ? `${index}${units}: ${arr.length}` : '',
          active: Boolean(arr),
          h: arr ? `${Math.round(arr.length / H * 100)}%` : 0
        };

        segments.push(segment);

        index = end;
      } while (index < last);

      return segments;
    },
    getTicks () {
      return [];
    },
    time (time) {
      this.$emit('time', time);
    },
    updated () {
      this.$emit('updated');
    }
  }
};
</script>
