<template>
  <section
    id="game_comp"
    class="bg-[#CAF0F8] row-start-2 col-start-2 row-end-[-5] col-end-[-2] rounded-xl bg-opacity-30 grid grid-rows-6 grid-cols-5"
  >
    <div
      id="board"
      :class="{ opponents_board: isPlayerTwo }"
      class="bg-[#CAF0F8] col-span-full row-span-4 row-start-2 aspect-square flex flex-wrap"
    >
      <div v-for="y in field" class="w-full h-[12.5%] flex">
        <span
          id="field_square"
          v-bind:class="`row_num${field.indexOf(y)}`"
          v-for="x in y"
          class="h-full w-[12.5%] flex justify-center items-center"
        >
          <div
            id="white_checker"
            @click="chosenCheckerHint(y, x)"
            class="w-[80%] h-[80%] bg-white rounded-full"
            v-if="x.isWhite && !x.isQueen"
          ></div>
          <div
            @click="chosenCheckerHint(y, x)"
            id="black_checker"
            class="w-[80%] h-[80%] bg-black rounded-full"
            v-if="x.isBlack && !x.isQueen"
          ></div>
          <div
            @click="chosenCheckerHint(y, x)"
            id="black_queen_checker"
            class=""
            v-if="x.isBlack && x.isQueen"
          >
            <img src="../images/queen_figure_black.png" alt="Black Queen" />
          </div>
          <div
            @click="chosenCheckerHint(y, x)"
            id="white_queen_checker"
            :class="{ opponents_board: isPlayerTwo }"
            class=""
            v-if="x.isWhite && x.isQueen"
          >
            <img src="../images/queen_figure_white.png" alt="White Queen" />
          </div>
          <div
            @click="moveChecker(y, x)"
            id="hint"
            class="w-full h-full bg-white bg-opacity-50"
            v-if="x.isHinted"
          ></div>
          <div
            id="empty_square"
            @click="cleanHints"
            class="w-full h-full"
            v-if="x.isWhite == 0 && x.isBlack == 0 && x.isHinted == 0"
          ></div>
        </span>
      </div>
    </div>
  </section>
</template>

<script>
import { setDoc, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import db from "../firebase.js";
import { useCounterStore } from "../stores/counter";

window.onbeforeunload = async () => {
  const docRef = doc(db, "game", "env");
  await updateDoc(docRef, {
    isPlayerOneOnline: false,
    isPlayerTwoOnline: false,
  });
  return false;
};
// const unsub = onSnapshot(doc(db, "game", "field"), (doc) => {
//     console.log("Current data: ", JSON.parse(doc.data().field));
// });

export default {
  setup() {
    const store = useCounterStore();
    return {
      // you can return the whole store instance to use it in the template
      store,
    };
  },
  data() {
    return {
      // isChosen: 1,
      check: true,
      isBlackTurn: true,
      isPlayerTwo: false,
      field: new Array(8).fill().map(() =>
        new Array(8).fill().map((item, index) => ({
          id: index,
          isChosen: 0,
          isChecker: 0,
          isWhite: 0,
          isBlack: 0,
          isHinted: 0,
          isPlayble: 0,
          isEnemyNear: 0,
          isQueen: 0,
        }))
      ),
      realTimeCheckField: onSnapshot(doc(db, "game", "field"), (doc) => {
        this.getDb();
        this.changeTurns();
      }),
    };
  },
  methods: {
    changeTurns() {
      this.isBlackTurn = !this.isBlackTurn;
    },
    makeQueen(y_axis, x_axis) {
      // const y_axis = this.field.indexOf(y);
      // const x_axis = y.indexOf(x);
      if (y_axis === 0 && this.field[y_axis][x_axis].isBlack === 1) {
        this.field[y_axis][x_axis].isQueen = 1;
      } else if (y_axis === 7 && this.field[y_axis][x_axis].isWhite === 1) {
        this.field[y_axis][x_axis].isQueen = 1;
      }
    },
    createId() {
      let idCount = 0;
      for (let y in this.field) {
        for (let x in this.field[y]) {
          this.field[y][x].id = idCount++;
          // idCount++;
        }
      }
      // console.log(this.field);
    },
    // That function below draws checkers and declare playable squares
    initRender() {
      for (let y in this.field) {
        for (let x in this.field[y]) {
          if (y % 2 == 0 && y <= 2) {
            /* Drawing white checkers. */
            if (x % 2 == 1) {
              this.field[y][x].isWhite = 1;
              this.field[y][x].isChecker = 1;
              this.field[y][x].isPlayble = 1;
            }
          } else if (y % 2 == 1 && y <= 2) {
            if (x % 2 == 0) {
              this.field[y][x].isWhite = 1;
              this.field[y][x].isChecker = 1;
              this.field[y][x].isPlayble = 1;
            }
          } else if (y % 2 == 1 && y >= 5) {
            /* Drawing black checkers. */
            if (x % 2 == 0) {
              this.field[y][x].isBlack = 1;
              this.field[y][x].isChecker = 1;
              this.field[y][x].isPlayble = 1;
            }
          } else if (y % 2 == 0 && y >= 5) {
            if (x % 2 == 1) {
              this.field[y][x].isBlack = 1;
              this.field[y][x].isChecker = 1;
              this.field[y][x].isPlayble = 1;
            }
          } else if (y == 3 && x % 2 == 0) {
            this.field[y][
              x
            ].isPlayble = 1; /* isPlayable prop is for fields that will be able to play through all the game. I mean you couldn't play white squares, right :-) */
          } else if (y == 4 && x % 2 == 1) {
            this.field[y][x].isPlayble = 1;
          }
        }
        // console.log(this.field[y]);
        // break;
      }
    },
    coordination(y, x) {
      console.log(this.field.indexOf(y), y.indexOf(x));
    },
    choosingChecker(y, x) {
      this.field[this.field.indexOf(y)][y.indexOf(x)].isChosen = 1;
      // if (this.field[this.field.indexOf(y)][y.indexOf(x)].isChosen)
      //   // console.log("chosen");
      // console.log(this.field);
    },
    chosenCheckerHint(y, x) {
      const y_axis = this.field.indexOf(y);
      const x_axis = y.indexOf(x);
      this.cleanChoice();
      this.choosingChecker(y, x);
      this.cleanHints();
      this.renderHints(y, x);
    },
    cleanHints() {
      // console.log('workds!');
      for (let row in this.field) {
        for (let col in this.field[row]) {
          // if (this.field[row][col].isHinted == 1) {
          this.field[row][col].isHinted = 0;
          // }
        }
      }
    },
    cleanChoice() {
      for (let row in this.field) {
        for (let col in this.field[row]) {
          // if (this.field[row][col].isChosen == 1) {
          this.field[row][col].isChosen = 0;
          // }
        }
      }
    },
    moveChecker(y, x) {
      const y_axis = this.field.indexOf(y);
      const x_axis = y.indexOf(x);
      let objBuffer;
      // let moveFlag = 0;
      for (let i = y_axis - 1; i < y_axis + 2; i++) {
        for (let j = x_axis - 1; j < x_axis + 2; j++) {
          //  /* Escaped counting unexisting squares */
          if (i < 0 || i > 7 || j < 0 || j > 7) {
            continue;
          }
          if (this.field[i][j].isChosen) {
            // switching checker and square chosen to move to by buffer
            objBuffer = Object.assign({}, this.field[y_axis][x_axis]);
            this.field[y_axis][x_axis] = Object.assign({}, this.field[i][j]);
            this.field[i][j] = Object.assign({}, objBuffer);
            this.cleanHints();
            this.cleanChoice();
            this.makeQueen(y_axis, x_axis);
            // this.changeTurns();
            this.updateRemoteField();
            // this.fetchRemoteField();
            return;
          } else if (
            this.field[i][j].isWhite &&
            i + 1 < 8 &&
            j + 1 < 8 &&
            this.field[i + 1][j + 1].isChosen
          ) {
            objBuffer = Object.assign({}, this.field[y_axis][x_axis]);
            this.field[y_axis][x_axis] = Object.assign(
              {},
              this.field[i + 1][j + 1]
            );
            this.field[i + 1][j + 1] = Object.assign({}, objBuffer);
            this.field[i][j] = Object.assign({}, objBuffer);
            // this.swapSquares(
            //   this.field[y_axis][x_axis],
            //   this.field[i + 1][j + 1],
            //   this.field[i][j]
            // );
            this.cleanHints();
            this.cleanChoice();
            this.makeQueen(y_axis, x_axis);
            // this.changeTurns();
            this.updateRemoteField();
            // this.fetchRemoteField();
            return;
          } else if (
            this.field[i][j].isWhite &&
            i + 1 < 8 &&
            j - 1 > -1 &&
            this.field[i + 1][j - 1].isChosen
          ) {
            objBuffer = Object.assign({}, this.field[y_axis][x_axis]);
            this.field[y_axis][x_axis] = Object.assign(
              {},
              this.field[i + 1][j - 1]
            );
            this.field[i + 1][j - 1] = Object.assign({}, objBuffer);
            this.field[i][j] = Object.assign({}, objBuffer);
            // this.swapSquares(
            //   this.field[y_axis][x_axis],
            //   this.field[i + 1][j - 1],
            //   this.field[i][j]
            // );
            this.cleanHints();
            this.cleanChoice();
            this.makeQueen(y_axis, x_axis);
            // this.changeTurns();
            this.updateRemoteField();
            // this.fetchRemoteField();
            return;
          } else if (
            this.field[i][j].isWhite &&
            i - 1 > -1 &&
            j + 1 < 8 &&
            this.field[i - 1][j + 1].isChosen
          ) {
            objBuffer = Object.assign({}, this.field[y_axis][x_axis]);
            this.field[y_axis][x_axis] = Object.assign(
              {},
              this.field[i - 1][j + 1]
            );
            this.field[i - 1][j + 1] = Object.assign({}, objBuffer);
            this.field[i][j] = Object.assign({}, objBuffer);
            // this.swapSquares(
            //   this.field[y_axis][x_axis],
            //   this.field[i - 1][j + 1],
            //   this.field[i][j]
            // );

            this.cleanHints();
            this.cleanChoice();
            this.makeQueen(y_axis, x_axis);
            // this.changeTurns();
            this.updateRemoteField();
            // this.fetchRemoteField();
            return;
          } else if (
            this.field[i][j].isWhite &&
            i - 1 > -1 &&
            j - 1 > -1 &&
            this.field[i - 1][j - 1].isChosen
          ) {
            objBuffer = Object.assign({}, this.field[y_axis][x_axis]);
            this.field[y_axis][x_axis] = Object.assign(
              {},
              this.field[i - 1][j - 1]
            );
            this.field[i - 1][j - 1] = Object.assign({}, objBuffer);
            this.field[i][j] = Object.assign({}, objBuffer);
            // this.swapSquares(
            //   this.field[y_axis][x_axis],
            //   this.field[i - 1][j - 1],
            //   this.field[i][j]
            // );
            this.cleanHints();
            this.cleanChoice();
            this.makeQueen(y_axis, x_axis);
            // this.changeTurns();
            this.updateRemoteField();
            // this.fetchRemoteField();
            return;
          } else if (
            this.field[i][j].isBlack &&
            i + 1 < 8 &&
            j + 1 < 8 &&
            this.field[i + 1][j + 1].isChosen
          ) {
            // let objBuffer;
            objBuffer = Object.assign({}, this.field[y_axis][x_axis]);
            this.field[y_axis][x_axis] = Object.assign(
              {},
              this.field[i + 1][j + 1]
            );
            this.field[i + 1][j + 1] = Object.assign({}, objBuffer);
            this.field[i][j] = Object.assign({}, objBuffer);
            // this.swapSquares(
            //   this.field[y_axis][x_axis],
            //   this.field[i + 1][j + 1],
            //   this.field[i][j]
            // );
            this.cleanHints();
            this.cleanChoice();
            this.makeQueen(y_axis, x_axis);
            // this.changeTurns();
            this.updateRemoteField();
            // this.fetchRemoteField();
            return;
          } else if (
            this.field[i][j].isBlack &&
            i + 1 < 8 &&
            j - 1 > -1 &&
            this.field[i + 1][j - 1].isChosen
          ) {
            objBuffer = Object.assign({}, this.field[y_axis][x_axis]);
            this.field[y_axis][x_axis] = Object.assign(
              {},
              this.field[i + 1][j - 1]
            );
            this.field[i + 1][j - 1] = Object.assign({}, objBuffer);
            this.field[i][j] = Object.assign({}, objBuffer);
            // this.swapSquares(
            //   this.field[y_axis][x_axis],
            //   this.field[i + 1][j - 1],
            //   this.field[i][j]
            // );
            this.cleanHints();
            this.cleanChoice();
            this.makeQueen(y_axis, x_axis);
            // this.changeTurns();
            this.updateRemoteField();
            // this.fetchRemoteField();
            return;
          } else if (
            this.field[i][j].isBlack &&
            i - 1 > -1 &&
            j + 1 < 8 &&
            this.field[i - 1][j + 1].isChosen
          ) {
            objBuffer = Object.assign({}, this.field[y_axis][x_axis]);
            this.field[y_axis][x_axis] = Object.assign(
              {},
              this.field[i - 1][j + 1]
            );
            this.field[i - 1][j + 1] = Object.assign({}, objBuffer);
            this.field[i][j] = Object.assign({}, objBuffer);
            // this.swapSquares(
            //   this.field[y_axis][x_axis],
            //   this.field[i - 1][j + 1],
            //   this.field[i][j]
            // );
            this.cleanHints();
            this.cleanChoice();
            this.makeQueen(y_axis, x_axis);
            // this.changeTurns();
            this.updateRemoteField();
            // this.fetchRemoteField();
            return;
          } else if (
            this.field[i][j].isBlack &&
            i - 1 > -1 &&
            j - 1 > -1 &&
            this.field[i - 1][j - 1].isChosen
          ) {
            objBuffer = Object.assign({}, this.field[y_axis][x_axis]);
            this.field[y_axis][x_axis] = Object.assign(
              {},
              this.field[i - 1][j - 1]
            );
            this.field[i - 1][j - 1] = Object.assign({}, objBuffer);
            this.field[i][j] = Object.assign({}, objBuffer);
            // this.swapSquares(
            //   this.field[y_axis][x_axis],
            //   this.field[i - 1][j - 1],
            //   this.field[i][j]
            // );
            this.cleanHints();
            this.cleanChoice();
            this.makeQueen(y_axis, x_axis);
            // this.changeTurns();
            this.updateRemoteField();
            // this.fetchRemoteField();
            return;
          } else {
            continue;
          }
        }
      }
    },
    swapSquares(hintedSquare, chosenSquare, squareBetween) {
      let objTemp = {};
      objTemp = Object.assign({}, hintedSquare);
      hintedSquare = Object.assign({}, chosenSquare);
      chosenSquare = Object.assign({}, objTemp);
      squareBetween = Object.assign({}, objTemp);
    },
    enemyDetection(y, x) {
      const y_axis = this.field.indexOf(y);
      const x_axis = y.indexOf(x);
      this.field[y_axis][x_axis].isEnemyNear = 0;
      if (x.isBlack) {
        for (let i = y_axis - 1; i < y_axis + 2; i++) {
          /* Trick is at this line in i declaration */
          for (let j = x_axis - 1; j < x_axis + 2; j++) {
            if (i == y_axis && j == x_axis) continue;
            if (i < 0 || i > 7 || j < 0 || j > 7) {
              continue; /* Escaped counting unexisting squares */
            }
            if (this.field[i][j].isWhite) {
              this.field[y_axis][x_axis].isEnemyNear = 1;
              return;
            }
          }
        }
      } else {
        this.field[y_axis][x_axis].isEnemyNear = 0;
        for (let i = y_axis - 1; i < y_axis + 2; i++) {
          /* Trick is at this line in i declaration */
          for (let j = x_axis - 1; j < x_axis + 2; j++) {
            if (i == y_axis && j == x_axis) continue;
            if (i < 0 || i > 7 || j < 0 || j > 7) {
              continue; /* Escaped counting unexisting squares */
            }
            if (this.field[i][j].isBlack) {
              this.field[y_axis][x_axis].isEnemyNear = 1;
              return;
            }
          }
        }
      }
    },
    renderHints(y, x) {
      this.cleanHints();
      const y_axis = this.field.indexOf(y);
      const x_axis = y.indexOf(x);
      // Analyzing chosen checker's surroundings
      // if checker is black we analyze only top line of chozen analyze block if checker is white we do vice versa
      if (
        x.isBlack &&
        !x.isQueen &&
        this.isBlackTurn &&
        this.$route.name === "player1"
      ) {
        for (let i = y_axis - 1; i < y_axis + 2; i++) {
          /* Trick is at this line in i declaration */
          for (let j = x_axis - 1; j < x_axis + 2; j++) {
            if (i == y_axis && j == x_axis) continue;
            if (i < 0 || i > 7 || j < 0 || j > 7) {
              continue; /* Escaped counting unexisting squares */
            }
            if (
              !this.field[i][j].isChecker &&
              this.field[i][j].isPlayble &&
              i == y_axis - 1 /* And trick is here */
            ) {
              this.field[i][j].isHinted = 1;
              // debugger;
            }
            // four ifs below render hints for killing enemy for black checkers
            // You should read the conditions like this. If analyzed square has one checker and there's chosen opposite checker near and...
            // ... there's blank square right after analyzed square we do hint
            if (i + 1 <= 7 && i - 1 >= 0 && j + 1 <= 7 && j - 1 >= 0) {
              /* by this we escape checking unexisting checkers or chosen checkers */
              if (
                this.field[i][j].isWhite &&
                this.field[i + 1][j + 1].isChosen &&
                !this.field[i - 1][j - 1].isChecker
              ) {
                this.field[i - 1][j - 1].isHinted = 1;
              }
              if (
                this.field[i][j].isWhite &&
                this.field[i + 1][j - 1].isChosen &&
                !this.field[i - 1][j + 1].isChecker
              ) {
                this.field[i - 1][j + 1].isHinted = 1;
              }
              if (
                this.field[i][j].isWhite &&
                this.field[i - 1][j - 1].isChosen &&
                !this.field[i + 1][j + 1].isChecker
              ) {
                this.field[i + 1][j + 1].isHinted = 1;
              }
              if (
                this.field[i][j].isWhite &&
                this.field[i - 1][j + 1].isChosen &&
                !this.field[i + 1][j - 1].isChecker
              ) {
                this.field[i + 1][j - 1].isHinted = 1;
              }
            }
          }
        }
      } else if (
        x.isWhite &&
        !x.isQueen &&
        !this.isBlackTurn &&
        this.$route.name === "player2"
      ) {
        for (let i = y_axis - 1; i < y_axis + 2; i++) {
          /* Trick is at this line in i declaration */
          for (let j = x_axis - 1; j < x_axis + 2; j++) {
            if (i == y_axis && j == x_axis) continue;
            if (i < 0 || i > 7 || j < 0 || j > 7) {
              continue; /* Escaped counting unexisting squares */
            }
            if (
              !this.field[i][j].isChecker &&
              this.field[i][j].isPlayble &&
              i == y_axis + 1 /* And trick is here */
            ) {
              this.field[i][j].isHinted = 1;
            }
            // four ifs below render hints for killing enemy for white checkers
            if (i + 1 <= 7 && i - 1 >= 0 && j + 1 <= 7 && j - 1 >= 0) {
              /* by this we escape checking unexisting checkers or chosen checkers */
              if (
                this.field[i][j].isBlack &&
                this.field[i + 1][j + 1].isChosen &&
                !this.field[i - 1][j - 1].isChecker
              ) {
                this.field[i - 1][j - 1].isHinted = 1;
              }
              if (
                this.field[i][j].isBlack &&
                this.field[i + 1][j - 1].isChosen &&
                !this.field[i - 1][j + 1].isChecker
              ) {
                this.field[i - 1][j + 1].isHinted = 1;
              }
              if (
                this.field[i][j].isBlack &&
                this.field[i - 1][j - 1].isChosen &&
                !this.field[i + 1][j + 1].isChecker
              ) {
                this.field[i + 1][j + 1].isHinted = 1;
              }
              if (
                this.field[i][j].isBlack &&
                this.field[i - 1][j + 1].isChosen &&
                !this.field[i + 1][j - 1].isChecker
              ) {
                this.field[i + 1][j - 1].isHinted = 1;
              }
            }
          }
        }
      } else if (
        x.isBlack &&
        x.isQueen &&
        this.isBlackTurn &&
        this.$route.name === "player1"
      ) {
        this.renderQueenHints(y_axis, x_axis);
      } else if (
        x.isWhite &&
        x.isQueen &&
        !this.isBlackTurn &&
        this.$route.name === "player2"
      ) {
        this.renderQueenHints(y_axis, x_axis);
      }
    },
    renderQueenHints(y_axis, x_axis) {
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          if (i == y_axis || j == x_axis) continue;
          if (i - y_axis == j - x_axis) {
            if (!this.field[i][j].isChecker && this.field[i][j].isPlayble) {
              this.field[i][j].isHinted = 1;
            }
            // if (i < y_axis && j < x_axis) {
            //   if (this.field[i][j].isBlack) {
            //     for (let borderY = i, borderX = j;; borderY--, borderX--) {
            //       if (borderY < 0 || borderX < 0) break;
            //       this.field[borderY][borderX].isHinted = 0;
            //       console.log(`Above chosen nullify at y: ${borderY} and x: ${borderX}`)
            //     }
            //   }
            // }
            // if (i > y_axis && j > x_axis) {
            //   if (this.field[i][j].isBlack) {
            //     for (let borderY = i, borderX = j;; borderY++, borderX++) {
            //       if (borderY > 7 || borderX > 7) break;
            //       this.field[borderY][borderX].isHinted = 0;
            //       console.log(`Under chosen nullify at y: ${borderY} and x: ${borderX}`)
            //     }
            //   }
            // }
          }
          if (y_axis + x_axis == i + j) {
            if (!this.field[i][j].isChecker && this.field[i][j].isPlayble) {
              this.field[i][j].isHinted = 1;
            }
          }
        }
      }
    },
    async updateRemoteField() {
      try {
        const docRef = await setDoc(doc(db, "game", "field"), {
          field: JSON.stringify(this.field),
        });
        // this.changeTurns();
        console.log("Remote db updated!");
      } catch (e) {
        alert(e);
      }
    },
    async fetchRemoteField() {
      this.field = this.getDb();
    },
    async getDb() {
      try {
        const docRef = doc(db, "game", "field");
        const docSnap = await getDoc(docRef);
        this.field = JSON.parse(docSnap.data().field);
        // console.log(JSON.parse(docSnap.data().field));
      } catch (e) {
        console.log("FetchErr: " + e);
      }
    },
    async disconnectPlayer() {
      try {
        const docRef = doc(db, "game", "env");
        if (this.check) {
          console.log("player1 leaves");
          await updateDoc(docRef, {
            isPlayerOneOnline: false,
          });
        }
        // else if (this.$route.name === 'player2')
        // console.log('player2 leaves');
        // await updateDoc(docRef, {
        //   isPlayerTwoOnline: false,
        // })
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getDb();
    this.createId();
    this.initRender();
    this.updateRemoteField();
    this.isPlayerTwo = this.$route.name === "player2" ? true : false;
    // this.field[5][4].isQueen = 1;
  },
  beforeUnmount() {
    // console.log('game turned off');
    // this.disconnectPlayer();
    // console.log('after updating db');
  },
  async beforeRouteLeave(to, from, next) {
    const answer = window.confirm(
      "???? ???????????? ????????? ???????????? ???????????????????? ?????? ????????!"
    );
    if (answer) {
      const docRef = doc(db, "game", "env");
      await updateDoc(docRef, {
        isPlayerOneOnline: false,
        isPlayerTwoOnline: false,
      });
      next();
    } else {
      next(false);
    }
  },

  watch: {
    // isBlackTurn() {
    //   console.log('turn changed')
    // }
  },
};
</script>

<style>
.row_num1:nth-child(odd),
.row_num3:nth-child(odd),
.row_num5:nth-child(odd),
.row_num7:nth-child(odd) {
  background: #0077b6;
}

.row_num2:nth-child(even),
.row_num4:nth-child(even),
.row_num6:nth-child(even),
.row_num0:nth-child(even) {
  background: #0077b6;
}

.chosen {
  background: blue;
  /* background: url('../images/queen_figure_black.png'); */
}

.opponents_board {
  transform: rotate(180deg);
}
</style>
