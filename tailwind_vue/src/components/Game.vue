<template>
  <section id="game_comp" class="bg-[#CAF0F8] row-start-2 col-start-2 row-end-[-5] col-end-[-2]  rounded-xl bg-opacity-30 grid grid-rows-6 grid-cols-5">
    <div id="board" class=" bg-[#CAF0F8] col-span-full row-span-4 row-start-2 aspect-square flex flex-wrap">
      <div 
        v-for="y in field"
        class=" w-full h-[12.5%] flex"
        >
        <span 
          id="field_square"
          v-bind:class="`row_num${field.indexOf(y)}`"
          v-for="x in y"
          class=" h-full w-[12.5%] flex justify-center items-center"
          @click="coordination(y, this)"
          >
          <div class=" w-[80%] h-[80%] bg-white rounded-full"
            v-if="x == 1">
          </div>
          <div class=" w-[80%] h-[80%] bg-black rounded-full"
            v-if="x == 2">
          </div>
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
    methods: {
      initRender() {
        for (let y in this.field) {
          for (let x in this.field[y]) {
            if (y % 2 == 0 && y <= 2) {   /* Drawing white checkers. 1 - white checker */
              if (x % 2 == 1) {
                this.field[y][x] = 1;
              }
            } else if (y % 2 == 1 && y <= 2) {
                if (x % 2 == 0) {
                  this.field[y][x] = 1;
                }
            } else if (y % 2 == 1 && y >= 5) {     /* Drawing black checkers. 2 - black checker */
              if (x % 2 == 0) {
                this.field[y][x] = 2;
              }
            } else if (y % 2 == 0 && y >= 5) {
                if (x % 2 == 1) {
                  this.field[y][x] = 2;
                }
            }
          }
          // console.log(this.field[y]);
          // break;
        }
      },
      coordination(y, x) {
        console.log(this.field.indexOf(y), x);
      }
    },
    mounted() {
      this.initRender();
      console.log(this.field[0][1]);
    }
  }

</script>

<style>
.row_num1:nth-child(odd), .row_num3:nth-child(odd), .row_num5:nth-child(odd), .row_num7:nth-child(odd) {
  background: #0077B6;
}

.row_num2:nth-child(even), .row_num4:nth-child(even), .row_num6:nth-child(even), .row_num0:nth-child(even) {
  background: #0077B6;
}

</style>