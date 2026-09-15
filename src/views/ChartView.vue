<template>
  <main class="ChartView">
    <div class="ChartView-Prefs">
      <div class="Row">
        <span class="Field">
          <select v-model="form.dataset" @change="navigate">
            <template v-for="option in form.datasets">
              <option :value="option" >{{option}}</option>
            </template>
          </select>
        </span>
        <span class="Field">
          <input type="datetime-local" v-model="form.start" />
          <input type="datetime-local" v-model="form.end" />
        </span>
        <span class="Field">
          <label for="gran">gran</label>
          <input type="number" v-model="form.gran" style="width: 4em;" />
        </span>
        <button @click.stop="apply">Apply</button>
        <span class="Checkbox">
          <input type="checkbox" v-model="prefs.borders" id="prefs-borders" />
          <label for="prefs-borders">Границы</label>
        </span>
        <span class="Checkbox" v-if="piklema2">
          <input type="checkbox" v-model="prefs.loadPhasesOnly" id="prefs-phases" />
          <label for="prefs-phases">Погрузка</label>
        </span>
        <span class="Checkbox">
          <input type="checkbox" v-model="prefs.seconds" id="prefs-seconds" />
          <label for="prefs-seconds">Сек</label>
        </span>
        <span class="Checkbox">
          <input type="checkbox" v-model="prefs.shortStoppages" id="prefs-stoppages" />
          <label for="prefs-stoppages">>3 мин</label>
        </span>
        <span class="Checkbox">
          <input type="checkbox" v-model="prefs.stats" id="prefs-stoppages" />
          <label for="prefs-stoppages">Stats</label>
        </span>
        <div class="Row-Right">
          <span class="Loader" v-show="updating">│</span>
          <span class="Spacer" />
          <button @click="reset()">Reset</button>
          <span class="Spacer" />
          <button @click="time(0, 60)">1h</button>
          <button @click="time(0, 120)">2h</button>
          <button @click="time(0, 240)">4h</button>
          <button @click="time(0, 480)">8h</button>
          <button @click="time(0, 720)">12h</button>
          <button @click="time(0, 1440)">all</button>
          <span class="Spacer" />
          <button @click="dtime(-240)">←4</button>
          <button @click="dtime(-120)">←2</button>
          <button @click="dtime(-60)">←1</button>
          <span class="Spacer" />
          <button @click="dtime(+60)">1→</button>
          <button @click="dtime(+120)">2→</button>
          <button @click="dtime(+240)">4→</button>
        </div>
      </div>
    </div>
    <Stats :data="prestats" :prefs="prefs" v-if="prefs.stats" />
    <div class="ChartView-Charts" :data-updating="updating || undefined">
      <!-- Chart
        :series="piklema.loads" label="Piklema/Work"
        :start="start"
        :end="end"
        :gran="gran"
        color="blue"
      />
      <TimeChart
        :series="piklema.self" label="Piklema/Self"
        :start="start"
        :end="end"
        :gran="gran"
        color="magenta"
      />
      <TimeChart
        :series="piklema.idle" label="Piklema/Idle"
        :start="start"
        :end="end"
        :gran="gran"
        color="yellow"
      /-->
      <!-- Chart
        :series="piklema.gaps"
        label="Piklema/Gaps"
        :start="start"
        :end="end"
        :gran="gran"
        :borders="prefs.borders"
        color="red"
      />
      <TimeChart
        :series="piklema.cycles"
        label="Piklema/Циклы"
        :start="start"
        :end="end"
        :gran="gran"
        :borders="prefs.borders"
        :colors="{ load: 'blue', idle: 'yellow', 'self-work': 'cyan' }"
      /-->
      <TimeChart
        :series="piklema2.cycles"
        label="Piklema/Циклы"
        :start="start"
        :end="end"
        :gran="gran"
        :borders="prefs.borders"
        :colors="{ cycle: 'blue', awaiting: 'yellow', 'self-work': 'cyan', 'uncycles': 'red-30' }"
        @time="onTime"
        v-if="piklema2"
      />
      <TimeChart
        :series="piklema2.loading.phases"
        label="Piklema/Фазы"
        :start="start"
        :end="end"
        :gran="gran"
        :borders="prefs.borders"
        @time="onTime"
        v-show="prefs.loadPhasesOnly"
        v-if="piklema2"
      />
      <TimeChart
        :series="piklema2.all.phases"
        label="Piklema/Фазы"
        :start="start"
        :end="end"
        :gran="gran"
        :borders="prefs.borders"
        @time="onTime"
        v-show="!prefs.loadPhasesOnly"
        v-if="piklema2"
      />
      <TimeChart
        :series="manual.cycles"
        label="Ручное/Циклы"
        :start="start"
        :end="end"
        :gran="gran"
        :borders="prefs.borders"
        color="green-20"
        @time="onTime"
        v-if="manual.cycles"
      />
      <TimeChart
        :series="video.cycles"
        label="Видео/Циклы"
        :start="start"
        :end="end"
        :gran="gran"
        :borders="prefs.borders"
        color="blue"
        @time="onTime"
        v-if="video.cycles"
      />
      <TimeChart
        :series="skz.cycles"
        label="СКЗ/Циклы"
        :start="start"
        :end="end"
        :gran="gran"
        :borders="prefs.borders"
        color="blue"
        @time="onTime"
      />
      <TimeChart
        :series="skz.loads"
        label="СКЗ/Погрузки"
        :start="start"
        :end="end"
        :gran="gran"
        :borders="prefs.borders"
        color="blue"
        @time="onTime"
      />
      <TimeChart
        :series="skz.cycles0"
        label="СКЗ/Циклы(0)"
        :start="start"
        :end="end"
        :gran="gran"
        :borders="prefs.borders"
        color="blue"
        @time="onTime"
        v-if="skz.cycles0"
      />
      <TimeChart
        :series="skz.loads0"
        label="СКЗ/Погрузки(0)"
        :start="start"
        :end="end"
        :gran="gran"
        :borders="prefs.borders"
        color="blue"
        @time="onTime"
        v-if="skz.loads0"
      />
      <TimeChart
        :series="trips"
        label="Рейсы"
        :start="start"
        :end="end"
        :gran="gran"
        :borders="prefs.borders"
        color="blue"
        @time="onTime"
      />
      <TimeChart
        :series="performance"
        label="Произв-ть"
        :start="start"
        :end="end"
        :gran="gran"
        :borders="prefs.borders"
        color="blue"
        @time="onTime"
        v-if="performance?.length"
      />
      <TimeChart
        :series="queues"
        label="Очереди"
        :start="start"
        :end="end"
        :gran="gran"
        :borders="prefs.borders"
        color="blue"
        @time="onTime"
      />
      <TimeChart
        :series="stoppages2"
        label="Простои(СКЗ)"
        :start="start"
        :end="end"
        :gran="gran"
        :borders="prefs.borders"
        color="yellow"
        @time="onTime"
        v-show="!prefs.shortStoppages"
      />
      <TimeChart
        :series="stoppages3"
        label="Простои(СКЗ)"
        :start="start"
        :end="end"
        :gran="gran"
        :borders="prefs.borders"
        color="yellow"
        @time="onTime"
        v-show="prefs.shortStoppages"
      />
      <TimeChart
        :series="stoppages"
        label="Простои(АСД)"
        :start="start"
        :end="end"
        :gran="gran"
        :borders="prefs.borders"
        color="red"
        @time="onTime"
        @updated="updated()"
      />
    </div>
  </main>
</template>

<script>
import { watchEffect } from 'vue';
import format from 'dateformat';

import Stats from '@/components/Stats.vue';
import TimeChart from '@/components/TimeChart.vue';

import { dursec } from '@/lib/utils.js';
import mappers from '@/lib/mappers.js';
import datasets from '@/data/datasets.js';

const DEFAULT_DATASET_ID = Object.keys(datasets)[0];
const DEFAULT_HOURS_SHIFT = 15;
const DEFAULT_HOURS_SPAN = 6;
const DEFAULT_TIME_SPAN_BEFORE = -1 * 60 * 60 * 1000; // -1 hr
const DEFAULT_TIME_SPAN_AFTER = 1 * 60 * 60 * 1000; // +1 hr
const DEFAULT_TIME_SPAN_GRAN = 20;
const MAX_TIME_SPAN_GRAN = 2;
const DEFAULT_GRAN = 20;

const MIN_STOP_DURATION_SEC = 3 * 60; // 3 min

const FMT = 'yyyy-mm-dd HH:MM';

export default {
  name: 'ChartView',
  components: {
    Stats,
    TimeChart
  },
  props: {
    ds: String
  },
  data () {
    const selected = this.ds || DEFAULT_DATASET_ID;
    const dataset = datasets[selected];
    const sets = dataset.sets;
    const q = this.$route.query;

    console.log('DATA', q);

    const period = {
      start: q.s
        ? new Date(q.s)
        : new Date(dataset.start.getTime() + DEFAULT_HOURS_SHIFT * 60 * 60 * 1000),
      end: q.e
        ? new Date(q.e)
        : new Date(dataset.start.getTime() + (DEFAULT_HOURS_SHIFT + DEFAULT_HOURS_SPAN) * 60 * 60 * 1000)
    };

    const form = {
      dataset: selected,
      datasets: Object.keys(datasets),
      start: format(period.start, FMT),
      end: format(period.end, FMT),
      gran: q.g ? Number(q.g) : DEFAULT_GRAN
    };

    sets.stoppages3 = sets.stoppages2.filter(
      s => s.DURATION_SEC > MIN_STOP_DURATION_SEC
    );

    const data = {
      period,
      range: {
        start: dataset.start,
        end: dataset.end
      },
      form,
      ...form,
      video: {
        loads: mappers.video_loads(sets.video_loads),
        cycles: mappers.video_cycles(sets.video_cycles)
      },
      manual: {
        loads: mappers.manual_loads(sets.video_loads),
        cycles: mappers.manual_cycles(sets.video_cycles)
      },
      skz: {
        loads: mappers.loads(sets.loads),
        loads0: mappers.loads(sets.loads0 || sets.loads),
        cycles: mappers.cycles(sets.cycles),
        cycles0: mappers.cycles(sets.cycles0 || sets.cycles)
      },
      piklema: this.aggregatePiklema(sets.piklema?.cycles),
      piklema2: this.aggregatePiklema2(sets.piklema_cycles, sets.piklema_phases),
      queues: mappers.queues(sets.queues),
      stoppages: mappers.stoppages(sets.stoppages),
      stoppages2: mappers.stoppages2(sets.stoppages2),
      stoppages3: mappers.stoppages2(sets.stoppages3),
      trips: mappers.trips(sets.trips),
      performance: mappers.performance(sets.trips, dataset.start, dataset.end),
      prefs: {
        borders: q.pb === 'true',
        seconds: q.ps === 'true',
        loadPhasesOnly: q.pp === 'true',
        shortStoppages: q.pt === 'true',
        stats: false
      },
      updating: false
    };

    data.prestats = {
      ...sets,
      piklema: data.piklema,
      piklema2: data.piklema2
    };

    console.log('PRESTATS', data.prestats);

    return data;
  },
  mounted () {
    watchEffect(() => {
      const path = `/${this.dataset}`;
      const query = {
        s: this.start,
        e: this.end,
        g: this.gran,
        pb: this.prefs.borders,
        ps: this.prefs.seconds,
        pp: this.prefs.loadPhasesOnly,
        pt: this.prefs.shortStoppages
      };

      this.$router.replace({ path, query });
    });
  },
  methods: {
    navigate () {
      const path = `/${this.form.dataset}`;

      window.location.href = path;
    },
    apply () {
      const form = this.form;

      if (!this.changed()) return;

      this.updating = true;

      setTimeout(() => {
        this.start = form.start;
        this.end = form.end;
        this.gran = form.gran;
      }, 1000);
    },
    changed () {
      const form = this.form;

      return form.start !== this.start ||
        form.end !== this.end ||
        form.gran !== this.gran;
    },
    reset () {
      this.form.start = format(this.period.start, FMT);
      this.form.end = format(this.period.end, FMT);
      this.form.gran = DEFAULT_GRAN;

      this.apply();
    },
    onTime (time) {
      const center = new Date(time);

      const hr = center.getHours();
      const mi = center.getMinutes();

      if (mi < 15) {
        center.setMinutes(0);
      } else if (mi < 45) {
        center.setMinutes(30);
      } else {
        center.setHours(hr + 1);
        center.setMinutes(0);
      }

      center.setSeconds(0);

      const start = new Date(center.getTime() + DEFAULT_TIME_SPAN_BEFORE);
      const end = new Date(center.getTime() + DEFAULT_TIME_SPAN_AFTER);

      this.form.start = format(start, FMT);
      this.form.end = format(end, FMT);
      this.form.gran = this.form.gran === DEFAULT_TIME_SPAN_GRAN
        ? MAX_TIME_SPAN_GRAN

        : DEFAULT_TIME_SPAN_GRAN;
      // this.prefs.borders = true;

      this.apply();
    },
    time (shift, dur) {
      const start = new Date(this.range.start.getTime() + shift * 60 * 1000);
      const end = new Date(start.getTime() + dur * 60 * 1000);

      this.form.start = format(start, FMT);
      this.form.end = format(end, FMT);

      this.apply();
    },
    dtime (min) {
      const form = this.form;
      const start = new Date(form.start);
      const end = new Date(form.end);

      const shiftStart = new Date(new Date(start).getTime() + min * 60 * 1000);
      const shiftEnd = new Date(new Date(end).getTime() + min * 60 * 1000);

      form.start = format(shiftStart, FMT);
      form.end = format(shiftEnd, FMT);

      this.apply();
    },
    updated (ref) {
      this.updating = false;
    },
    aggregatePiklema (raw) {
      if (!raw) return;

      const byId = Object.groupBy(raw, r => r.cycle_event_id);
      const cycles = [];

      for (const [id, items] of Object.entries(byId)) {
        const first = items[0];
        const last = items[items.length - 1];
        const start = new Date(first.started_at);
        const end = new Date(new Date(last.started_at).getTime() + last.duration_s * 1000);
        const duration = dursec(start, end);

        cycles.push({
          id,
          type: items.length === 1 ? items[0].type : 'load',
          start,
          end,
          duration,
          items
        });
      }

      cycles.sort((a, b) => (a.start - b.start));

      const gaps = [];

      for (let i = 1; i < cycles.length; i++) {
        const curr = cycles[i];
        const prev = cycles[i - 1];
        const start = prev.end;
        const end = curr.start;
        const duration = dursec(start, end);

        if (Math.abs(duration) > 0) {
          gaps.push({
            type: 'gap',
            start,
            end,
            duration,
            h: duration,
            units: 'c',
            cycles: [prev, curr]
          });
        }
      }

      const loads = cycles.filter(c => c.type === 'load');
      const idle = cycles.filter(c => c.type === 'idle');
      const self = cycles.filter(c => c.type === 'self-work');

      return {
        total: raw.length,
        cycles,
        loads,
        self,
        idle,
        gaps
      };
    },
    aggregatePiklema2 (rawCycles, rawPhases) {
      if (!rawCycles || !rawPhases) return;

      const cycles = mappers.piklema_cycles(rawCycles);
      const phases = mappers.piklema_phases(rawPhases);
      const gaps = [];

      for (let i = 1; i < cycles.length; i++) {
        const curr = cycles[i];
        const prev = cycles[i - 1];
        const start = prev.end;
        const end = curr.start;
        const duration = dursec(start, end);

        if (Math.abs(duration) > 0) {
          gaps.push({
            type: 'gap',
            start,
            end,
            duration,
            h: duration,
            units: 'c',
            cycles: [prev, curr]
          });
        }
      }

      // EVENT_TYPE
      // self-work
      // cycle
      // awaiting
      // uncycles

      const loads = cycles.filter(c => c.type === 'cycle');
      const idle = cycles.filter(c => c.type === 'awaiting');
      const self = cycles.filter(c => c.type === 'self-work');
      const lost = cycles.filter(c => c.type === 'uncycles');

      // PHASE
      // positioning_to_load
      // bucket_load_end
      // unloading_start
      // unloading_end
      // awaiting

      const loadingPhases = phases.filter(c => c.eventType === 'cycle');

      return {
        total: rawCycles.length,
        cycles,
        loads,
        self,
        idle,
        lost,
        gaps,

        all: {
          phases,
          toLoad: phases.filter(c => c.type === 'positioning_to_load'),
          scoop: phases.filter(c => c.type === 'bucket_load_end'),
          toUnload: phases.filter(c => c.type === 'unloading_start'),
          unload: phases.filter(c => c.type === 'unloading_end'),
          awaiting: phases.filter(c => c.type === 'awaiting')
        },
        loading: {
          phases: loadingPhases,
          toLoad: loadingPhases.filter(c => c.type === 'positioning_to_load'),
          scoop: loadingPhases.filter(c => c.type === 'bucket_load_end'),
          toUnload: loadingPhases.filter(c => c.type === 'unloading_start'),
          unload: loadingPhases.filter(c => c.type === 'unloading_end'),
          awaiting: loadingPhases.filter(c => c.type === 'awaiting')
        }
      };
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/common.scss';

.ChartView {
  padding-bottom: 48px;
}

.ChartView-Charts {
  overflow-x: auto;
  padding-top: 24px;
  padding-bottom: 48px;
}

.ChartView-Charts[data-updating] {
  opacity: 0.25;
}

.ChartView-Prefs {

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

[data-tooltip] {
  position: relative;
  &:hover {
    color: #00F;

    &:before {
      content: attr(data-tooltip);
      display: block;
      position: absolute;
      white-space: pre;
      top: 24px;
      left: 0px;
      padding: 2px 4px 4px 4px;
      background-color: #000;
      color: #fff;
      font-size: 12px;
      cursor: default;
    }
  }
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
