import { createRouter, createWebHistory } from 'vue-router'

export const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('/src/views/ViewIndex.vue')
  },
  {
    path: '/targets',
    name: 'targets',
    component: () => import('/src/views/ViewTargets.vue'),
    beforeEnter: (to) => {
      return to.name === 'targets' ? { name: 'ancient-sites' } : true
    },
    children: [
      {
        path: '/ancient-sites',
        name: 'site',
        component: () => import('/src/views/ViewTargets.vue'),
      },
      {
        path: '/meteor-impact-craters',
        name: 'impact-crater',
        component: () => import('/src/views/ViewTargets.vue')
      },
      {
        path: '/volcanoes',
        name: 'volcano',
        component: () => import('/src/views/ViewTargets.vue')
      },
      {
        path: '/all-locations',
        name: 'all',
        component: () => import('/src/views/ViewTargets.vue')
      }
    ]
  },
  {
    path: '/radials',
    name: 'radials',
    component: () => import('/src/views/ViewRadials.vue')
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('/src/views/ViewNotFound.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('/src/views/ViewNotFound.vue')
  }
]

export default () => createRouter({
  history: createWebHistory(),
  routes
})
