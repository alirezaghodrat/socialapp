import React, { useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Navbar from './components/Navbar.js'
import Auth from './components/Auth.js'
import Profile from './components/Profile.js'
import Public from './components/Public.js'
import ProtectedRoute from './components/ProtectedRoute.js'
import UserPosts from "./components/UserPosts.js"
import { UserContext } from './context/UserProvider.js'


export default function App(){
  const { token, logout, getUserTodos, todos } = useContext(UserContext)
  return (
    <div className="app">
       <Navbar logout={logout} token={token}/>
      <Switch>
        <Route 
          exact path="/" 
          render={()=> token ? <Redirect to="/profile"/> : <Auth />}
        />
        <ProtectedRoute 
          exact path="/profile"
          component={Profile}
          redirectTo="/"
          token={token}
        />
         <ProtectedRoute 
          path="/profile/:user"
          component={UserPosts}
          redirectTo="/"
          token={token}
          getUserTodos={getUserTodos}
          todos={todos}
        />
        <ProtectedRoute
          path="/public"
          component={Public}
          redirectTo="/"
          token={token}
        />
      </Switch>
    </div>
  )
}
