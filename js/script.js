

const Gameboard = (function (){
    const board = [];
    let rows = 3;
    let columns = 3;
    const getRows = () => rows;
    const getColumns = () => columns;
    const getBoard = () => board;
    const displayBoard = () => {
        
        console.table(getBoard())
    }
    const place_marker = (row, col, marker) => {
        board[row][col] = marker;
    }
    //creates empty board
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
          board[i].push("")
        }
      }
    //returns true if board is full, for use later to check for tie
      const checkTie = () => {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
              if (board[i][j] === ""){
                return false;
              } 
              
            }
          }
          return true;
      }
      const resetBoard = () => {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
              board[i][j] = "";
            }
          }
      }

    return {board, place_marker, getBoard, displayBoard, checkTie, getRows, getColumns, resetBoard}
})();

const displayController = (function () {
    const displayBoard = (rows, cols, par) => {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
              const div = document.createElement("div");
              div.dataset.row = i;
              div.dataset.col = j;
              div.classList.add("cell");
              par.appendChild(div);

            }
          }
    }
   
    
    return {displayBoard}
})();



function createPlayer(name, marker){
    const make_move = (row, col) => {
        Gameboard.place_marker(row, col, marker)
    }
    return {name, marker, make_move}
}

function checkGameWon(marker){
    //creates subarrays for each winning combo
    const topRow = Gameboard.board[0];
    const midRow = Gameboard.board[1];
    const botRow = Gameboard.board[2];
    const leftCol = [topRow[0], midRow[0], botRow[0]];
    const midCol = [topRow[1], midRow[1], botRow[1]];
    const rightCol = [topRow[2], midRow[2], botRow[2]];
    const diag_one = [topRow[0], midRow[1], botRow[2]];
    const diag_two = [topRow[2], midRow[1], botRow[0]];

    //checks if player's marker occupies a winning subarray combo
    const isWin = (currentValue) => currentValue === marker;
   if (topRow.every(isWin) || midRow.every(isWin) || botRow.every(isWin)
  || leftCol.every(isWin) || midCol.every(isWin)||rightCol.every(isWin)
|| diag_one.every(isWin)||diag_two.every(isWin)){
    return true;
}
    
}





function gameController(){

    
    let player_one = createPlayer("player 1", "X");
    let player_two = createPlayer("player 2", "O");

    const players = [player_one, player_two];
    let activePlayer = players[0];

    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const boardContainer = document.querySelector(".board-container");
    displayController.displayBoard(Gameboard.getRows(), Gameboard.getColumns(), boardContainer);
    
   const cells = document.querySelectorAll(".board-container div");
    
    const startButton = document.querySelector(".start-button");

    const playGame = () => {
        activePlayer = players[0];
        Gameboard.resetBoard();
       
        cells.forEach(function(cell){
            cell.textContent = "";
            
       }) 
            
      let gameOver = false;
      let row;
      let col;
            
      boardContainer.addEventListener("click", (e) => {
        if (gameOver) return;



        row = +e.target.dataset.row;
        col = +e.target.dataset.col;
         
         
         
        if (Gameboard.board[row][col] === ""){
            Gameboard.place_marker(row, col, activePlayer.marker)
            e.target.textContent = activePlayer.marker;
           
           if (checkGameWon(activePlayer.marker)){
            console.log(`Game over ${activePlayer.name} wins`);
            gameOver = true;
           // return;
           } else if (Gameboard.checkTie()){
            console.log(`It's a tie`);
            gameOver = true;
           // return;
           }
           switchPlayer();
       
     } else{
        console.log("That space is taken, choose again")
     }
      });
      
      
    
    
}
startButton.addEventListener("click", playGame);


   

    return {playGame}
}
  
gameController();


