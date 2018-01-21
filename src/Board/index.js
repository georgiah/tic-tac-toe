import React from 'react'
import BoardRow from '../BoardRow'

export default class Board extends React.Component {
  render() {
    const boardRows = []
    for (let i = 0; i < 3; i++) {
      // key declared as array index order of
      // items will not change
      boardRows.push(<BoardRow
        key={i}
        squares={this.props.squares}
        onClick={this.props.onClick}
        winningRow={this.props.winningRow}
        value={i} />)
    }

    return (
      <div>
        {boardRows}
      </div>
    )
  }
}
