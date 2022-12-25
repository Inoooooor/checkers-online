import { createRouter, createWebHistory } from "vue-router";
import App from '../App.vue'
import Login from '../components/Login.vue'
import Welcome from '../components/Welcome-page.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: App,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/welcome",
      name: "welcome",
      component: Welcome,
    },
  ],
});

export default router;
