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
    @click="updateOnlineStatus(1)"
    class="col-span-4 col-start-3 col-end-7 row-start-[9] font-mono text-2xl bg-[#CAF0F8] rounded-xl text-[#03045E]"
  >
    player 1
  </button>
  <button
    @click="updateOnlineStatus(2)"
    class="col-span-4 col-start-3 col-end-7 row-start-[11] font-mono text-2xl bg-[#CAF0F8] rounded-xl text-[#03045E]"
  >
    player 2
  </button>
  <Transition name="bounce">
    <p
      v-if="wait_notification"
      class="font-mono font-semibold text-[#CAF0F8] tracking-[.5rem] col-start-2 col-end-[-2] row-start-7 row-span-2 grid place-items-center text-center animate-pulse"
    >
      WAITING FOR THE OPPONENT
    </p>
  </Transition>
</template>

<script>
import { setDoc, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import db from "../firebase.js";

export default {
  data() {
    return {
      wait_notification: false,
      isBothOnline: false,
    };
  },
  methods: {
    async readOnline() {
      try {
        const docRef = doc(db, 'game', 'env');
        const docSnap = await getDoc(docRef);
        const onlineFlag = docSnap.data();
        // console.log('reading...');
        this.isBothOnline = (
          onlineFlag.isPlayerOneOnline && 
          onlineFlag.isPlayerTwoOnline
          ) ?
          true :
          false;
      } catch (error) {
        console.log(error);
      }
      // return currentOnline;
    },
    async updateOnlineStatus(playerNum) {
      const docRef = doc(db, 'game', 'env');
      try {
        if (playerNum === 1) {
          await updateDoc(docRef, {
            isPlayerOneOnline: true,
          })
          this.checkOnlineForStart(playerNum);
        } else if (playerNum === 2) {
          await updateDoc(docRef, {
            isPlayerTwoOnline: true,
          })
          this.checkOnlineForStart(playerNum);
        }

      } catch (error) {
        console.log(error);
      }
    },
    async checkOnlineForStart(playerNum) {

      // this.wait_notification = this.isBothOnline ? false : true;
      await this.readOnline();
      if (this.isBothOnline) {
        this.$router.push(`/player${playerNum}`);
      } else {
        this.wait_notification = true;
        let interval = setInterval(async () => {
          await this.readOnline();
          if (this.isBothOnline) {
            clearInterval(interval);
            this.$router.push(`/player${playerNum}`);
          }
        }, 1000);
      }
    },
  },
  mounted() {
    // this.wait_notification = !this.wait_notification;
    // this.readOnline();
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
