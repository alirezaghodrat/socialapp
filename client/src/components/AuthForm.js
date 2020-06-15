import React from 'react'
import axios from 'axios'

export default function AuthForm(props){
  const {
    handleChange, 
    handleSubmit, 
    btnText, 
    errMsg,
    inputs: {
      username, 
      password,
      img
    } 
  } = props

  function uploadImg(){
    const fileData = new File(
      new Buffer(img),
      img
    )
    const data = new FormData()
    data.append("file", fileData)
    const config = { headers: { "Content-Type": "multipart/form-data" } }
    console.log(data)
    axios.post("/profile", data, config)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }
  
  return (
    <div className="text-container">
    <img src={"https://raw.githubusercontent.com/hidjou/classsed-react-firebase-client/master/src/images/icon.png"} height={64} width={64}/>
    <form className="text-seprator" onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={username} 
        name="username" 
        onChange={handleChange} 
        placeholder="Username"
        className="input-text"/>
      <input 
        type="text" 
        value={password} 
        name="password" 
        onChange={handleChange} 
        placeholder="Password"
        className="input-text"/>
        
      <button className="button-text">{ btnText }</button>
      <p style={{color:"red"}}>{errMsg}</p>
    </form>
    {/* <input 
        type="file" 
        name="img" 
        value={img} 
        onChange={handleChange} 
        placeholder="Image profile"/>
        <button onClick={uploadImg}>upload img</button> */}
    </div>
  )
}