import { useState } from 'react'

function Square({ value, onSquareClick, winner = false }) {
  return (
    <button
      className="square"
      onClick={onSquareClick}
      style={winner ? { color: '#00b37e' } : {}}
    >
      {value}
    </button>
  )
}

function Board({ squares, onPlay, xIsNext }) {
  let status = 'Próximo Jogador: ' + (xIsNext ? 'X' : 'O')
  const winner = checkWinner(squares)

  if (winner?.winner) {
    status = 'Vencedor: ' + winner.winner
  } else {
    const old = squares.every((squares) => squares !== null)
    if (old) {
      status = 'Deu velha!'
    }
  }

  function handleSquares(index) {
    if (squares[index] !== null || winner?.winner) {
      return
    }

    const nextSquares = squares.slice()

    if (xIsNext) {
      nextSquares[index] = 'X'
    } else {
      nextSquares[index] = 'O'
    }
    onPlay(nextSquares)
  }

  return (
    <div className="board">
      <div className="status">{status}</div>
      <div className="board-row">
        <Square
          value={squares[0]}
          onSquareClick={() => handleSquares(0)}
          winner={winner?.positions.includes(0)}
        />
        <Square
          value={squares[1]}
          onSquareClick={() => handleSquares(1)}
          winner={winner?.positions.includes(1)}
        />
        <Square
          value={squares[2]}
          onSquareClick={() => handleSquares(2)}
          winner={winner?.positions.includes(2)}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[3]}
          onSquareClick={() => handleSquares(3)}
          winner={winner?.positions.includes(3)}
        />
        <Square
          value={squares[4]}
          onSquareClick={() => handleSquares(4)}
          winner={winner?.positions.includes(4)}
        />
        <Square
          value={squares[5]}
          onSquareClick={() => handleSquares(5)}
          winner={winner?.positions.includes(5)}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[6]}
          onSquareClick={() => handleSquares(6)}
          winner={winner?.positions.includes(6)}
        />
        <Square
          value={squares[7]}
          onSquareClick={() => handleSquares(7)}
          winner={winner?.positions.includes(7)}
        />
        <Square
          value={squares[8]}
          onSquareClick={() => handleSquares(8)}
          winner={winner?.positions.includes(8)}
        />
      </div>
    </div>
  )
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const xIsNext = currentMove % 2 === 0
  const currentSquares = history[currentMove]

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }
  function jumpTo(nextMove) {
    setCurrentMove(nextMove)
  }

  const moves = history.map((squares, move) => {
    let description
    if (move === 0) {
      description = 'Inicio do Jogo'
    } else if (move === currentMove) {
      description = 'Você está no movimento #' + move

      return (
        <li key={move}>
          <span>{description}</span>
        </li>
      )
    } else {
      description = 'Vá para o movimento #' + move
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={currentSquares} onPlay={handlePlay} xIsNext={xIsNext} />
      </div>
      <div className="game-info">
        <ul>{moves}</ul>
      </div>
    </div>
  )
}

function checkWinner(squares) {
  const chancesOfWinning = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (let i = 0; i < chancesOfWinning.length; i++) {
    const [a, b, c] = chancesOfWinning[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], positions: [a, b, c] }
    }
  }

  return null
}
