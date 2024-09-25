<template>
  <div class="Image" :data-fit="fit" :data-position="position" :data-size="size">
    <img class="Image-Image" :src="src" v-if="mode !== 'bg'" />
    <div class="Image-Image" :style="{ backgroundImage: `url(${src})` }" v-else />
    <div class="Image-Caption" v-html="caption" v-if="caption" />
  </div>
</template>

<script>
const base = '/images';

export default {
  name: 'Image',
  props: {
    caption: String,
    image: [Object, String],
    fit: String,
    mode: String, // bg | img // default = bg
    position: String,
    size: String // fill | auto // default = fill
  },
  computed: {
    src () {
      const src = typeof this.image === 'object' ? this.image.src : this.image;

      if (!src || src.startsWith('data:') || src.startsWith('blob:')) {
        return src;
      }

      const path = `${base}/${src}`;

      return new URL(path, import.meta.url).href;
    }
  }
};
</script>

<style scoped>
.Image {
  max-width: 100%;
  position: relative;
}

.Image-Image {
  max-width: 100%;
  position: relative;
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: no-repeat;
}

.Image[data-fit="contain"] {
  .Image-Image {
    background-size: contain;
  }
}

.Image[data-position="top-left"] {
  .Image-Image {
    background-position: 0 0;
  }
}

.Image[data-size="auto"] {
  text-align: center;

  .Image-Image {
    width: auto;
    max-width: 100%;
    height: auto;
  }
}
</style>
