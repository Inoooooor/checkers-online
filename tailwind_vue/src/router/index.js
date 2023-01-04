import { createRouter, createWebHistory } from "vue-router";
import App from '../App.vue'
import Game from '../components/Game.vue'
import Welcome from '../components/Welcome-page.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Welcome,
    },
    {
      path: "/game",
      name: "game",
      component: Game,
    },
    {
      path: "/welcome",
      name: "welcome",
      component: Welcome,
    },
  ],
});

export default router;
