

const Gameboard = (function (){
    const board = [];
    let rows = 3;
    let columns = 3;
   
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
          board[i].push("")
        }
      }

    return {board}
})();





  