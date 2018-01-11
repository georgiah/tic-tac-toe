import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

function Square (props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}

class Board extends React.Component {
  render() {
    const boardRows = []
    for (let i = 0; i < 3; i++) {
      // key declared as array index order of
      // items will not change
      boardRows.push(<BoardRow
        key={i}
        squares={this.props.squares}
        onClick={this.props.onClick}
        value={i} />)
    }

    return (
      <div>
        {boardRows}
      </div>
    );
  }
}

class BoardRow extends React.Component {
  renderSquare(i) {
    return (<Square
      key={i}
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
    />)
  }

  render () {
    const rowSquares = []
    const row = this.props.value
    for (let i = row * 3; i < 3 * (row + 1); i++) {
      rowSquares.push(this.renderSquare(i))
    }

    return (
      <div className="board-row">
        {rowSquares}
      </div>
    )
  }
}

class Game extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        move: null
      }],
      stepNumber: 0,
      xIsNext: true,
      ascOrder: true
    }
  }

  handleClick (i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()
    if (calculateWinner (squares) || squares[i]) {
      return
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
      history: history.concat([{
        squares: squares,
        move: i
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    })
  }

  jumpTo (step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    })
  }

  changeDisplayOrder = () => {
    this.setState({
      ascOrder: !this.state.ascOrder
    })
  }

  render() {
    var history = this.state.history
    const current = history[this.state.stepNumber]
    const winner = calculateWinner(current.squares)
    let status

    if (!this.state.ascOrder) {
      history = history.reverse()
    }

    const moves = history.map((step, move) => {
      if (!this.state.ascOrder) {
        move = history.length - 1 - move
      }

      const desc = move ?
        `Go to move #${move},
          (${step.move % 3 + 1},
          ${Math.floor(step.move / 3) + 1})` :
        'Go to game start'

      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>
            {desc}
          </button>
        </li>
      )
    })

    if (winner) {
      status = 'Winner: ' + winner
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
    }

    if (!this.state.ascOrder) {
      history = history.reverse()
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
          <div>
            <input type="radio" name="order"
              id="ascending" value="ascending"
              onClick={this.changeDisplayOrder}
              defaultChecked />
            <label htmlFor="ascending">ascending order</label>
            <input type="radio" name="order"
              id="descending" value="descending"
              onClick={this.changeDisplayOrder} />
            <label htmlFor="descending">descending order</label>
          </div>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }

  return null
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
