import { createRouter, createWebHistory } from 'vue-router';
import ChartView from '../views/ChartView.vue';
import DistribView from '../views/DistribView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      component: ChartView
    },
    {
      path: '/:ds',
      name: 'dataset',
      component: ChartView,
      props: true
    },
    {
      path: '/stats/:ds/:l1',
      name: 'distrib',
      component: DistribView,
      props: true
    }
  ],
  scrollBehavior () {
    return { top: 0 };
  }
});

export default router;
