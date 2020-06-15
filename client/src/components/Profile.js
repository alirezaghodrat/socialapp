import React, { useContext, useEffect } from 'react'
import TodoForm from './TodoForm.js'
import TodoList from './TodoList.js'
import Todo from './Todo.js'
import { UserContext } from '../context/UserProvider.js'

export default function Profile(){
  const { 
    user: { 
      username ,
      img,
      _id
    }, 
    addTodo, 
    todos ,
    getComments,
    getUserTodos
  } = useContext(UserContext)

  useEffect(() => {
    getUserTodos(_id)
  }, [])

  return (
    <div className="profile">
      <img src={"https://www.ankersmid.eu/wp-content/uploads/2015/10/Facebook-no-profile-picture-icon-620x389.jpg"} className="profile-img"/>
      <h1>Welcome @{username}!</h1>
      <h3>Add A photo</h3>
      <TodoForm addTodo={addTodo}/>
      <h3>👇👇 Your photo 👇👇</h3>
      <TodoList todos={todos} getComments={getComments}/>
    </div>
  )
}