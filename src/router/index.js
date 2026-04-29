import { createRouter, createWebHistory } from 'vue-router';
import FontsListView from '../views/FontsListView.vue';
import CaseView from '../views/CaseView.vue';
import FontView from '../views/FontView.vue';
import IntroView from '../views/IntroView.vue';
import TermsView from '../views/TermsView.vue';
import TryView from '../views/TryView.vue';

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
      path: '/try/:id',
      name: 'try',
      component: TryView,
      props: true
    },
    {
      path: '/cases',
      name: 'cases',
      component: CaseView,
      props: true
    },
    {
      path: '/cases/:id',
      name: 'case',
      component: CaseView,
      props: true
    },
    {
      path: '/intro',
      name: 'intro',
      component: IntroView
    },
    {
      path: '/terms',
      name: 'terms',
      component: TermsView
    }
  ],
  scrollBehavior () {
    // always scroll to top
    return { top: 0 };
  }
});

export default router;
