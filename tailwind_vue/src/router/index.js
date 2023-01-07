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
      path: "/player1",
      name: "player1",
      component: Game,
    },
    {
      path: "/player2",
      name: "player2",
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
