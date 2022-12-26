<template>
  <div id="intro_logo" class="col-span-3 row-span-3 row-start-4 col-start-2 w-full col-end-8 flex flex-col justify-evenly items-center">
    <img class="shadow-2xl border-[0.7rem] border-[#CAF0F8] rounded-md w-28" src="../images/checkers_logo.png" alt="Checkers logo">
    <p class=" font-mono font-semibold text-[#CAF0F8] tracking-[.5rem]">CHECKERS</p>
  </div>
  <button 
    @click="this.$router.push('/game')"
    class="col-span-4 col-start-3 col-end-7 row-start-[9] font-mono text-2xl bg-[#CAF0F8] rounded-xl text-[#03045E]"
    >Play</button>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        methods: {
          
        }
    }
</script>

<style>
</style>