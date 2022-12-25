<template>
  
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
      this.addData();
    }
  }

</script>

<style>
html {
  height: 100vh;
  font-size: 20px;
}
</style>
