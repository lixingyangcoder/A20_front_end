import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:layout-dashboard',
      order: -1,
      title: $t('page.dashboard.title'),
    },
    name: 'Dashboard',
    path: '/dashboard',
    children: [
      {
        name: 'Analytics',
        path: '/analytics',
        component: () => import('#/views/dashboard/analytics/index.vue'),
        meta: {
          affixTab: true,
          icon: 'lucide:area-chart',
          title: $t('page.dashboard.analytics'),
        },
      },
      {
        name: 'Workspace',
        path: '/workspace',
        component: () => import('#/views/dashboard/workspace/index.vue'),
        meta: {
          icon: 'carbon:workspace',
          title: $t('page.dashboard.workspace'),
        },
      },
      {
        name: 'Analytics2',
        path: '/analytics2',
        component: () => import('#/views/dashboard/analytics2/index.vue'),
        meta: {
          icon: 'lucide:bar-chart-3',
          title: '分析页2',
        },
      },
      {
        name: 'Demo_1',
        path: '/demo_1',
        component: () => import('#/views/dashboard/demo_1/index.vue'),
        meta: {
          icon: 'lucide:bar-chart-3',
          title: 'demo1',
        },
      },
    ],
  },
];

export default routes;
