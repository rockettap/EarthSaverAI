import { createRouter, createWebHashHistory } from 'vue-router'

import { parseSelectionQuery } from '@/router/selection'
import DataView from '@/views/DataView.vue'
import HomeView from '@/views/HomeView.vue'
import TableView from '@/views/TableView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@/views/DataSearchView.vue'),
    },
    {
      path: '/data',
      beforeEnter: (to) => {
        if (!parseSelectionQuery(to.query)) {
          return { name: 'search' }
        }
      },
      children: [
        {
          path: 'table',
          name: 'data-table',
          component: TableView,
        },
        {
          path: 'chart',
          name: 'data-chart',
          component: () => import('@/views/ChartView.vue'),
        },
        {
          path: '3d-model',
          name: 'data-3d-model',
          component: () => import('@/views/ModelView.vue'),
        },
      ],
      component: DataView,
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
})

export default router
