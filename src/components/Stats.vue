<template>
  <div class="Stats Row">
    <!-- SKZ -->
    <div class="ColGroup" v-if="true">
      <div class="Col">
        <b>СКЗ</b>
        <br/>
        Циклы<br/>
        <span :data-tooltip="stats.skz.cycles.mixedTooltip">→ Ковши ➊</span><br/>
        Погрузки<br/>
        → Ковши<br/>
        Рейсы(АСД)<br/>
        Простои(АСД)<br/>
        Простои(СКЗ)<br/>
      </div>
      <div class="Col">
        <b>Кол-во</b>
        <br/>
        {{stats.skz.cycles.count}}<br/>
        {{stats.skz.buckets.count}}<br/>
        {{stats.skz.loads.count}}<br/>
        {{stats.skz.buckets.totalCount}}<br/>
        {{stats.skz.trips.count}}<br/>
        {{stats.skz.stoppages.count}}<br/>
        {{prefs.shortStoppages ? stats.skz.stoppages3.count : stats.skz.stoppages2.count}}<br/>
      </div>
      <div class="Col" v-if="prefs.seconds">
        <b>Время</b>
        <br/>
        {{stats.skz.cycles.time}}s<br/>
        —<br/>
        {{stats.skz.loads.time}}s<br/>
        —<br/>
        —<br/>
        {{stats.skz.stoppages.time}}s<br/>
        {{prefs.shortStoppages ? stats.skz.stoppages3.time : stats.skz.stoppages2.time}}s<br/>
      </div>
      <div class="Col" v-if="!prefs.seconds">
        <b>Время</b><br/>
        {{secToHr(stats.skz.cycles.time)}}h<br/>
        —<br/>
        {{secToHr(stats.skz.loads.time)}}h<br/>
        —<br/>
        —<br/>
        {{secToHr(stats.skz.stoppages.time)}}h<br/>
        {{prefs.shortStoppages ? secToHr(stats.skz.stoppages3.time) : secToHr(stats.skz.stoppages2.time)}}h<br/>
      </div>
      <div class="Col">
        <br/>
        {{stats.skz.cycles.timePct}}%<br/>
        —<br/>
        {{stats.skz.loads.timePct}}%<br/>
        —<br/>
        —<br/>
        {{stats.skz.stoppages.timePct}}%<br/>
        {{prefs.shortStoppages ? stats.skz.stoppages3.timePct : stats.skz.stoppages2.timePct}}%<br/>
      </div>
      <div class="Col">
        <b>AVG</b>
        <br/>
        {{stats.skz.cycles.avgTime}}s<br/>
        {{stats.skz.buckets.avgTime}}s<br/>
        {{stats.skz.loads.avgTime}}s<br/>
        {{stats.skz.buckets.avgCount}}<br/>
        —<br/>
        {{stats.skz.stoppages.avgTime}}s<br/>
        {{prefs.shortStoppages ? stats.skz.stoppages3.avgTime : stats.skz.stoppages2.avgTime}}s<br/>
      </div>
      <div class="Col">
        <b>MIN</b>
        <br/>
        {{stats.skz.cycles.minTime}}s<br/>
        {{stats.skz.buckets.minTime}}s<br/>
        {{stats.skz.loads.minTime}}s<br/>
        {{stats.skz.buckets.minCount}}<br/>
        —<br/>
        {{stats.skz.stoppages.minTime}}s<br/>
        {{prefs.shortStoppages ? stats.skz.stoppages3.minTime : stats.skz.stoppages2.minTime}}s<br/>
      </div>
      <div class="Col">
        <b>MAX</b>
        <br/>
        {{stats.skz.cycles.maxTime}}s<br/>
        {{stats.skz.buckets.maxTime}}s<br/>
        {{stats.skz.loads.maxTime}}s<br/>
        {{stats.skz.buckets.maxCount}}<br/>
        —<br/>
        {{stats.skz.stoppages.maxTime}}s<br/>
        {{prefs.shortStoppages ? stats.skz.stoppages3.maxTime : stats.skz.stoppages2.maxTime}}s<br/>
      </div>
      <div class="Col">
        <b>Вес</b>
        <br/>
        {{stats.skz.cycles.weight}}т<br/>
        —<br/>
        {{stats.skz.loads.weight}}т<br/>
        —<br/>
        {{stats.skz.trips.weight}}т<br/>
        <br/>
      </div>
      <div class="Col">
        <b>Вес/Рейс</b>
        <br/>
        —<br/>
        —<br/>
        {{stats.skz.loads.avgLoadWeight}}т<br/>
        —<br/>
        {{stats.skz.trips.avgLoadWeight}}т<br/>
        <br/>
      </div>
    </div>
    <!-- PIKLEMA-2 CYCLES -->
    <div class="ColGroup" v-if="stats.piklema2">
      <div class="Col">
        <b>Piklema</b><br/>
        Циклы<br/>
        → Погрузка<br/>
        → Простои<br/>
        → Вспомог.<br/>
        → Неопред.<br/>
      </div>
      <div class="Col">
        <b>Кол-во</b><br/>
        {{stats.piklema2.cycles.count}}<br/>
        {{stats.piklema2.loads.count}}<br/>
        {{stats.piklema2.idle.count}}<br/>
        {{stats.piklema2.self.count}}<br/>
        {{stats.piklema2.lost.count}}<br/>
      </div>
      <div class="Col" v-if="prefs.seconds">
        <b>Время</b><br/>
        {{stats.piklema2.cycles.time}}s<br/>
        {{stats.piklema2.loads.time}}s<br/>
        {{stats.piklema2.idle.time}}s<br/>
        {{stats.piklema2.self.time}}s<br/>
        {{stats.piklema2.lost.time}}s<br/>
      </div>
      <div class="Col" v-if="!prefs.seconds">
        <b>Время</b><br/>
        {{secToHr(stats.piklema2.cycles.time)}}h<br/>
        {{secToHr(stats.piklema2.loads.time)}}h<br/>
        {{secToHr(stats.piklema2.idle.time)}}h<br/>
        {{secToHr(stats.piklema2.self.time)}}h<br/>
        {{secToHr(stats.piklema2.lost.time)}}h<br/>
      </div>
      <div class="Col">
        <br/>
        {{stats.piklema2.cycles.timePct}}%<br/>
        {{stats.piklema2.loads.timePct}}%<br/>
        {{stats.piklema2.idle.timePct}}%<br/>
        {{stats.piklema2.self.timePct}}%<br/>
        {{stats.piklema2.lost.timePct}}%<br/>
      </div>
      <div class="Col">
        <b>AVG</b><br/>
        <br/>
        {{stats.piklema2.loads.avgTime}}s<br/>
        {{stats.piklema2.idle.avgTime}}s<br/>
        {{stats.piklema2.self.avgTime}}s<br/>
        {{stats.piklema2.lost.avgTime}}s<br/>
      </div>
      <div class="Col">
        <b>MIN</b><br/>
        <br/>
        {{stats.piklema2.loads.minTime}}s<br/>
        {{stats.piklema2.idle.minTime}}s<br/>
        {{stats.piklema2.self.minTime}}s<br/>
        {{stats.piklema2.lost.minTime}}s<br/>
      </div>
      <div class="Col">
        <b>MAX</b><br/>
        <br/>
        {{stats.piklema2.loads.maxTime}}s<br/>
        {{stats.piklema2.idle.maxTime}}s<br/>
        {{stats.piklema2.self.maxTime}}s<br/>
        {{stats.piklema2.lost.maxTime}}s<br/>
      </div>
    </div>
    <!-- PIKLEMA-2 ALL PHASES -->
    <div class="ColGroup" v-if="stats.piklema2 && !prefs.loadPhasesOnly">
      <div class="Col">
        <b>Piklema</b><br/>
        Фазы<br/>
        → К забою<br/>
        → Черпание<br/>
        → К самосвалу<br/>
        → Высыпание<br/>
        → Ожидание<br/>
      </div>
      <div class="Col">
        <b>Кол-во</b><br/>
        {{stats.piklema2.all.phases.count}}<br/>
        {{stats.piklema2.all.toLoad.count}}<br/>
        {{stats.piklema2.all.scoop.count}}<br/>
        {{stats.piklema2.all.toUnload.count}}<br/>
        {{stats.piklema2.all.unload.count}}<br/>
        {{stats.piklema2.all.awaiting.count}}<br/>
      </div>
      <div class="Col" v-if="prefs.seconds">
        <b>Время</b><br/>
        {{stats.piklema2.all.phases.time}}s<br/>
        {{stats.piklema2.all.toLoad.time}}s<br/>
        {{stats.piklema2.all.scoop.time}}s<br/>
        {{stats.piklema2.all.toUnload.time}}s<br/>
        {{stats.piklema2.all.unload.time}}s<br/>
        {{stats.piklema2.all.awaiting.time}}s<br/>
      </div>
      <div class="Col" v-if="!prefs.seconds">
        <b>Время</b><br/>
        {{secToHr(stats.piklema2.all.phases.time)}}h<br/>
        {{secToHr(stats.piklema2.all.toLoad.time)}}h<br/>
        {{secToHr(stats.piklema2.all.scoop.time)}}h<br/>
        {{secToHr(stats.piklema2.all.toUnload.time)}}h<br/>
        {{secToHr(stats.piklema2.all.unload.time)}}h<br/>
        {{secToHr(stats.piklema2.all.awaiting.time)}}h<br/>
      </div>
      <div class="Col">
        <br/>
        {{stats.piklema2.all.phases.timePct}}%<br/>
        {{stats.piklema2.all.toLoad.timePct}}%<br/>
        {{stats.piklema2.all.scoop.timePct}}%<br/>
        {{stats.piklema2.all.toUnload.timePct}}%<br/>
        {{stats.piklema2.all.unload.timePct}}%<br/>
        {{stats.piklema2.all.awaiting.timePct}}%<br/>
      </div>
      <div class="Col">
        <b>AVG</b><br/>
        {{stats.piklema2.all.phases.avgTime}}s<br/>
        {{stats.piklema2.all.toLoad.avgTime}}s<br/>
        {{stats.piklema2.all.scoop.avgTime}}s<br/>
        {{stats.piklema2.all.toUnload.avgTime}}s<br/>
        {{stats.piklema2.all.unload.avgTime}}s<br/>
        {{stats.piklema2.all.awaiting.avgTime}}s<br/>
      </div>
      <div class="Col">
        <b>MIN</b><br/>
        {{stats.piklema2.all.phases.minTime}}s<br/>
        {{stats.piklema2.all.toLoad.minTime}}s<br/>
        {{stats.piklema2.all.scoop.minTime}}s<br/>
        {{stats.piklema2.all.toUnload.minTime}}s<br/>
        {{stats.piklema2.all.unload.minTime}}s<br/>
        {{stats.piklema2.all.awaiting.minTime}}s<br/>
      </div>
      <div class="Col">
        <b>MAX</b><br/>
        {{stats.piklema2.all.phases.maxTime}}s<br/>
        {{stats.piklema2.all.toLoad.maxTime}}s<br/>
        {{stats.piklema2.all.scoop.maxTime}}s<br/>
        {{stats.piklema2.all.toUnload.maxTime}}s<br/>
        {{stats.piklema2.all.unload.maxTime}}s<br/>
        {{stats.piklema2.all.awaiting.maxTime}}s<br/>
      </div>
    </div>
    <!-- PIKLEMA-2 LOAD PHASES -->
    <div class="ColGroup" v-if="stats.piklema2 && prefs.loadPhasesOnly">
      <div class="Col">
        <b>Piklema</b><br/>
        Фазы/Погрузка<br/>
        → К забою<br/>
        → Черпание<br/>
        → К самосвалу<br/>
        → Высыпание<br/>
        → Ожидание<br/>
      </div>
      <div class="Col">
        <b>Кол-во</b><br/>
        {{stats.piklema2.loading.phases.count}}<br/>
        {{stats.piklema2.loading.toLoad.count}}<br/>
        {{stats.piklema2.loading.scoop.count}}<br/>
        {{stats.piklema2.loading.toUnload.count}}<br/>
        {{stats.piklema2.loading.unload.count}}<br/>
      </div>
      <div class="Col" v-if="prefs.seconds">
        <b>Время</b><br/>
        {{stats.piklema2.loading.phases.time}}s<br/>
        {{stats.piklema2.loading.toLoad.time}}s<br/>
        {{stats.piklema2.loading.scoop.time}}s<br/>
        {{stats.piklema2.loading.toUnload.time}}s<br/>
        {{stats.piklema2.loading.unload.time}}s<br/>
      </div>
      <div class="Col" v-if="!prefs.seconds">
        <b>Время</b><br/>
        {{secToHr(stats.piklema2.loading.phases.time)}}h<br/>
        {{secToHr(stats.piklema2.loading.toLoad.time)}}h<br/>
        {{secToHr(stats.piklema2.loading.scoop.time)}}h<br/>
        {{secToHr(stats.piklema2.loading.toUnload.time)}}h<br/>
        {{secToHr(stats.piklema2.loading.unload.time)}}h<br/>
      </div>
      <div class="Col">
        <br/>
        {{stats.piklema2.loading.phases.timePct}}%<br/>
        {{stats.piklema2.loading.toLoad.timePct}}%<br/>
        {{stats.piklema2.loading.scoop.timePct}}%<br/>
        {{stats.piklema2.loading.toUnload.timePct}}%<br/>
        {{stats.piklema2.loading.unload.timePct}}%<br/>
      </div>
      <div class="Col">
        <b>AVG</b><br/>
        {{stats.piklema2.loading.phases.avgTime}}s<br/>
        {{stats.piklema2.loading.toLoad.avgTime}}s<br/>
        {{stats.piklema2.loading.scoop.avgTime}}s<br/>
        {{stats.piklema2.loading.toUnload.avgTime}}s<br/>
        {{stats.piklema2.loading.unload.avgTime}}s<br/>
      </div>
      <div class="Col">
        <b>MIN</b><br/>
        {{stats.piklema2.loading.phases.minTime}}s<br/>
        {{stats.piklema2.loading.toLoad.minTime}}s<br/>
        {{stats.piklema2.loading.scoop.minTime}}s<br/>
        {{stats.piklema2.loading.toUnload.minTime}}s<br/>
        {{stats.piklema2.loading.unload.minTime}}s<br/>
      </div>
      <div class="Col">
        <b>MAX</b><br/>
        {{stats.piklema2.loading.phases.maxTime}}s<br/>
        {{stats.piklema2.loading.toLoad.maxTime}}s<br/>
        {{stats.piklema2.loading.scoop.maxTime}}s<br/>
        {{stats.piklema2.loading.toUnload.maxTime}}s<br/>
        {{stats.piklema2.loading.unload.maxTime}}s<br/>
      </div>
    </div>
    <!-- PIKLEMA-1 -->
    <div class="ColGroup" v-if="false">
      <div class="Col">
        <b>Piklema</b><br/>
        Записи<br/>
        Циклы<br/>
        → Погрузка<br/>
        → Простои<br/>
        → Вспомог.<br/>
        Gaps
      </div>
      <div class="Col">
        <b>Кол-во</b><br/>
        {{stats.piklema.total.count}}<br/>
        {{stats.piklema.cycles.count}}<br/>
        {{stats.piklema.loads.count}}<br/>
        {{stats.piklema.idle.count}}<br/>
        {{stats.piklema.self.count}}<br/>
        {{stats.piklema.gaps.count}}
      </div>
      <div class="Col" v-if="prefs.seconds">
        <b>Время</b><br/>
        {{stats.piklema.total.time}}s<br/>
        {{stats.piklema.cycles.time}}s<br/>
        {{stats.piklema.loads.time}}s<br/>
        {{stats.piklema.idle.time}}s<br/>
        {{stats.piklema.self.time}}s<br/>
        {{stats.piklema.gaps.time}}s
      </div>
      <div class="Col" v-if="!prefs.seconds">
        <b>Время</b><br/>
        {{secToHr(stats.piklema.total.time)}}h<br/>
        {{secToHr(stats.piklema.cycles.time)}}h<br/>
        {{secToHr(stats.piklema.loads.time)}}h<br/>
        {{secToHr(stats.piklema.idle.time)}}h<br/>
        {{secToHr(stats.piklema.self.time)}}h<br/>
        {{secToHr(stats.piklema.gaps.time)}}h
      </div>
      <div class="Col">
        <br/>
        {{stats.piklema.total.timePct}}%<br/>
        {{stats.piklema.cycles.timePct}}%<br/>
        {{stats.piklema.loads.timePct}}%<br/>
        {{stats.piklema.idle.timePct}}%<br/>
        {{stats.piklema.self.timePct}}%<br/>
        {{stats.piklema.gaps.timePct}}%
      </div>
      <div class="Col">
        <b>AVG</b><br/>
        <br/>
        <br/>
        {{stats.piklema.loads.avgTime}}s<br/>
        {{stats.piklema.idle.avgTime}}s<br/>
        {{stats.piklema.self.avgTime}}s<br/>
        {{stats.piklema.gaps.avgTime}}s
      </div>
      <div class="Col">
        <b>MIN</b><br/>
        <br/>
        <br/>
        {{stats.piklema.loads.minTime}}s<br/>
        {{stats.piklema.idle.minTime}}s<br/>
        {{stats.piklema.self.minTime}}s<br/>
        {{stats.piklema.gaps.minTime}}s
      </div>
      <div class="Col">
        <b>MAX</b><br/>
        <br/>
        <br/>
        {{stats.piklema.loads.maxTime}}s<br/>
        {{stats.piklema.idle.maxTime}}s<br/>
        {{stats.piklema.self.maxTime}}s<br/>
        {{stats.piklema.gaps.maxTime}}s
      </div>
    </div>
  </div>
</template>

<script>
import { max, min, avg, sum, pct, dursec, secToHr } from '@/lib/utils.js';

export default {
  name: 'Stats',
  props: {
    prefs: Object,
    data: Object
  },
  data () {
    const { data } = this;

    return {
      stats: this.calcStats(data)
    };
  },
  methods: {
    secToHr,
    calcStats (data) {
      console.log('CALC STATS', data);

      const {
        piklema,
        piklema2,
        loads,
        stoppages,
        stoppages2,
        stoppages3,
        trips
      } = data;
      const totalTime = 24 * 60 * 60;

      const cycles = data.cycles.filter(c => c.CYCLE_WEIGHT > 0);

      const stats = {
        totalTime,
        skz: {
          cycles: { count: cycles.length },
          buckets: { count: sum('CALC_BUCKETS_IN_LOAD', loads) },
          loads: { count: loads.length },
          trips: { count: trips.length },
          stoppages: { count: stoppages.length },
          stoppages2: { count: stoppages2.length },
          stoppages3: { count: stoppages3.length }
        }
      };

      if (piklema) {
        stats.piklema = {
          total: {
            count: piklema.total,
            time: dursec(piklema.cycles[0].start,
              piklema.cycles[piklema.cycles.length - 1].end)
          },
          cycles: { count: piklema.cycles.length },
          loads: { count: piklema.loads.length },
          idle: { count: piklema.idle.length },
          self: { count: piklema.self.length },
          gaps: { count: piklema.gaps.length }
        };

        stats.piklema.total.timePct = pct(stats.piklema.total.time, totalTime);

        stats.piklema.cycles.time = sum('duration', piklema.cycles);
        stats.piklema.loads.time = sum('duration', piklema.loads);
        stats.piklema.idle.time = sum('duration', piklema.idle);
        stats.piklema.self.time = sum('duration', piklema.self);
        stats.piklema.gaps.time = sum('duration', piklema.gaps);

        stats.piklema.cycles.timePct = pct(stats.piklema.cycles.time, totalTime);
        stats.piklema.loads.timePct = pct(stats.piklema.loads.time, totalTime);
        stats.piklema.idle.timePct = pct(stats.piklema.idle.time, totalTime);
        stats.piklema.self.timePct = pct(stats.piklema.self.time, totalTime);
        stats.piklema.gaps.timePct = pct(stats.piklema.gaps.time, totalTime);

        stats.piklema.cycles.avgTime = avg('duration', piklema.cycles);
        stats.piklema.loads.avgTime = avg('duration', piklema.loads);
        stats.piklema.idle.avgTime = avg('duration', piklema.idle);
        stats.piklema.self.avgTime = avg('duration', piklema.self);
        stats.piklema.gaps.avgTime = avg('duration', piklema.gaps);

        stats.piklema.cycles.minTime = min('duration', piklema.cycles);
        stats.piklema.loads.minTime = min('duration', piklema.loads);
        stats.piklema.idle.minTime = min('duration', piklema.idle);
        stats.piklema.self.minTime = min('duration', piklema.self);
        stats.piklema.gaps.minTime = min('duration', piklema.gaps);

        stats.piklema.cycles.maxTime = max('duration', piklema.cycles);
        stats.piklema.loads.maxTime = max('duration', piklema.loads);
        stats.piklema.idle.maxTime = max('duration', piklema.idle);
        stats.piklema.self.maxTime = max('duration', piklema.self);
        stats.piklema.gaps.maxTime = max('duration', piklema.gaps);
      }

      if (piklema2) {
        stats.piklema2 = {
          cycles: { count: piklema2.cycles.length },
          loads: { count: piklema2.loads.length },
          idle: { count: piklema2.idle.length },
          self: { count: piklema2.self.length },
          lost: { count: piklema2.lost.length },

          all: {
            phases: { count: piklema2.all.phases.length },
            toLoad: { count: piklema2.all.toLoad.length },
            scoop: { count: piklema2.all.scoop.length },
            toUnload: { count: piklema2.all.toUnload.length },
            unload: { count: piklema2.all.unload.length },
            awaiting: { count: piklema2.all.awaiting.length }
          },
          loading: {
            phases: { count: piklema2.loading.phases.length },
            toLoad: { count: piklema2.loading.toLoad.length },
            scoop: { count: piklema2.loading.scoop.length },
            toUnload: { count: piklema2.loading.toUnload.length },
            unload: { count: piklema2.loading.unload.length },
            awaiting: { count: piklema2.loading.awaiting.length }
          }
        };

        stats.piklema2.cycles.time = sum('duration', piklema2.cycles);
        stats.piklema2.loads.time = sum('duration', piklema2.loads);
        stats.piklema2.idle.time = sum('duration', piklema2.idle);
        stats.piklema2.self.time = sum('duration', piklema2.self);
        stats.piklema2.lost.time = sum('duration', piklema2.lost);

        stats.piklema2.all.phases.time = sum('duration', piklema2.all.phases);
        stats.piklema2.all.toLoad.time = sum('duration', piklema2.all.toLoad);
        stats.piklema2.all.scoop.time = sum('duration', piklema2.all.scoop);
        stats.piklema2.all.toUnload.time = sum('duration', piklema2.all.toUnload);
        stats.piklema2.all.unload.time = sum('duration', piklema2.all.unload);
        stats.piklema2.all.awaiting.time = sum('duration', piklema2.all.awaiting);

        stats.piklema2.loading.phases.time = sum('duration', piklema2.loading.phases);
        stats.piklema2.loading.toLoad.time = sum('duration', piklema2.loading.toLoad);
        stats.piklema2.loading.scoop.time = sum('duration', piklema2.loading.scoop);
        stats.piklema2.loading.toUnload.time = sum('duration', piklema2.loading.toUnload);
        stats.piklema2.loading.unload.time = sum('duration', piklema2.loading.unload);
        stats.piklema2.loading.awaiting.time = sum('duration', piklema2.loading.awaiting);

        stats.piklema2.cycles.timePct = pct(stats.piklema2.cycles.time, totalTime);
        stats.piklema2.loads.timePct = pct(stats.piklema2.loads.time, totalTime);
        stats.piklema2.idle.timePct = pct(stats.piklema2.idle.time, totalTime);
        stats.piklema2.self.timePct = pct(stats.piklema2.self.time, totalTime);
        stats.piklema2.lost.timePct = pct(stats.piklema2.lost.time, totalTime);

        stats.piklema2.all.phases.timePct = pct(stats.piklema2.all.phases.time, totalTime);
        stats.piklema2.all.toLoad.timePct = pct(stats.piklema2.all.toLoad.time, totalTime);
        stats.piklema2.all.scoop.timePct = pct(stats.piklema2.all.scoop.time, totalTime);
        stats.piklema2.all.toUnload.timePct = pct(stats.piklema2.all.toUnload.time, totalTime);
        stats.piklema2.all.unload.timePct = pct(stats.piklema2.all.unload.time, totalTime);
        stats.piklema2.all.awaiting.timePct = pct(stats.piklema2.all.awaiting.time, totalTime);

        stats.piklema2.loading.phases.timePct = pct(stats.piklema2.loading.phases.time, totalTime);
        stats.piklema2.loading.toLoad.timePct = pct(stats.piklema2.loading.toLoad.time, totalTime);
        stats.piklema2.loading.scoop.timePct = pct(stats.piklema2.loading.scoop.time, totalTime);
        stats.piklema2.loading.toUnload.timePct = pct(stats.piklema2.loading.toUnload.time, totalTime);
        stats.piklema2.loading.unload.timePct = pct(stats.piklema2.loading.unload.time, totalTime);
        stats.piklema2.loading.awaiting.timePct = pct(stats.piklema2.loading.awaiting.time, totalTime);

        stats.piklema2.cycles.avgTime = avg('duration', piklema2.cycles);
        stats.piklema2.loads.avgTime = avg('duration', piklema2.loads);
        stats.piklema2.idle.avgTime = avg('duration', piklema2.idle);
        stats.piklema2.self.avgTime = avg('duration', piklema2.self);
        stats.piklema2.lost.avgTime = avg('duration', piklema2.lost);

        stats.piklema2.all.phases.avgTime = avg('duration', piklema2.all.phases);
        stats.piklema2.all.toLoad.avgTime = avg('duration', piklema2.all.toLoad);
        stats.piklema2.all.scoop.avgTime = avg('duration', piklema2.all.scoop);
        stats.piklema2.all.toUnload.avgTime = avg('duration', piklema2.all.toUnload);
        stats.piklema2.all.unload.avgTime = avg('duration', piklema2.all.unload);
        stats.piklema2.all.awaiting.avgTime = avg('duration', piklema2.all.awaiting);

        stats.piklema2.loading.phases.avgTime = avg('duration', piklema2.loading.phases);
        stats.piklema2.loading.toLoad.avgTime = avg('duration', piklema2.loading.toLoad);
        stats.piklema2.loading.scoop.avgTime = avg('duration', piklema2.loading.scoop);
        stats.piklema2.loading.toUnload.avgTime = avg('duration', piklema2.loading.toUnload);
        stats.piklema2.loading.unload.avgTime = avg('duration', piklema2.loading.unload);
        stats.piklema2.loading.awaiting.avgTime = avg('duration', piklema2.loading.awaiting);

        stats.piklema2.cycles.minTime = min('duration', piklema2.cycles);
        stats.piklema2.loads.minTime = min('duration', piklema2.loads);
        stats.piklema2.idle.minTime = min('duration', piklema2.idle);
        stats.piklema2.self.minTime = min('duration', piklema2.self);
        stats.piklema2.lost.minTime = min('duration', piklema2.lost);

        stats.piklema2.all.phases.minTime = min('duration', piklema2.all.phases);
        stats.piklema2.all.toLoad.minTime = min('duration', piklema2.all.toLoad);
        stats.piklema2.all.scoop.minTime = min('duration', piklema2.all.scoop);
        stats.piklema2.all.toUnload.minTime = min('duration', piklema2.all.toUnload);
        stats.piklema2.all.unload.minTime = min('duration', piklema2.all.unload);
        stats.piklema2.all.awaiting.minTime = min('duration', piklema2.all.awaiting);

        stats.piklema2.loading.phases.minTime = min('duration', piklema2.loading.phases);
        stats.piklema2.loading.toLoad.minTime = min('duration', piklema2.loading.toLoad);
        stats.piklema2.loading.scoop.minTime = min('duration', piklema2.loading.scoop);
        stats.piklema2.loading.toUnload.minTime = min('duration', piklema2.loading.toUnload);
        stats.piklema2.loading.unload.minTime = min('duration', piklema2.loading.unload);
        stats.piklema2.loading.awaiting.minTime = min('duration', piklema2.loading.awaiting);

        stats.piklema2.cycles.maxTime = max('duration', piklema2.cycles);
        stats.piklema2.loads.maxTime = max('duration', piklema2.loads);
        stats.piklema2.idle.maxTime = max('duration', piklema2.idle);
        stats.piklema2.self.maxTime = max('duration', piklema2.self);
        stats.piklema2.lost.maxTime = max('duration', piklema2.lost);

        stats.piklema2.all.phases.maxTime = max('duration', piklema2.all.phases);
        stats.piklema2.all.toLoad.maxTime = max('duration', piklema2.all.toLoad);
        stats.piklema2.all.scoop.maxTime = max('duration', piklema2.all.scoop);
        stats.piklema2.all.toUnload.maxTime = max('duration', piklema2.all.toUnload);
        stats.piklema2.all.unload.maxTime = max('duration', piklema2.all.unload);
        stats.piklema2.all.awaiting.maxTime = max('duration', piklema2.all.awaiting);

        stats.piklema2.loading.phases.maxTime = max('duration', piklema2.loading.phases);
        stats.piklema2.loading.toLoad.maxTime = max('duration', piklema2.loading.toLoad);
        stats.piklema2.loading.scoop.maxTime = max('duration', piklema2.loading.scoop);
        stats.piklema2.loading.toUnload.maxTime = max('duration', piklema2.loading.toUnload);
        stats.piklema2.loading.unload.maxTime = max('duration', piklema2.loading.unload);
        stats.piklema2.loading.awaiting.maxTime = max('duration', piklema2.loading.awaiting);
      }

      stats.skz.cycles.time = sum('DURATION_SEC', cycles);
      stats.skz.buckets.time = sum('DURATION_SEC', cycles);
      stats.skz.loads.time = sum('DURATION_SEC', loads);
      stats.skz.stoppages.time = sum('DURATION_SEC', stoppages);
      stats.skz.stoppages2.time = sum('DURATION_SEC', stoppages2);
      stats.skz.stoppages3.time = sum('DURATION_SEC', stoppages3);

      stats.skz.cycles.timePct = pct(stats.skz.cycles.time, totalTime);
      stats.skz.buckets.timePct = pct(stats.skz.buckets.time, totalTime);
      stats.skz.loads.timePct = pct(stats.skz.loads.time, totalTime);
      stats.skz.stoppages.timePct = pct(stats.skz.stoppages.time, totalTime);
      stats.skz.stoppages2.timePct = pct(stats.skz.stoppages2.time, totalTime);
      stats.skz.stoppages3.timePct = pct(stats.skz.stoppages3.time, totalTime);

      stats.skz.cycles.avgTime = avg('DURATION_SEC', cycles);
      stats.skz.buckets.avgTime = avg('AVG_CYCLE_SEC', loads);
      stats.skz.loads.avgTime = avg('DURATION_SEC', loads);
      stats.skz.stoppages.avgTime = avg('DURATION_SEC', stoppages);
      stats.skz.stoppages2.avgTime = avg('DURATION_SEC', stoppages2);
      stats.skz.stoppages3.avgTime = avg('DURATION_SEC', stoppages3);

      stats.skz.cycles.minTime = min('DURATION_SEC', cycles);
      stats.skz.buckets.minTime = min('AVG_CYCLE_SEC', loads);
      stats.skz.loads.minTime = min('DURATION_SEC', loads);
      stats.skz.stoppages.minTime = min('DURATION_SEC', stoppages);
      stats.skz.stoppages2.minTime = min('DURATION_SEC', stoppages2);
      stats.skz.stoppages3.minTime = min('DURATION_SEC', stoppages3);

      stats.skz.cycles.maxTime = max('DURATION_SEC', cycles);
      stats.skz.buckets.maxTime = max('AVG_CYCLE_SEC', loads);
      stats.skz.loads.maxTime = max('DURATION_SEC', loads);
      stats.skz.stoppages.maxTime = max('DURATION_SEC', stoppages);
      stats.skz.stoppages2.maxTime = max('DURATION_SEC', stoppages2);
      stats.skz.stoppages3.maxTime = max('DURATION_SEC', stoppages3);

      stats.skz.buckets.totalCount = sum('CALC_BUCKETS_IN_LOAD', loads);
      stats.skz.buckets.avgCount = avg('CALC_BUCKETS_IN_LOAD', loads);
      stats.skz.buckets.minCount = min('CALC_BUCKETS_IN_LOAD', loads);
      stats.skz.buckets.maxCount = max('CALC_BUCKETS_IN_LOAD', loads);

      stats.skz.cycles.weight = sum('CYCLE_WEIGHT', cycles);
      stats.skz.loads.weight = sum('WEIGHT_END', loads);
      stats.skz.trips.weight = sum('WEIGHT', trips);

      const mixedLoads = loads.filter(c => c.CALC_BUCKETS_IN_LOAD > c.CYCLES);
      const firstBuckets = cycles.filter(c => c.CYCLE_NUM === 0);
      const otherBuckets = cycles.filter(c => c.CYCLE_NUM > 0);
      const mixedBuckets = cycles.filter(c => c.CALC_BUCKETS_IN_CYCLE > 1);
      const mixedBucketsFirst = mixedBuckets.filter(c => c.CYCLE_NUM === 0);
      const mixedBucketsOther = mixedBuckets.filter(c => c.CYCLE_NUM > 0);

      stats.skz.loads.mixedBuckets = mixedLoads.length;
      stats.skz.loads.mixedBucketsPct = pct(stats.skz.loads.mixedBuckets, stats.skz.loads.count);

      stats.skz.cycles.firstBuckets = firstBuckets.length;
      stats.skz.cycles.otherBuckets = otherBuckets.length;
      stats.skz.cycles.mixedBuckets = mixedBuckets.length;
      stats.skz.cycles.mixedBucketsFirst = mixedBucketsFirst.length;
      stats.skz.cycles.mixedBucketsOther = mixedBucketsOther.length;
      stats.skz.cycles.mixedBucketsPct = pct(stats.skz.cycles.mixedBuckets, stats.skz.cycles.count);
      stats.skz.cycles.mixedBucketsFirstPct = pct(stats.skz.cycles.mixedBucketsFirst, stats.skz.cycles.count);
      stats.skz.cycles.firstMixedBucketsPct = pct(stats.skz.cycles.mixedBucketsFirst, stats.skz.cycles.firstBuckets);
      stats.skz.cycles.otherMixedBucketsPct = pct(stats.skz.cycles.mixedBucketsOther, stats.skz.cycles.otherBuckets);
      stats.skz.cycles.mixedBucketsOtherPct = pct(stats.skz.cycles.mixedBucketsOther, stats.skz.cycles.count);

      stats.skz.cycles.mixedTooltip = [
        `Слипшиеся ковши: ${stats.skz.buckets.count - stats.skz.cycles.count}`,
        `Погрузки: ${stats.skz.loads.mixedBuckets} из ${stats.skz.loads.count} (${stats.skz.loads.mixedBucketsPct}%)`,
        `Циклы:  ${stats.skz.cycles.mixedBuckets} из ${stats.skz.cycles.count} (${stats.skz.cycles.mixedBucketsPct}%)`,
        `Первый: ${stats.skz.cycles.mixedBucketsFirst} из ${stats.skz.cycles.firstBuckets} (${stats.skz.cycles.mixedBucketsFirstPct}%/${stats.skz.cycles.firstMixedBucketsPct}%)`,
        `Другие: ${stats.skz.cycles.mixedBucketsOther} из ${stats.skz.cycles.otherBuckets} (${stats.skz.cycles.mixedBucketsOtherPct}%/${stats.skz.cycles.otherMixedBucketsPct}%)`
      ].join('\n');

      stats.skz.loads.avgLoadWeight = Math.round(stats.skz.loads.weight / stats.skz.loads.count);
      stats.skz.trips.avgLoadWeight = Math.round(stats.skz.trips.weight / stats.skz.trips.count);

      return stats;
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/common.scss';
.Stats {
  padding-top: 16px;
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
</style>
