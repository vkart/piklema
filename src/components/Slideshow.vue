<template>
  <div class="Slideshow" v-show="visible">
    <div class="Slideshow-Slides">
      <Image
        v-for="(image, i) in images"
        :key="image.id"
        :image="image"
        class="Slideshow-Slide"
        :data-index="i"
        v-show="i === index"
      />
    </div>
    <div class="Slideshow-Controls">
      <Button type="Icon" icon="LeftArrow" size="small" @click.stop="prev" />
      <Button type="Icon" icon="RightArrow" size="small" @click.stop="next" />
      <Button type="Icon" icon="Close" size="small" @click.stop="stop" />
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button.vue';
import Image from '@/components/Image.vue';

export default {
  name: 'Slideshow',
  components: {
    Button,
    Image
  },
  data () {
    return {
      visible: false,
      images: null,
      index: null
    };
  },
  methods: {
    start (e) {
      const image = e.detail;
      const els = Array.from(document.querySelectorAll('[data-fullscreen]'));
      const images = els.map(el => ({ src: el.dataset.fullscreen }));

      this.images = images;

      const index = images.findIndex(item => item.src === image.src);

      this.index = index >= 0 ? index : null;
      this.visible = true;
    },
    stop () {
      this.images = null;
      this.index = null;
      this.visible = false;
    },
    next () {
      this.index = (this.index + 1) % this.images.length;
    },
    prev () {
      this.index = this.index - 1;

      if (this.index < 0) this.index = this.images.length - 1;
    },
    onKeyDown (e) {
      switch (e.key) {
        case 'Escape':
          this.stop();
          break;
        case 'ArrowRight':
          this.next();
          break;
        case 'ArrowLeft':
          this.prev();
          break;
      }
    }
  },
  mounted () {
    this.eventListener = document.addEventListener('slideshow', this.start);
    this.keyevent = document.addEventListener('keydown', this.onKeyDown);
  },
  unmounted () {
    document.removeEventListener('slideshow', this.eventListener);
    document.removeEventListener('keydown', this.keyevent);
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/common.scss';

.Slideshow {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
}

.Slideshow-Slides {
  width: 100vw;
  height: 100vh;
}

.Slideshow-Slide {
  ::v-deep img {
    display: block;
    max-width: 100vw;
    max-height: 100vh;
    margin: auto;
  }
}

.Slideshow-Controls {
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 110;
  display: flex;
  gap: $microgrid;
  padding: $microgrid
}
</style>
