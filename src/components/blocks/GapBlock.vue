<template>
  <div class="Gap" :style="{ height: block.size + 'px' }" />
</template>

<script>
export default {
  name: 'GapBlock',
  props: {
    block: Object
  }
};
</script>
