import video_loads_50_09_may from './50_09_may/video_loads.json';
import video_cycles_50_09_may from './50_09_may/video_cycles.json';
import loads_50_09_may from './50_09_may/veh_loads.json';
import cycles_50_09_may from './50_09_may/shov_cycle.json';
import queues_50_09_may from './50_09_may/queues.json';
import trips_50_09_may from './50_09_may/vehtrips.json';
import stoppages_50_09_may from './50_09_may/idlestoppages.json';
import stoppages2_50_09_may from './50_09_may/calc_stoppages.json';

import piklema_52_09_may from './52_09_may/piklema_web.json';
import piklema_cycles_52_09_may from './52_09_may/piklema_cycles.json';
import piklema_phases_52_09_may from './52_09_may/piklema_cycle_phases.json';
import loads_52_09_may from './52_09_may/veh_loads.json';
import cycles_52_09_may from './52_09_may/shov_cycle.json';
import queues_52_09_may from './52_09_may/queues.json';
import trips_52_09_may from './52_09_may/vehtrips.json';
import stoppages_52_09_may from './52_09_may/idlestoppages.json';
import stoppages2_52_09_may from './52_09_may/calc_stoppages.json';

import piklema_52_10_jun from './52_10_jun/piklema_web.json';
import piklema_cycles_52_10_jun from './52_10_jun/piklema_cycles.json';
import piklema_phases_52_10_jun from './52_10_jun/piklema_cycle_phases.json';
import loads_52_10_jun from './52_10_jun/veh_loads.json';
import cycles_52_10_jun from './52_10_jun/shov_cycle.json';
import queues_52_10_jun from './52_10_jun/queues.json';
import trips_52_10_jun from './52_10_jun/vehtrips.json';
import stoppages_52_10_jun from './52_10_jun/idlestoppages.json';
import stoppages2_52_10_jun from './52_10_jun/calc_stoppages.json';

import video_loads_52_06_jul from './52_06_jul/video_loads.json';
import video_cycles_52_06_jul from './52_06_jul/video_cycles.json';
import piklema_52_06_jul from './52_06_jul/piklema_web.json';
import piklema_cycles_52_06_jul from './52_06_jul/piklema_cycles.json';
import piklema_phases_52_06_jul from './52_06_jul/piklema_cycle_phases.json';
import loads_52_06_jul from './52_06_jul/veh_loads.json';
import loads_0_52_06_jul from './52_06_jul/veh_loads_0.json';
import cycles_52_06_jul from './52_06_jul/shov_cycle.json';
import cycles_0_52_06_jul from './52_06_jul/shov_cycle_0.json';
import queues_52_06_jul from './52_06_jul/queues.json';
import trips_52_06_jul from './52_06_jul/vehtrips.json';
import stoppages_52_06_jul from './52_06_jul/idlestoppages.json';
import stoppages2_52_06_jul from './52_06_jul/calc_stoppages.json';

import piklema_52_07_jul from './52_07_jul/piklema_web.json';
import piklema_cycles_52_07_jul from './52_07_jul/piklema_cycles.json';
import piklema_phases_52_07_jul from './52_07_jul/piklema_cycle_phases.json';
import loads_52_07_jul from './52_07_jul/veh_loads.json';
import cycles_52_07_jul from './52_07_jul/shov_cycle.json';
import queues_52_07_jul from './52_07_jul/queues.json';
import trips_52_07_jul from './52_07_jul/vehtrips.json';
import stoppages_52_07_jul from './52_07_jul/idlestoppages.json';
import stoppages2_52_07_jul from './52_07_jul/calc_stoppages.json';

export default {
  '50_09_MAY': {
    start: new Date('2026-05-08 20:00:00'),
    end: new Date('2026-05-09 20:00:00'),
    sets: {
      video_loads: video_loads_50_09_may,
      video_cycles: video_cycles_50_09_may,
      loads: prepareLoads(loads_50_09_may),
      cycles: cycles_50_09_may,
      queues: queues_50_09_may,
      trips: trips_50_09_may,
      stoppages: prepareStoppages(stoppages_50_09_may),
      stoppages2: stoppages2_50_09_may
    }
  },
  '52_09_MAY': {
    start: new Date('2026-05-08 20:00:00'),
    end: new Date('2026-05-09 20:00:00'),
    sets: {
      piklema: piklema_52_09_may,
      piklema_cycles: piklema_cycles_52_09_may,
      piklema_cycles_details: {
        all: piklema_cycles_52_09_may,
        load: piklema_cycles_52_09_may.filter(c => c.EVENT_TYPE === 'cycle'),
        idle: piklema_cycles_52_09_may.filter(c => c.EVENT_TYPE === 'awaiting'),
        self: piklema_cycles_52_09_may.filter(c => c.EVENT_TYPE === 'self-work'),
        uncycles: piklema_cycles_52_09_may.filter(c => c.EVENT_TYPE === 'uncycles')
      },
      piklema_phases: piklema_phases_52_09_may,
      piklema_phases_details: {
        all: piklema_phases_52_09_may,
        toLoad: piklema_phases_52_09_may.filter(c => c.PHASE === 'positioning_to_load'),
        scoop: piklema_phases_52_09_may.filter(c => c.PHASE === 'bucket_load_end'),
        toUnload: piklema_phases_52_09_may.filter(c => c.PHASE === 'unloading_start'),
        unload: piklema_phases_52_09_may.filter(c => c.PHASE === 'unloading_end'),
        awaiting: piklema_phases_52_09_may.filter(c => c.PHASE === 'awaiting'),
      },
      loads: prepareLoads(loads_52_09_may),
      cycles: cycles_52_09_may,
      queues: queues_52_09_may,
      trips: trips_52_09_may,
      stoppages: prepareStoppages(stoppages_52_09_may),
      stoppages2: stoppages2_52_09_may
    }
  },
  '52_10_JUN': {
    start: new Date('2026-06-09 20:00:00'),
    end: new Date('2026-06-10 20:00:00'),
    sets: {
      piklema: piklema_52_10_jun,
      piklema_cycles: piklema_cycles_52_10_jun,
      piklema_cycles_details: {
        all: piklema_cycles_52_10_jun,
        load: piklema_cycles_52_10_jun.filter(c => c.EVENT_TYPE === 'cycle'),
        idle: piklema_cycles_52_10_jun.filter(c => c.EVENT_TYPE === 'awaiting'),
        self: piklema_cycles_52_10_jun.filter(c => c.EVENT_TYPE === 'self-work'),
        uncycles: piklema_cycles_52_10_jun.filter(c => c.EVENT_TYPE === 'uncycles'),
      },
      piklema_phases: piklema_phases_52_10_jun,
      piklema_phases_details: {
        all: piklema_phases_52_10_jun,
        toLoad: piklema_phases_52_10_jun.filter(c => c.PHASE === 'positioning_to_load'),
        scoop: piklema_phases_52_10_jun.filter(c => c.PHASE === 'bucket_load_end'),
        toUnload: piklema_phases_52_10_jun.filter(c => c.PHASE === 'unloading_start'),
        unload: piklema_phases_52_10_jun.filter(c => c.PHASE === 'unloading_end'),
        awaiting: piklema_phases_52_10_jun.filter(c => c.PHASE === 'awaiting'),
      },
      loads: prepareLoads(loads_52_10_jun),
      cycles: cycles_52_10_jun,
      queues: queues_52_10_jun,
      trips: trips_52_10_jun,
      stoppages: prepareStoppages(stoppages_52_10_jun),
      stoppages2: stoppages2_52_10_jun
    }
  },
  '52_06_JUL': {
    start: new Date('2026-07-05 20:00:00'),
    end: new Date('2026-07-06 20:00:00'),
    sets: {
      video_loads: video_loads_52_06_jul,
      video_cycles: video_cycles_52_06_jul,
      piklema: piklema_52_06_jul,
      piklema_cycles: piklema_cycles_52_06_jul,
      piklema_cycles_details: {
        all: piklema_cycles_52_06_jul,
        load: piklema_cycles_52_06_jul.filter(c => c.EVENT_TYPE === 'cycle'),
        idle: piklema_cycles_52_06_jul.filter(c => c.EVENT_TYPE === 'awaiting'),
        self: piklema_cycles_52_06_jul.filter(c => c.EVENT_TYPE === 'self-work'),
        uncycles: piklema_cycles_52_06_jul.filter(c => c.EVENT_TYPE === 'uncycles'),
      },
      piklema_phases: piklema_phases_52_06_jul,
      piklema_phases_details: {
        all: piklema_phases_52_06_jul,
        toLoad: piklema_phases_52_06_jul.filter(c => c.PHASE === 'positioning_to_load'),
        scoop: piklema_phases_52_06_jul.filter(c => c.PHASE === 'bucket_load_end'),
        toUnload: piklema_phases_52_06_jul.filter(c => c.PHASE === 'unloading_start'),
        unload: piklema_phases_52_06_jul.filter(c => c.PHASE === 'unloading_end'),
        awaiting: piklema_phases_52_06_jul.filter(c => c.PHASE === 'awaiting'),
      },
      loads: prepareLoads(loads_52_06_jul),
      loads0: prepareLoads(loads_0_52_06_jul),
      cycles: cycles_52_06_jul,
      cycles0: cycles_0_52_06_jul,
      queues: queues_52_06_jul,
      trips: trips_52_06_jul,
      stoppages: prepareStoppages(stoppages_52_06_jul),
      stoppages2: stoppages2_52_06_jul
    }
  },
  '52_07_JUL': {
    start: new Date('2026-07-06 20:00:00'),
    end: new Date('2026-07-07 20:00:00'),
    sets: {
      piklema: piklema_52_07_jul,
      piklema_cycles: piklema_cycles_52_07_jul,
      piklema_cycles_details: {
        all: piklema_cycles_52_07_jul,
        load: piklema_cycles_52_07_jul.filter(c => c.EVENT_TYPE === 'cycle'),
        idle: piklema_cycles_52_07_jul.filter(c => c.EVENT_TYPE === 'awaiting'),
        self: piklema_cycles_52_07_jul.filter(c => c.EVENT_TYPE === 'self-work'),
        uncycles: piklema_cycles_52_07_jul.filter(c => c.EVENT_TYPE === 'uncycles'),
      },
      piklema_phases: piklema_phases_52_07_jul,
      piklema_phases_details: {
        all: piklema_phases_52_07_jul,
        toLoad: piklema_phases_52_07_jul.filter(c => c.PHASE === 'positioning_to_load'),
        scoop: piklema_phases_52_07_jul.filter(c => c.PHASE === 'bucket_load_end'),
        toUnload: piklema_phases_52_07_jul.filter(c => c.PHASE === 'unloading_start'),
        unload: piklema_phases_52_07_jul.filter(c => c.PHASE === 'unloading_end'),
        awaiting: piklema_phases_52_07_jul.filter(c => c.PHASE === 'awaiting'),
      },
      loads: prepareLoads(loads_52_07_jul),
      cycles: cycles_52_07_jul,
      queues: queues_52_07_jul,
      trips: trips_52_07_jul,
      stoppages: prepareStoppages(stoppages_52_07_jul),
      stoppages2: stoppages2_52_07_jul
    }
  }
};

function prepareLoads (loads) {
  return loads.map(load => ({
    ...load,
    DURATION_SEC: dursec(load.TIME_START, load.TIME_END)
  }));
}

function prepareStoppages (stoppages) {
  return stoppages.map(s => ({
    ...s,
    DURATION_SEC: dursec(s.TIMESTOP, s.TIMEGO)
  }));
}

function dursec (d1, d2) {
  return Math.round((new Date(d2) - new Date(d1)) / 1000);
}
