
export default function GameBoard({onPlayerChange,board}){
   
    // const [gameBoard,setGameBoard] = useState(initialBoard);

    // function handleChange(rowIndex,colIndex){
    //     setGameBoard((prevGameBoard) => {
    //         const newGameBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
    //         newGameBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return newGameBoard;
    //     } )
    //     onPlayerChange();
    // }
    return (
        <ol id="game-board">
          { board.map((row,rowIndex) => (
            <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol,colIndex) =>(
                        <li key={colIndex}>
                            <button onClick={() => onPlayerChange(rowIndex,colIndex)} disabled={playerSymbol != null}>{playerSymbol}</button>
                            {/* for disable we can also do playerSymbol != null */}
                        </li>
                    ))}
                </ol>
            </li>
          ))}

        </ol>
    );
}