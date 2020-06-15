import React,{useState, useEffect, useContext} from 'react'
import {UserContext } from "../context/UserProvider.js"
import TodoList from './TodoList.js'
import Todo from './Todo.js'

export default function Public(){
  const { getAllTodos, allTodos } = useContext(UserContext)

  useEffect(() => {
    getAllTodos()
  }, [getAllTodos])


  return (
    <div className="public">
      <TodoList todos={allTodos}/>
    </div>
  )
}