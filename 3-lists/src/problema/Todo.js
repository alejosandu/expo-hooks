import React from "react"
import { object , func } from "prop-types"

function Todo({ todo, handleToggleComplete, handleSelect }) {
  function toggleComplete() {
    handleToggleComplete(todo.id)
  }

  function onSelect() {
    handleSelect(todo.id)
  }

  return (
    <div>
      <input
        type="checkbox"
        checked={todo.complete}
        onChange={toggleComplete}
      />
      {todo.name}
      <button onClick={onSelect}>Select</button>
    </div>
  )
}

Todo.propTypes = {
  handleToggleComplete: func,
  handleSelect: func,
  todo: object
}

export default Todo
