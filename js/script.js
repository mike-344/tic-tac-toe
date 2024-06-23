

const Gameboard = (function (){
    const board = [];
    let rows = 3;
    let columns = 3;
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

    return {board, place_marker, getBoard, displayBoard, checkTie}
})();




function createPlayer(name, marker){
    const make_move = (row, col) => {
        Gameboard.place_marker(row, col, marker)
    }
    return {name, marker, make_move}
}



function gameController(){
    
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

        //checks if player's marker satisfies a winning subarray combo
        const isWin = (currentValue) => currentValue === marker;
       if (topRow.every(isWin) || midRow.every(isWin) || botRow.every(isWin)
      || leftCol.every(isWin) || midCol.every(isWin)||rightCol.every(isWin)
    || diag_one.every(isWin)||diag_two.every(isWin)){
        return true;
    }
        
    }


    
    let player_one = createPlayer("player 1", "X");
    let player_two = createPlayer("player 2", "O");

    const players = [player_one, player_two];
    let activePlayer = players[0];

    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }
    const activePlayerMove = (row, col) =>{
        
        activePlayer.make_move(row, col);
        Gameboard.displayBoard();
      
        
    }

    const playGame = () => {
       
        let keepGoing = true

        while (keepGoing){

        let row = prompt(`${activePlayer.name}, Choose row (0-2)`);
        let col = prompt(`${activePlayer.name}, Choose column (0-2)`);
        
        //checks if space taken
        if (Gameboard.board[row][col] !== ""){
            console.log(`That space is taken, choose again`)
            continue;
        }
    
        activePlayerMove(row, col);
        let isGameWon = checkGameWon(activePlayer.marker);
        if (isGameWon === true){
           return console.log(`Game over, ${activePlayer.name} wins`); 
           keepGoing = false;
        }
      
        let isTie = Gameboard.checkTie();
        if (isTie === true){
            return console.log("It's a tie");
            keepGoing = false;
        }

        switchPlayer();
    
 
        
    }
}

   

    return {playGame}
}
  
let game = gameController();

