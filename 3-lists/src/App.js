import React from "react"
import Problema from "./problema/Todos"

export default function App() {
  const initialTodos = [
    {
      id: 1,
      complete: false,
      name: "Lavar ropa"
    },
    {
      id: 2,
      complete: true,
      name: "Lavar platos"
    },
    {
      id: 3,
      complete: false,
      name: "Ordenar cuarto"
    }
  ]
  return (
    <>
      <Problema initialTodos={initialTodos} />
    </>
  )
}
