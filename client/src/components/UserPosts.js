import React, {useEffect} from 'react'
import {useParams} from "react-router-dom"
import Todo from './Todo.js'

function UserPosts(props) {
    const { user,todos, getUserTodos } = props
    const {user: userID} = useParams()

    useEffect(() => {
       getUserTodos(userID)
    }, [getUserTodos, userID])
    return(
         <div className="user-post">
            { todos.map(todo =>  <Todo {...todo} /> ) }
         </div>
    )
}

export default UserPosts

