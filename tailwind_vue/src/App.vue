<template>
  <div id="intro_logo" class="shadow-2xl border-[0.7rem] border-[#CAF0F8] rounded-md bg-black col-span-3 row-span-3 row-start-4 col-start-3 w-full">
    <img class="w-full" src="./images/checkers_logo.png" alt="Checkers logo">
  </div>
  <!-- <div class=" bg-slate-50 col-span-3 col-start-2"></div> -->
</template>

<script>
  import { RouterLink, RouterView } from "vue-router";
  import { collection, addDoc } from "firebase/firestore"; 
  import db from './firebase.js';

  export default {
    data() {
      return {
        people: [],
      }
    },
    methods: {
      async addData() {
        try {
          const docRef = await addDoc(collection(db, "users"), {
            first: "Ada",
            last: "Lovelace",
            born: 1815
          });
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
    },
    mounted() {
      // this.addData();
    }
  }

</script>

<style>
html {
  background-color: #0077B6;
}
#app {
  height: 100vh;
  display: grid;
  grid-template: repeat(12, 1fr) / 1rem repeat(6, 1fr) 1rem;
}
</style>
