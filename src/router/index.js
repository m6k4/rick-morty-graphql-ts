import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
      // path: "*",
      path: '/:catchAll(.*)',
      name: 'NotFound',
      redirect: '/',
    },
    { 
      path: '/',
      name: 'Characters',
      component: () => import(/* webpackChunkName: "characters" */ '../views/Characters.vue'),
    }
  ]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})


export default router;
