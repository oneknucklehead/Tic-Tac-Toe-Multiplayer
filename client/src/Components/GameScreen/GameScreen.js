import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import './GameScreen.css'
const socket = io.connect(`http://localhost:4000`)

const GameScreen = () => {
  const [isItX, setIsItX] = useState(true)
  const [dataSet, setDataSet] = useState(['', '', '', '', '', '', '', '', ''])
  const [gameOver, setGameOver] = useState(false)
  const [winner, setWinner] = useState('')
  const [isTie, setIsTie] = useState(false)

  const reset = () => {
    setDataSet(['', '', '', '', '', '', '', '', ''])
    setIsItX(true)
    setGameOver(false)
    setWinner('')
    setIsTie(false)
    window.location.reload()
    console.log('reset')
  }
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

  const gameFunc = (id, playFromOtherPlayer) => {
    let newArr = [...dataSet]
    if (gameOver) {
      return
    }
    if (isItX) {
      if (newArr[id] == '') {
        newArr[id] = `X`
        setIsItX(!isItX)
      }
      // setDataSet(newArr)
    } else {
      // let newArr = [...dataSet]
      if (newArr[id] == '') {
        newArr[id] = 'O'
        setIsItX(!isItX)
      }
    }

    if (!playFromOtherPlayer) {
      socket.emit('played', id)
    }
    // if(newArr[id])
    // setIsItX(!isItX)
    setDataSet(newArr)

    findWinner()
    checkIsTie()
  }

  useEffect(() => {
    socket.on('played', (id) => {
      console.log('Received id is : ', id)
      gameFunc(id, true)
    })
    findWinner()
    checkIsTie()
    return function cleanup() {
      //shut down connnection instance
      socket.off()
    }
    // console.log('winner:' + winner + ' draw:' + isTie)
  }, [dataSet, gameOver, isTie, socket])
  return (
    <>
      {gameOver ? (
        <div className='container'>
          <div className='wrapper'>
            {gameOver && <h2>{winner} WINS!</h2>}
            {!gameOver && isTie && <h2>Ugh! It's a TIE!</h2>}
            {(gameOver || isTie) && (
              <button onClick={() => reset()}>Play Again?</button>
            )}
          </div>
        </div>
      ) : (
        <div className='container'>
          <h1>MultiPlayer Tic-Tac-Toe</h1>
          <div className='gameArea'>
            <div
              id='block_0'
              className='block'
              onClick={() => gameFunc(0, false)}
            >
              {dataSet[0]}
            </div>
            <div
              id='block_1'
              className='block'
              onClick={() => gameFunc(1, false)}
            >
              {dataSet[1]}
            </div>
            <div
              id='block_2'
              className='block'
              onClick={() => gameFunc(2, false)}
            >
              {dataSet[2]}
            </div>
            <div
              id='block_3'
              className='block'
              onClick={() => gameFunc(3, false)}
            >
              {dataSet[3]}
            </div>
            <div
              id='block_4'
              className='block'
              onClick={() => gameFunc(4, false)}
            >
              {dataSet[4]}
            </div>
            <div
              id='block_5'
              className='block'
              onClick={() => gameFunc(5, false)}
            >
              {dataSet[5]}
            </div>
            <div
              id='block_6'
              className='block'
              onClick={() => gameFunc(6, false)}
            >
              {dataSet[6]}
            </div>
            <div
              id='block_7'
              className='block'
              onClick={() => gameFunc(7, false)}
            >
              {dataSet[7]}
            </div>
            <div
              id='block_8'
              className='block'
              onClick={() => gameFunc(8, false)}
            >
              {dataSet[8]}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default GameScreen
