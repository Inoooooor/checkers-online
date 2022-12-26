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
          >
          <div @click="coordination(y, x)" class=" w-[80%] h-[80%] bg-white rounded-full"
            v-if="x > 0 && x < 13">
          </div>
          <div @click="chosenCheckerHint(y, x)" class=" w-[80%] h-[80%] bg-black rounded-full"
            v-if="x > 12 && x < 25">
          </div>
          <div @click="coordination(y, x)" class=" w-full h-full bg-white bg-opacity-50"
            v-if="x == 100">
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
        isChosen: 1,
        field: Array(8).fill().map(() => Array(8).fill(0)),
      }
    },
    methods: {
      initRender() {
        let checker_counter = 1;
        for (let y in this.field) {
          for (let x in this.field[y]) {
            if (y % 2 == 0 && y <= 2) {   /* Drawing white checkers. 1-12 - white checker */
              if (x % 2 == 1) {
                this.field[y][x] = checker_counter;
                checker_counter++;
              }
            } else if (y % 2 == 1 && y <= 2) {
                if (x % 2 == 0) {
                  this.field[y][x] = checker_counter;
                  checker_counter++;
                }
            } else if (y % 2 == 1 && y >= 5) {     /* Drawing black checkers. 13-24 - black checker */
              if (x % 2 == 0) {
                this.field[y][x] = checker_counter;
                checker_counter++;
              }
            } else if (y % 2 == 0 && y >= 5) {
                if (x % 2 == 1) {
                  this.field[y][x] = checker_counter;
                  checker_counter++;
                }
            }
          }
          // console.log(this.field[y]);
          // break;
        }
      },
      coordination(y, x) {
        console.log(this.field.indexOf(y), y.indexOf(x));
      },
      chosenCheckerHint(y, x) {
        const y_axis = this.field.indexOf(y);
        const x_axis = y.indexOf(x);
        let freindsAround = 0;

        // Analyzing chosen checker's surroundings
        for (let i = y_axis - 1; i < y_axis + 2; i++) {
          for (let j = x_axis - 1; j < x_axis + 2; j++) {
            if (i == y_axis && j == x_axis) continue;
            if (i > 7) break; /* Escaped counting unexisting squares at bottom */
            if (this.field[i][j] > 12) freindsAround++;
          }
        }
        console.log('Friends around:',freindsAround);
        // this.field[y_axis - 1][x_axis - 1] = 100;
        // this.field[y_axis - 1][x_axis + 1] = 100;
      }
    },
    mounted() {
      this.initRender();
      // console.log(this.field);
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

.chosen {
  background: blue;
}
</style>