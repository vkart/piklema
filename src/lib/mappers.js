import { avg, sum, dursec } from '@/lib/utils.js';

const mappers = {
  video_loads (loads) {
    if (!loads || !loads[0].VIDEO_START) return;

    return loads.map(l => ({
      start: new Date(l.VIDEO_START),
      end: new Date(l.VIDEO_END),
      duration: dursec(l.VIDEO_START, l.VIDEO_END),
      type: `№${l.LOAD_ID}/${l.BUCKETS}[${l.TYPE}]`,
      color: l.TYPE === 'OUT' ? 'yellow' : 'green-20',
      item: l
    }));
  },
  video_cycles (cycles) {
    if (!cycles || !cycles[0].VIDEO_START) return;

    return cycles.map(c => ({
      start: new Date(c.VIDEO_START),
      end: new Date(c.VIDEO_END),
      duration: dursec(c.VIDEO_START, c.VIDEO_END),
      type: `№${c.LOAD_ID}/${c.BUCKET_NUM}[${c.TYPE}]`,
      color: c.TYPE === 'OUT' ? 'yellow' : 'green-20',
      item: c
    }));
  },
  manual_loads (loads) {
    if (!loads || !loads[0].MANUAL_START) return;

    return loads.map(l => ({
      start: new Date(l.MANUAL_START),
      end: new Date(l.MANUAL_END),
      duration: dursec(l.MANUAL_START, l.MANUAL_END),
      type: `№${l.LOAD_ID}/${l.BUCKETS}[${l.TYPE}]`,
      color: l.TYPE === 'OUT' ? 'yellow' : 'green-20',
      item: l
    }));
  },
  manual_cycles (cycles) {
    if (!cycles || !cycles[0].MANUAL_START) return;

    return cycles.map(c => ({
      start: new Date(c.MANUAL_START),
      end: new Date(c.MANUAL_END),
      duration: dursec(c.MANUAL_START, c.MANUAL_END),
      type: `№${c.LOAD_ID}/${c.BUCKET_NUM}[${c.TYPE}]`,
      color: c.TYPE === 'OUT' ? 'yellow' : 'green-20',
      item: c
    }));
  },
  loads (loads) {
    return loads.map(l => ({
      start: new Date(l.TIME_START),
      end: new Date(l.TIME_END),
      duration: dursec(l.TIME_START, l.TIME_END),
      weight: l.WEIGHT_END,
      h: l.WEIGHT_END,
      units: 'т',
      type: `№${l.VEHID}/${l.LOAD_ID}`,
      item: l
    }));
  },
  cycles (cycles) {
    return cycles.map(c => ({
      start: new Date(c.TIME_START),
      end: new Date(c.TIME_END),
      duration: c.DURATION_SEC,
      weight: c.CYCLE_WEIGHT,
      h: c.CYCLE_WEIGHT || 50,
      type: `№${c.CYCLE_NUM}/${c.CALC_BUCKETS_IN_CYCLE}`,
      color: !c.CYCLE_WEIGHT ? 'grey'
        : c.CALC_BUCKETS_IN_CYCLE > 1 ?
          c.CYCLE_NUM > 0 ? 'yellow' : 'black' : 'blue',
      units: 'т',
      item: c
    }));
  },
  queues (queues) {
    return queues.map(q => ({
      start: new Date(q.STATE_START_TIME),
      end: new Date(q.STATE_END_TIME),
      duration: Math.round((new Date(q.STATE_END_TIME) - new Date(q.STATE_START_TIME)) / 1000),
      h: q.TRUCKS_CNT,
      units: 'шт',
      color: q.TRUCKS_CNT >= 3 ? 'red' : 'blue',
      item: q
    }));
  },
  stoppages (stoppages) {
    return stoppages.map(s => ({
      start: new Date(s.TIMESTOP),
      end: new Date(s.TIMEGO),
      duration: Math.round((new Date(s.TIMEGO) - new Date(s.TIMESTOP)) / 1000),
      type: s.TYPE,
      item: s
    }));
  },
  stoppages2 (stoppages) {
    return stoppages.map(s => ({
      start: new Date(s.TIME_START),
      end: new Date(s.TIME_END),
      duration: Math.round((new Date(s.TIME_END) - new Date(s.TIME_START)) / 1000),
      type: s.TYPE,
      color: s.STOPCOUNTER ? 'yellow' : 'red',
      item: s
    }));
  },
  trips (trips) {
    return trips.map(t => ({
      start: new Date(t.TIMELOAD),
      end: new Date(t.TIMELOAD),
      duration: Math.round((new Date(t.TIMELOAD) - new Date(t.TIMELOAD)) / 1000),
      weight: t.WEIGHT,
      type: `№${t.VEHID}·#${t.TRIPCOUNTER}`,
      item: t
    }));
  },
  performance (trips, start, end) {
    const d1 = new Date(start);
    const d2 = new Date(end);
    const count = Math.ceil((end - start) / 3600 / 1000);

    console.log('PERFORMANCE', d1, d2, count);

    const performance = [];
    const d0 = new Date(d1);

    d0.setMinutes(0);
    d0.setSeconds(0);
    d0.setMilliseconds(0);

    for (let i = 0; i <= count; i++) {
      const t0 = new Date(d0.getTime() + i * 60 * 60 * 1000);
      const t1 = new Date(d0.getTime() + (i + 1) * 60 * 60 * 1000);

      const arr = trips.filter(tr => {
        const t = new Date(tr.TIMELOAD);

        return t > t0 && t <= t1;
      });

      const weight = Math.round(sum('WEIGHT', arr));

      performance.push({
        start: t0,
        end: t1,
        duration: 60 * 60,
        count: arr.length,
        weight,
        weightAvg: avg('WEIGHT', arr),
        h: weight,
        type: `${weight}`,
        units: 'т'
      });
    }

    console.log('PERFORMANCE', performance);

    return performance;
  },
  piklema_phases (phases) {
    const eventColors = {
      'self-work': 'cyan',
      cycle: 'blue',
      awaiting: 'yellow',
      uncycles: 'red-30'
    };

    const phaseColors = {
      positioning_to_load: '-20',
      bucket_load_end: '-30',
      unloading_start: '-40',
      unloading_end: '-50',
      awaiting: ''
    };

    const phaseHeight = {
      positioning_to_load: 1,
      bucket_load_end: 2,
      unloading_start: 3,
      unloading_end: 4,
      awaiting: 4
    };

    return phases.map(c => ({
      id: c.ID,
      cycleId: c.CYCLE_EVENT_ID,
      type: c.PHASE,
      eventType: c.EVENT_TYPE,
      start: new Date(c.STARTED_AT),
      end: new Date(new Date(c.STARTED_AT).getTime() + c.DURATION_S * 1000),
      duration: Math.round(c.DURATION_S),
      delay: dursec(c.ENDED_AT, c.CREATED_AT),
      // color: eventColors[c.EVENT_TYPE] + phaseColors[c.PHASE],
      color: eventColors[c.EVENT_TYPE],
      h: phaseHeight[c.PHASE],
      units: '',
      items: [c]
    }));
  },
  piklema_cycles (cycles) {
    const eventColors = {
      'self-work': 'cyan',
      cycle: 'blue',
      awaiting: 'yellow',
      uncycles: 'red-30'
    };

    const ret = cycles.map(c => ({
      id: c.ID,
      type: c.EVENT_TYPE,
      start: new Date(c.STARTED_AT),
      end: new Date(c.ENDED_AT),
      duration: Math.round(c.DURATION_S),
      delay: dursec(c.ENDED_AT, c.CREATED_AT),
      color: eventColors[c.EVENT_TYPE],
      items: [c]
    }));

    ret.sort((a, b) => (a.start - b.start));

    return ret;
  }
};

mappers.piklema_cycles_details = mappers.piklema_cycles;
mappers.piklema_phases_details = mappers.piklema_phases;

export default mappers;
