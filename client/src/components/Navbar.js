import React,{ useContext } from 'react'
import { Link } from 'react-router-dom'
import SearchTodo from './SearchTodo.js'
import { UserContext } from '../context/UserProvider.js'


export default function Navbar(props){
  const { getSearchTodos, todos } = useContext(UserContext)
  const { logout , token} = props
  return (
    <>
      { token && <div className= "navbar" >
       <Link to="/profile">Profile</Link>
      <Link to="/public">Public</Link>
      <SearchTodo getSearchTodos={getSearchTodos} todos={todos}/>
      <button onClick={logout}>Logout</button>
    </div>}
    </>
  )
}