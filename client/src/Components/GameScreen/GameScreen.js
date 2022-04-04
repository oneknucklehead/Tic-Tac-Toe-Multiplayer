import React, { useState } from 'react'
import './GameScreen.css'
const GameScreen = () => {
  const [isItX, setIsItX] = useState(true)
  const reset = () => {
    //reset functionality to be added
    console.log('reset')
  }
  const [dataSet, setDataSet] = useState(['', '', '', '', '', '', '', '', ''])

  const gameFunc = (id) => {
    if (isItX) {
      let newArr = [...dataSet]
      newArr[id] = 'X'
      setDataSet(newArr)
    } else {
      let newArr = [...dataSet]
      newArr[id] = 'O'
      setDataSet(newArr)
    }
    setIsItX(!isItX)
    console.log(dataSet)
  }
  return (
    <div className='container'>
      <h1>MultiPlayer (hopefully) Tic-Tac-Toe</h1>
      <div className='gameArea'>
        <div id='block_0' className='block' onClick={() => gameFunc(0)}>
          {dataSet[0]}
        </div>
        <div id='block_1' className='block' onClick={() => gameFunc(1)}>
          {dataSet[1]}
        </div>
        <div id='block_2' className='block' onClick={() => gameFunc(2)}>
          {dataSet[2]}
        </div>
        <div id='block_3' className='block' onClick={() => gameFunc(3)}>
          {dataSet[3]}
        </div>
        <div id='block_4' className='block' onClick={() => gameFunc(4)}>
          {dataSet[4]}
        </div>
        <div id='block_5' className='block' onClick={() => gameFunc(5)}>
          {dataSet[5]}
        </div>
        <div id='block_6' className='block' onClick={() => gameFunc(6)}>
          {dataSet[6]}
        </div>
        <div id='block_7' className='block' onClick={() => gameFunc(7)}>
          {dataSet[7]}
        </div>
        <div id='block_8' className='block' onClick={() => gameFunc(8)}>
          {dataSet[8]}
        </div>
      </div>
      <h3 className='winner'></h3>
      <button onClick={() => reset()}>Reset</button>
    </div>
  )
}

export default GameScreen
