<template>
  <RouterView></RouterView>
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
import { collection, addDoc, doc, setDoc, onSnapshot } from "firebase/firestore";
import db from "./firebase.js";
import { useCounterStore } from './stores/counter'

// const unsub = onSnapshot(doc(db, "game", "field"), (doc) => {
//     console.log("Current data: ", JSON.parse(doc.data().field));
// });


export default {
  data() {
    return {
      people: [],
    };
  },
  setup() {
    const store = useCounterStore();
    return {
      // you can return the whole store instance to use it in the template
      store,
    }
  },

  methods: {
  },
  mounted() {
    // this.addData();
    // this.changeField();
    // this.$router.push("welcome");
    // console.log(this.$store.state());
    // this.store.count++;
    // console.log(this.store.count);
  },
};
</script>

<style>
html {
  background-color: #0077b6;
}

#app {
  height: 100vh;
  display: grid;
  grid-template: 1rem repeat(12, 1fr) 1rem / 1rem repeat(6, 1fr) 1rem;
}
</style>
