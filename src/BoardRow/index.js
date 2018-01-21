import React from 'react'
import Square from '../Square'

export default class BoardRow extends React.Component {
  renderSquare(i) {
    var className = ''
    if (this.props.winningRow) {
      className = this.props.winningRow.includes(i)
        ? 'highlight' : ''
    }

    return (<Square
      key={i}
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
      className={className}
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
