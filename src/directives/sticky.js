import { ref, watchEffect } from 'vue';

const sticky = {
  mounted: (el, binding) => {
    const {
      top = '0px',
      right = '0px',
      bottom = '0px',
      left = '0px',
      threshold = 1
    } = binding.value;

    const stuck = ref(false);

    const observer = new IntersectionObserver(
      ([entry]) => { stuck.value = !entry.isIntersecting; },
      {
        rootMargin: `${top} ${right} ${bottom} ${left}`,
        threshold
      }
    );

    observer.observe(el);

    watchEffect(() => {
      if (stuck.value) {
        el.setAttribute('data-stuck', '');
      } else {
        el.removeAttribute('data-stuck');
      }
    });
  }
};

export {
  sticky
};
