import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import './App.css';

const numCol = 100
const numRow = 100

function App() {
  const [finished, setFinished] = useState(false)
  const [timer, setTimer] = useState(0)
  const [running, setRunning] = useState(false)
  const [grid, setGrid] = useState(() => {
    const row = []
    for (let i = 0; i < numRow; i++) {
      row.push(Array.from({ length: numCol }).fill(0))
    }
    return row
  })


  function simulation() {
    setTimer(timer + 1)
    if (!running) {
      // setFinished(true)

      return false
    } else {
      // debugger;
      let newGrid = [...grid]
      const conGrid = [...grid]
      console.log('heyy');
      console.log('1', newGrid);
      for (let i = 0; i < numRow; i++) {
        for (let k = 0; k < numCol; k++) {
          const current = grid[i][k]
          let n = 0

          if (conGrid[i - 1] && conGrid[i - 1][k - 1]) {
            n++
          }
          if (conGrid[i] && conGrid[i][k - 1]) {
            n++
          }
          if (conGrid[i + 1] && conGrid[i + 1][k - 1]) {
            n++
          }
          if (conGrid[i - 1] && conGrid[i - 1][k]) {
            n++
          }
          if (conGrid[i + 1] && conGrid[i + 1][k]) {
            n++
          }
          if (conGrid[i - 1] && conGrid[i - 1][k + 1]) {
            n++
          }
          if (conGrid[i] && conGrid[i][k + 1]) {
            n++
          }
          if (conGrid[i + 1] && conGrid[i + 1][k + 1]) {
            n++
          }
          if (current) {
            if (n < 2) {
              newGrid[i][k] = 0
            } else if (n <= 3 || n == 2) {
              newGrid[i][k] = 1
            } else {
              newGrid[i][k] = 0
            }
          } else {
            if (n == 3) {
              newGrid[i][k] = 1
            }
          }
        }
      }
      console.log('2', newGrid);
      // console.log(conGrid);
      // if (JSON.stringify(newGrid) === JSON.stringify(conGrid)) {
      // setFinished(true)
      // setGrid(newGrid)
      // setRunning(false)
      // console.log('finished');
      // console.log(JSON.stringify(newGrid));
      // console.log(JSON.stringify(conGrid));


      // }
      setGrid(newGrid)
    }

  }

  useEffect(() => {
    if (!running) {
      return;
    } else {
      const interval = setInterval(simulation, 50)
      return () => {
        clearInterval(interval)
      }
    }

  }, [timer, running])
  //maybe can change the state of the grid




  return (
    <>



      <button onClick={() => { setRunning(!running); }}>{running ? 'STOP' : 'START'}</button>
      <button onClick={() => { clearAll() }}>CLEAR</button>
      <button onClick={() => { setRandom() }}>RANDOM</button>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${numCol},10px)` }}>
        {grid.map((row, i) => row.map((col, k) => <div style={{
          width: 10,
          height: 10,
          border: 'solid 1px black',
          backgroundColor: grid[i][k] ? finished ? 'green' : 'red' : 'white'
        }} onClick={() => {
          const newGrid = [...grid]
          newGrid[i][k] = newGrid[i][k] ? 0 : 1
          setGrid(newGrid)

        }} key={`${i}.${k}`}></div>))}
      </div>
    </>
  )





  function clearAll() {
    let newGrid = []
    for (let i = 0; i < numRow; i++) {
      newGrid.push(Array.from({ length: numCol }).fill(0))
    }
    setGrid(newGrid)
    setFinished(false)

  }

  function setRandom() {
    let newGrid = [...grid]
    for (let i = 0; i < numRow; i++) {
      for (let k = 0; k < numCol; k++) {
        let randomNum = Math.random()

        if (randomNum > .9) {
          newGrid[i][k] = 1
        }
      }
    }
    setGrid(newGrid)
  }
}


export default App;
