<template>
  <div class="Image"
    :data-fit="fit"
    :data-position="position"
    :data-size="size"
    :data-orientation="orientation"
    :data-ratio="ratio"
  >
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
    size: [String, Number], // N of grid modules | fill | auto // default = fill
    orientation: String, // vertical | horizontal
    ratio: String // 1:1 | 6:5 | 4:3 | 3:2 | 2:1 | 3:1 | 16:9
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

<style scoped lang="scss">
@use 'sass:math';
@import '@/assets/scss/common.scss';

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
  background-color: $color-grey;
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

.Image[data-size] {
  --size: attr(data-size number);

  &[data-ratio="1:1"][data-orientation="vertical"] {
    .Image-Image { @include image(vertical, 1); }
  }
  &[data-ratio="6:5"][data-orientation="vertical"] {
    .Image-Image { @include image(vertical, math.div(6, 5)); }
  }
  &[data-ratio="4:3"][data-orientation="vertical"] {
    .Image-Image { @include image(vertical, math.div(4, 3)); }
  }
  &[data-ratio="3:2"][data-orientation="vertical"] {
    .Image-Image { @include image(vertical, math.div(3, 2)); }
  }
  &[data-ratio="2:1"][data-orientation="vertical"] {
    .Image-Image { @include image(vertical, 2); }
  }
  &[data-ratio="3:1"][data-orientation="vertical"] {
    .Image-Image { @include image(vertical, 3); }
  }
  &[data-ratio="16:9"][data-orientation="vertical"] {
    .Image-Image { @include image(vertical, math.div(16, 9)); }
  }

  &[data-ratio="1:1"][data-orientation="horizontal"] {
    .Image-Image { @include image(horizontal, 1); }
  }
  &[data-ratio="6:5"][data-orientation="horizontal"] {
    .Image-Image { @include image(horizontal, math.div(6, 5)); }
  }
  &[data-ratio="4:3"][data-orientation="horizontal"] {
    .Image-Image { @include image(horizontal, math.div(4, 3)); }
  }
  &[data-ratio="3:2"][data-orientation="horizontal"] {
    .Image-Image { @include image(horizontal, math.div(3, 2)); }
  }
  &[data-ratio="2:1"][data-orientation="horizontal"] {
    .Image-Image { @include image(horizontal, 2); }
  }
  &[data-ratio="3:1"][data-orientation="horizontal"] {
    .Image-Image { @include image(horizontal, 3); }
  }
  &[data-ratio="16:9"][data-orientation="horizontal"] {
    .Image-Image { @include image(horizontal, math.div(16, 9)); }
  }
}
</style>
