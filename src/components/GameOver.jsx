export default function GameOver({win,onRestart}) {
    return( 
        <div id='game-over'>
            <h2>Game Over !!</h2>
            {win && <p>{win} won!</p>}
            {!win && <p>Match Draw!</p>}
            <p><button onClick={onRestart}>Rematch!</button></p>
        </div>
    );
}