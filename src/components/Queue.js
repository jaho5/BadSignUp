import React, {useState} from 'react'

export default function Queue({players}) {

  return (
    <div>
      {players.map((player,i) => (
        <div key={i}>{player}</div>
      ))}
    </div>  
  )
}
