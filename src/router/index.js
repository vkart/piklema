import { createRouter, createWebHistory } from 'vue-router';
import FontsListView from '../views/FontsListView.vue';
import FontView from '../views/FontView.vue';
import IntroView from '../views/IntroView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: to => ({ path: '/fonts' })
    },
    {
      path: '/fonts',
      name: 'fonts',
      component: FontsListView
    },
    {
      path: '/fonts/:id',
      name: 'font',
      component: FontView,
      props: true
    },
    {
      path: '/intro',
      name: 'intro',
      component: IntroView
    }
  ],
  scrollBehavior () {
    // always scroll to top
    return { top: 0 };
  }
});

export default router;
