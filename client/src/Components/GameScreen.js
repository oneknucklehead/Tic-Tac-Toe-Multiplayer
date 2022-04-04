import React from 'react'

const GameScreen = () => {
  const reset = () => {
    //reset functionality to be added
    console.log('reset')
  }
  return (
    <div className='container'>
      <h1>MultiPlayer (hopefully) Tic-Tac-Toe</h1>
      <div className='gameArea'></div>
      <h3 className='winner'></h3>
      <button onClick={reset()}>Reset</button>
    </div>
  )
}

export default GameScreen
