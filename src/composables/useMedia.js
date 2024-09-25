import { ref, watchEffect } from 'vue';

export const isMobile = () => {
  return isMobileReactive().value;
};

export const isMobileReactive = () => {
  const ret = ref(false);

  watchEffect((onInvalidate) => {
    const styles = getComputedStyle(document.body);
    const widthBreakpoint = parseInt(
      styles.getPropertyValue('--mobile-width-breakpoint')
    );

    if (!widthBreakpoint) {
      console.error('Cannot detect device: --mobile-width-breakpoint not set');
      return;
    }

    const query = `(max-width: ${widthBreakpoint}px)`;
    const media = window.matchMedia(query);

    if (media.matches !== ret.value) {
      ret.value = media.matches;
    }

    const onChange = () => {
      ret.value = media.matches;
    };

    media.addEventListener('change', onChange);

    onInvalidate(() => {
      media.removeEventListener('change', onChange);
    });
  });

  return ret;
};
