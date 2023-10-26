import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import { WINNING_COMBINATIONS } from "./winning-combinations";
import Log from "./components/Log"
import GameOver from "./components/GameOver";

let initialGameBoard =[
  [null,null,null],
  [null,null,null],
  [null,null,null]
]

function deriveActivePlayer(gameTurns){
  let currentPlayer='X';
  if( gameTurns.length >0 && gameTurns[0].player ==='X'){
  currentPlayer = 'O'; 
  }
  return currentPlayer;
}

function App() {
  const [players,setPlayers]=useState({
    X: 'Player 1',
    O: 'Player 2'
  })
  const [gameTurns,setGameTurns]=useState([])
  const activePlayer =deriveActivePlayer(gameTurns);
 
  let gameBoard =[...initialGameBoard.map(array =>[...array])];

  for(const turn of gameTurns){
      const {square ,player}=turn;
      const{row,col}=square;
      gameBoard[row][col]=player;
  }
  
  
let winner = null;
  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol=gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol=gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol=gameBoard[combination[2].row][combination[2].column]
  
    if (firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol && 
      firstSquareSymbol === thirdSquareSymbol
      ) {
        winner=players[firstSquareSymbol];
  }
  }
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex ,colIndex){
    
    setGameTurns(prevTurns =>{
       const currentPlayer =deriveActivePlayer(prevTurns)
     
       const updateTurns =[
       {square:{row:rowIndex,col:colIndex} ,
       player: currentPlayer},
       ...prevTurns,
      ]
      return updateTurns;
    })
  }

function  handleRestart(){
  setGameTurns([]);
}

function  handlePlayerName(symbol,newName){
  setPlayers(prevPlayers =>{
    return{
      ...prevPlayers,
      [symbol]: newName
    }
  });
}

  return (
    <main>
      <div id="game-container">
          <ol id="players" className="highlight-player">
              <Player name="player 1" symbol="X" isActive={activePlayer === 'X'} onChangeName={handlePlayerName}/>
              <Player name="player 2" symbol="O" isActive={activePlayer === 'O'} onChangeName={handlePlayerName}/>
          </ol>
          {(winner || hasDraw )&& <GameOver winner={winner} restart={handleRestart}/>}
          <GameBoard onSelectSquare={handleSelectSquare}
           board={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
