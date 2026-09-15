<template>
  <Chart
    class="TimeChart"
    :borders="borders"
    :segments="segments"
    :ticks="ticks"
    :label="label"
    :color="color"
    @updated="updated"
    @time="time"
  />
</template>

<script>
import Chart from '@/components/Chart.vue';

export default {
  name: 'TimeChart',
  components: {
    Chart
  },
  emits: ['updated', 'time'],
  props: {
    start: [Date, String],
    end: [Date, String],
    gran: Number,
    label: String,
    series: Array,
    color: String,
    colors: Object,
    borders: Boolean
  },
  data () {
    return {
      updating: false
    };
  },
  computed: {
    segments () {
      console.log('[TIMECHART] SEGMENTS');
      return this.getSegments();
    },
    ticks () {
      return this.getTicks();
    }
  },
  methods: {
    getSegments () {
      const series = this.series;
      const colors = this.colors;
      const segments = [];
      const finish = new Date(this.end);

      if (!series.length) return segments;

      let time = new Date(this.start);

      const H = series[0].h ? Math.max(...series.map(s => s.h)) : null;

      do {
        const start = time;
        const end = new Date(time.getTime() + this.gran * 1000);
        const item = series.find(e =>
          (e.start > start && e.start <= end) ||
          (e.end > start && e.end <= end) ||
          (e.start <= start && e.end >= end)
        );

        const segment = {
          start,
          end,
          active: Boolean(item)
        };

        if (item) {
          segment.meta = `${item.type || ''}${item.type && item.h ? '·' : ''}${item.h ? item.h + item.units : ''}${item.type && item.h ? '\n' : item.type || item.h ? '·' : ''}${this.formatTime(item.start)}—${this.formatTime(item.end)}(${item.duration}s)`;
          segment.last = item.end > start && item.end <= end;
          segment.color = item.color || (colors && colors[item.type]);
          segment.h = H ? `${Math.round(item.h / H * 100)}%` : undefined;
          segment.item = item;
        }

        segments.push(segment);

        time = end;
      } while (time < finish);

      return segments;
    },
    getTicks () {
      const ticks = [];
      const finish = new Date(this.end);

      let time = new Date(this.start);
      let index = 0;

      do {
        const start = time;
        const end = new Date(time.getTime() + this.gran * 1000);

        index++;

        const min = end.getMinutes();
        const sec = end.getSeconds();
        const type = (min === 0) && (sec === 0)
          ? 'h'
          : (min % 10 === 0) && (sec === 0)
              ? '10m'
              : (sec === 0)
                  ? 'm'
                  : undefined;

        ticks.push({
          start,
          end,
          index,
          type,
          meta: this.formatTime(end),
          label: type === 'h' ? this.formatHrs(end) : undefined
        });

        time = end;
      } while (time < finish);

      return ticks;
    },
    formatHrs (date) {
      const HH = pad(date.getHours());
      const MI = pad(date.getMinutes());

      return `${HH}:${MI}`;
    },
    formatTime (date) {
      const HH = pad(date.getHours());
      const MI = pad(date.getMinutes());
      const SS = pad(date.getSeconds());

      return `${HH}:${MI}:${SS}`;
    },
    time (time) {
      this.$emit('time', time);
    },
    updated () {
      this.$emit('updated');
    }
  }
};

function pad (n) {
  return n < 10 ? '0' + n : '' + n;
}
</script>
