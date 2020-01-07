import React, { useState } from 'react'
import { addUser } from '../database/dbfunctions';

export default function Login({className, show, close}) {

  const [name, setName] = useState(null);
  const [pid, setPid] = useState(null)
  
  const login = e => {
    e.preventDefault();
    localStorage.setItem("name", name);
    localStorage.setItem("pid", pid);
    addUser({pid:pid, court:0});
    close();
  }
  if(show!=='login') {
    return null;
  }
  return (
    <div>
      <form className={className} onSubmit={login}>
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
      {/* <button onClick={close}>Close</button> */}
    </div>
  )
}
