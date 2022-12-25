<template>
  <RouterView></RouterView>
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
      this.$router.push('welcome');
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
  grid-template: 1rem repeat(12, 1fr) 1rem / 1rem repeat(6, 1fr) 1rem;
}
</style>
