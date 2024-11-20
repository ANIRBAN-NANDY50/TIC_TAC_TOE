import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";
const initialBoard = [
  [null,null,null],
  [null,null,null],
  [null,null,null],
];

function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X';
  if(gameTurns.length>0 && gameTurns[0].player === 'X'){
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function App() {
  const [gameTurns,setTurns] = useState([]);
  //const [winner,setWinner] = useState(false);
  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...initialBoard.map(array => [...array])];
  //to allow restart of the game we created a deep copy of the initialBoard and not use the initial board for making changes 
  for(const turn of gameTurns){
      const {square,player} = turn;
      const {row,col} = square;
      gameBoard[row][col] = player;
  }
  
  let winner = null;

  for(const combination of WINNING_COMBINATIONS){
    const firstSquare = gameBoard[combination[0].row][combination[0].column];
    const secondSquare = gameBoard[combination[1].row][combination[1].column];
    const thirdSquare = gameBoard[combination[2].row][combination[2].column];

    if(firstSquare && firstSquare === secondSquare && firstSquare === thirdSquare){
       winner = firstSquare;
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;
  function playerChange(rowIndex,colIndex){
    //setActivePlayer((currentPlayer) => currentPlayer === 'X' ? 'O' : 'X');
    setTurns(prevTurns => {
      // let currPlayer = 'X';
      // if(prevTurns.length > 0 && prevTurns[0].player === 'X'){
      //   currPlayer = 'O';
      // } 
      // we can replace the above code with 
      const currPlayer = deriveActivePlayer(prevTurns);
      //The above statement prevents code duplication and repitition
      const updatedTurns = [{square :{row : rowIndex, col : colIndex},player : currPlayer},...prevTurns];
    
      return updatedTurns;
    });
  }

  function handleRestart(){
    setTurns([]);
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name='PLAYER 1' symbol='X' isActive={activePlayer === 'X'}/>
          <Player name='PLAYER 2' symbol='O' isActive={activePlayer === 'O'}/>
        </ol>
        {(winner || hasDraw) && <GameOver win={winner} onRestart={handleRestart}/>}
        <GameBoard onPlayerChange={playerChange} board={gameBoard}/>
        {/* for selecting the active player we used a concept called Lifting the State up where to control operations
        in two different components we make changes and apply them via a common ancestor */}
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
