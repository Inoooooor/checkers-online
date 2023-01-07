<template>
  <div
    id="intro_logo"
    class="col-span-3 row-span-3 row-start-4 col-start-2 w-full col-end-8 flex flex-col justify-evenly items-center"
  >
    <img
      class="shadow-2xl border-[0.7rem] border-[#CAF0F8] rounded-md w-28"
      src="../images/checkers_logo.png"
      alt="Checkers logo"
    />
    <p class="font-mono font-semibold text-[#CAF0F8] tracking-[.5rem]">
      CHECKERS
    </p>
  </div>
  <button
    @click="this.$router.push('/player1')"
    class="col-span-4 col-start-3 col-end-7 row-start-[9] font-mono text-2xl bg-[#CAF0F8] rounded-xl text-[#03045E]"
  >
    player 1
  </button>
  <button
    @click="this.$router.push('/player2')"
    class="col-span-4 col-start-3 col-end-7 row-start-[11] font-mono text-2xl bg-[#CAF0F8] rounded-xl text-[#03045E]"
  >
    player 2
  </button>
  <Transition name="bounce">
    <p
      v-if="show"
      class="font-mono font-semibold text-[#CAF0F8] tracking-[.5rem] col-start-2 col-end-[-2] row-start-7 row-span-2 grid place-items-center text-center"
    >
      WAITING FOR THE OPPONENT
    </p>
  </Transition>
</template>

<script>
import { setDoc, doc, getDoc, onSnapshot } from "firebase/firestore";
import db from "../firebase.js";

export default {
  data() {
    return {
      show: false,
    };
  },
  methods: {
    async playersCount() {
      try {
        const docRef = doc(db, 'game', 'env');
        const docSnap = await getDoc(docRef);
        let currentOnline = docSnap.data().playersOnline;
        console.log(currentOnline);
      } catch (error) {
        console.log(error)
      }
    },
  },
  mounted() {
    this.show = !this.show;
    this.playersCount();
  },
};
</script>

<style>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
