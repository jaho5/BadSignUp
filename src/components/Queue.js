import React, {useState} from 'react'

export default function Queue() {

  const [players, setPlayers] = useState(["jason","sunny","kenneth"]);

  return (
    <div>
      {players.map((player) => (
        <div>{player}</div>
      ))}
    </div>  
  )
}
