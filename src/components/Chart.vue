<template>
  <div
    class="Chart"
    :data-borders="borders || undefined"
    :data-updating="updating || undefined"
    :style="style"
  >
    <div class="Chart-Label" v-if="label">
      <div class="Chart-LabelFloat" v-text="label" />
    </div>
    <div class="Chart-Plot">
      <div class="Chart-Rail">
        <template v-for="segment in segments">
          <span
            class="Chart-Segment"
            :data-active="segment.active || undefined"
            :data-meta="segment.meta || undefined"
            :data-last="segment.last || undefined"
            :data-color="segment.color || color || 'unknown'"
            :data-state="segment.state || undefined"
            @dblclick="onSegmentClick($event, segment)"
            @mouseleave="onSegmentLeave($event, segment)"
          >
            <span class="Chart-SegmentFill"
              :style="segment.h ? `height: ${segment.h}` : undefined"
            />
          </span>
        </template>
      </div>
      <div class="Chart-Timeline">
        <template v-for="tick in ticks">
          <span class="Chart-Tick" :data-type="tick.type" :data-meta="tick.meta" @dblclick="onTickDblClick(tick)">
            <span class="Chart-TickTick" />
            <span class="Chart-TickLabel" v-text="tick.label" v-if="tick.label" />
          </span>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Chart',
  components: {
  },
  emits: ['updated', 'time'],
  props: {
    label: String,
    segments: Array,
    ticks: Array,
    borders: Boolean,
    color: String,
    tick: Number,
    bar: Number
  },
  data () {
    const { bar, tick } = this;
    const style = {};

    if (this.bar) style['--bar'] = `${bar}px`;
    if (this.tick) style['--tick'] = `${tick}px`;

    return {
      style,
      updating: false
    };
  },
  methods: {
    onTickDblClick (tick) {
      this.$emit('time', tick.end);
    },
    async onSegmentClick (e, segment) {
      try {
        await navigator.clipboard.writeText(segment.meta);

        e.target.setAttribute('data-copied', true);

        console.log('Text copied successfully!', e.target);
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    },
    onSegmentLeave (e, segment) {
      e.target.removeAttribute('data-copied');
    }
  },
  updated () {
    this.$emit('updated');
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/common.scss';

$tick: var(--tick);
$bar: var(--bar);

.Chart {
  --tick: 2px;
  --bar: 40px;

  display: flex;
  padding-top: 8px;
}

.Chart-Label {
  flex: 0 0 160px;
  white-space: pre;
}

.Chart-LabelFloat {
  position: fixed;
  background-color: #fff8;
  backdrop-filter: blur(10px);
  padding-right: 8px;
  z-index: 100;
  height: $bar;
}

.Chart-Rail {
  background-color: #eee;
  display: flex;
  gap: 0px;
  align-items: flex-end;
  height: $bar;
}

.Chart-Segment {
  display: block;
  position: relative;
  box-sizing: border-box;
  flex: 0 0 $tick;
  width: $tick;
  height: $bar;
  background-color: #ddd;
  display: flex;
  align-items: flex-end;

  &:hover {
    &, .Chart-SegmentFill {
      background-color: #000 !important;
    }
  }

  &[data-meta]:hover {
    &:before {
      content: attr(data-meta);
      position: absolute;
      display: block;
      background-color: #000;
      color: #fff;
      padding: 2px 4px;
      font-size: 9px;
      line-height: 8px;
      bottom: $bar;
      right: 0;
      white-space: pre;
    }
  }
  &[data-meta][data-copied] {
    &:before {
      background-color: #00f !important;
    }
  }

}

.Chart-SegmentFill {
  display: block;
  width: $tick;
  height: $bar;
  background-color: #ddd;
  pointer-events: none;

  .Chart-Segment[data-active][data-color="unknown"] & {
    background-color: #800;
  }
  .Chart-Segment[data-active][data-color="black"] & {
    background-color: #000;
  }
  .Chart-Segment[data-active][data-color="blue"] & {
    background-color: #00f;
  }
  .Chart-Segment[data-active][data-color="blue-50"] & {
    background-color: #00f;
  }
  .Chart-Segment[data-active][data-color="blue-40"] & {
    background-color: #33f;
  }
  .Chart-Segment[data-active][data-color="blue-30"] & {
    background-color: #66f;
  }
  .Chart-Segment[data-active][data-color="blue-20"] & {
    background-color: #99f;
  }
  .Chart-Segment[data-active][data-color="magenta"] & {
    background-color: #f0f;
  }
  .Chart-Segment[data-active][data-color="magenta-50"] & {
    background-color: #f0f;
  }
  .Chart-Segment[data-active][data-color="magenta-40"] & {
    background-color: #f3f;
  }
  .Chart-Segment[data-active][data-color="magenta-30"] & {
    background-color: #f6f;
  }
  .Chart-Segment[data-active][data-color="magenta-20"] & {
    background-color: #f9f;
  }
  .Chart-Segment[data-active][data-color="cyan"] & {
    background-color: #0ff;
  }
  .Chart-Segment[data-active][data-color="cyan-50"] & {
    background-color: #055;
  }
  .Chart-Segment[data-active][data-color="cyan-40"] & {
    background-color: #077;
  }
  .Chart-Segment[data-active][data-color="cyan-30"] & {
    background-color: #099;
  }
  .Chart-Segment[data-active][data-color="cyan-20"] & {
    background-color: #0bb;
  }
  .Chart-Segment[data-active][data-color="green"] & {
    background-color: #0f0;
  }
  .Chart-Segment[data-active][data-color="green-50"] & {
    background-color: #050;
  }
  .Chart-Segment[data-active][data-color="green-40"] & {
    background-color: #070;
  }
  .Chart-Segment[data-active][data-color="green-30"] & {
    background-color: #090;
  }
  .Chart-Segment[data-active][data-color="green-20"] & {
    background-color: #0b0;
  }
  .Chart-Segment[data-active][data-color="yellow"] & {
    background-color: #ff0;
  }
  .Chart-Segment[data-active][data-color="red"] & {
    background-color: #f00;
  }
  .Chart-Segment[data-active][data-color="red-50"] & {
    background-color: #f00;
  }
  .Chart-Segment[data-active][data-color="red-40"] & {
    background-color: #f44;
  }
  .Chart-Segment[data-active][data-color="red-30"] & {
    background-color: #f88;
  }
  .Chart-Segment[data-active][data-color="red-20"] & {
    background-color: #faa;
  }
}

.Chart[data-updating] {
  opacity: 0.5;
}

.Chart[data-borders] {
  .Chart-Segment[data-last] {
    border-right: 1px #000 solid;

    &:after {
      content: '';
      display: block;
      box-sizing: border-box;
      position: absolute;
      top: -8px;
      left: 0;
      height: 8px;
      width: $tick;
      border-right: 1px #000 solid;
    }
  }
}

.Chart-Timeline {
  height: 32px;
  display: flex;
  gap: 0px;
}

.Chart-Tick {
  flex: 0 0 $tick;
  overflow: visible;
  text-align: right;
  position: relative;
  height: 32px;

  &[data-type="m"] .Chart-TickTick {
    height: 8px;
    border-right: 1px #ddd solid;
  }

  &[data-type="10m"] .Chart-TickTick {
    height: 16px;
    border-right: 1px #ddd solid;
  }

  &[data-type="h"] .Chart-TickTick {
    height: 32px;
    border-right: 1px #000 solid;
  }

  &[data-meta]:hover {
    background-color: #000;

    .Chart-TickTick {
      border-color: #000;
    }

    &:before {
      content: attr(data-meta);
      position: absolute;
      z-index: 100;
      display: block;
      background-color: #000;
      color: #fff;
      padding: 2px 4px;
      font-size: 9px;
      line-height: 8px;
      top: 20px;
      right: 0;
      white-space: nowrap;
      pointer-events: none;
    }
  }
}

.Chart-TickTick {
  position: absolute;
  top: 0;
  right: 0;
  display: block;
  width: $tick;
  pointer-events: none;
}

.Chart-TickLabel {
  position: absolute;
  right: 0;
  bottom: 0;
  pointer-events: none;
}
</style>
