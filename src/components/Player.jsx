import React, { useState } from 'react'

export default function Player({name,symbol,isActive ,onChangeName}) {
    const [playerName,setPlayerName]=useState(name)
    const [isEditing, setIsEditing] =useState(false);
    function handleEdit(){
        setIsEditing(editing => !editing)
        if(isEditing){
            onChangeName(symbol,playerName);
        }
    }

   function handleChange(event){
    setPlayerName(event.target.value)
   }
    let editablePlayerName = <span className="player-name">{playerName}</span> ;
   if (isEditing) {editablePlayerName =  <input type='text' required value={playerName} onChange={handleChange}/>}  
  
    

  return (
    
    <li className={isActive ? 'active' : undefined}>
    <span className="player">
    {editablePlayerName}
       <span className="player-symbole">{symbol}</span>
    </span>
    <button onClick={handleEdit}>{isEditing ? "Save" : "Edit"}</button>
 </li>
  )
}
