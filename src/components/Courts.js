import React from 'react';
import './Courts.css';
import Queue from './Queue';

export default function Courts({courtNum, p1, p2}) {

  return (
    <div>
      <div>Court {courtNum}: {p1}vs{p2}</div>
      <Queue/>
      <button>+</button>
    </div>
  )
}
