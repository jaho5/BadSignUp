import React, { useState } from 'react'
import { addToDb, addUser } from '../database/dbfunctions';

export default function Login({show, close}) {

  const [name, setName] = useState(null);
  const [pid, setPid] = useState(null)
  
  const login = e => {
    e.preventDefault();
    localStorage.setItem("name", name);
    localStorage.setItem("pid", pid);
    addUser(pid);
    close();
  }
  if(!show) {
    return null;
  }
  return (
    <div>
      <form onSubmit={login}>
      Name
      <input
        type='text'
        onChange={e=>setName(e.target.value)}
      />
      PID
      <input
        type='text'
        onChange={e=>setPid(e.target.value)}
      />
      <input
        type='submit'
      />
      </form>
      <button onClick={close}>Close</button>
    </div>
  )
}
