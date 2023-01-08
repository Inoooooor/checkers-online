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
      beforeRouteLeave(to, from, next) {
        alert('bruh');
        const answer = window.confirm('Вы хотите уйти? Вы блин не доиграли!')
        if (answer) {
          next()
        } else {
          next(false)
        }
      }
    },
    {
      path: "/player2",
      name: "player2",
      component: Game,
      beforeRouteLeave(to, from, next) {
        alert('bruh');
        const answer = window.confirm('Вы хотите уйти? Вы блин не доиграли!')
        if (answer) {
          next()
        } else {
          next(false)
        }
      },
    },
    {
      path: "/welcome",
      name: "welcome",
      component: Welcome,
    },
  ],
});

// router.beforeEach((to, from) => {
//   if(from.name === 'player1') {
//     const answer = window.confirm('Вы хотите уйти? Вы не доиграли!')
//     if (answer) {
//       alert('You left the game!')
//     }
//   }
//   if(from.name === 'welcome' && to.name === 'player2') {
//     console.log('you went from welcome page to player2')
//   }
// });

// beforeRouteLeave(to, from, next) {
//   const answer = window.confirm('Вы хотите уйти? У вас есть несохранённые изменения!')
//   if (answer) {
//     next()
//   } else {
//     next(false)
//   }
// }


export default router;
