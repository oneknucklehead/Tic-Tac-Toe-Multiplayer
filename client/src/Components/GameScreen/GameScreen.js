import React, { useEffect, useState } from 'react'
import './GameScreen.css'
const GameScreen = () => {
  const [isItX, setIsItX] = useState(true)
  const reset = () => {
    //reset functionality to be added
    setDataSet(['', '', '', '', '', '', '', '', ''])
    setIsItX(true)
    setGameOver(false)
    setWinner('')
    setIsTie(false)
    console.log('reset')
  }
  const [dataSet, setDataSet] = useState(['', '', '', '', '', '', '', '', ''])
  const [gameOver, setGameOver] = useState(false)
  const [winner, setWinner] = useState('')
  const [isTie, setIsTie] = useState(false)
  const checkIsTie = () => {
    if (gameOver) {
      return
    }
    for (let i = 0; i < 9; i++) {
      if (dataSet[i] === '') {
        return
      }
    }
    setIsTie(true)
  }
  const findWinner = () => {
    const CONDITIONS = [
      [0, 1, 2],
      [3, 4, 5],
      [2, 5, 8],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [0, 4, 8],
      [2, 4, 6],
    ]
    for (let i = 0; i < CONDITIONS.length; i++) {
      let firstPos = CONDITIONS[i][0]
      let secondPos = CONDITIONS[i][1]
      let thirdPos = CONDITIONS[i][2]
      if (
        dataSet[firstPos] === dataSet[secondPos] &&
        dataSet[secondPos] === dataSet[thirdPos] &&
        dataSet[firstPos] != ''
      ) {
        setGameOver(true)
        setWinner(dataSet[firstPos])
      }
    }
  }

  const gameFunc = (id) => {
    let newArr = [...dataSet]
    if (gameOver) {
      return
    }
    if (isItX) {
      if (newArr[id] == '') {
        newArr[id] = 'X'
        // setIsItX(!isItX)
      }
      // setDataSet(newArr)
    } else {
      // let newArr = [...dataSet]
      if (newArr[id] == '') {
        newArr[id] = 'O'
      }
    }
    setIsItX(!isItX)
    setDataSet(newArr)

    findWinner()
    checkIsTie()
  }
  useEffect(() => {
    findWinner()
    checkIsTie()
    // console.log('winner:' + winner + ' draw:' + isTie)
  }, [dataSet, gameOver, isTie])
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
      {gameOver && <h2>Winner is {winner}</h2>}
      {!gameOver && isTie && <h2>Ugh! The game ended in a draw</h2>}
      {(gameOver || isTie) && <button onClick={() => reset()}>Reset</button>}
    </div>
  )
}

export default GameScreen
