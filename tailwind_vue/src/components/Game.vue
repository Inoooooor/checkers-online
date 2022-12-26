<template>
  <section id="game_comp" class="bg-[#CAF0F8] row-start-2 col-start-2 row-end-[-5] col-end-[-2]  rounded-xl bg-opacity-30 grid grid-rows-6 grid-cols-5">
    <div id="board" class=" bg-[#CAF0F8] col-span-full row-span-4 row-start-2 aspect-square flex flex-wrap overflow-scroll">
      <div 
        v-for="y in field"
        class=" w-full h-[12.5%] flex"
        >
        <span 
          v-bind:class="`row_num${field.indexOf(y)}`"
          v-for="x in y"
          class=" h-full w-[12.5%]"
          
          >
        </span>
      </div>
    </div>

  </section>
</template>

<script>
  export default {
    data() {
      return {
        field: Array(8).fill().map(() => Array(8).fill(0)),
      }
    },
    mounted() {
      console.log(this.field[1]);
    }
  }

</script>

<style>
.row_num1:nth-child(odd), .row_num3:nth-child(odd), .row_num5:nth-child(odd), .row_num7:nth-child(odd) {
  background: black;
}

.row_num2:nth-child(even), .row_num4:nth-child(even), .row_num6:nth-child(even), .row_num0:nth-child(even) {
  background: black;
}

</style>