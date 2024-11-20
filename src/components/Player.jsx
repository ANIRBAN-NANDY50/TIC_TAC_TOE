import { useState } from "react";

export default function Player({name,symbol,isActive}){
    const[playerName,setPlayerName] = useState(name);
    const [isEdit,setIsEdit] = useState(false);
    function handleClick(){
        setIsEdit((editing) => !editing);
        // when updating your state based on previous value of state use () =>
        // in case of !state react schedules the process to be done sometime in the future
        // and not instantly.
    }
    function nameChange(event){
        setPlayerName(event.target.value);
    }
    let editPlayerName = <span className="player-name">{playerName}</span>;
    let buttonName = 'Edit';
    if(isEdit){
        editPlayerName = <input type="text" required value={playerName} onChange={nameChange}/>;
        buttonName = 'Save'
    }
    return(
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
              {editPlayerName}
              <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleClick}>{buttonName}</button>
        </li>
    );
}