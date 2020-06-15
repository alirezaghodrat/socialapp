import React, {useState, useRef} from "react"

export default function SearchTodo(props){

    const [newTodoValue, setNewTodoValue] = useState("")
    const [todosList, setTodosList] = useState([])
    // const inputRef = useRef(null)
    const {getSearchTodos} = props


    // const {userId} = useParams()
    // const thisuser = username.find(user => user._id === userId)

    function handleChange(event) {
        setNewTodoValue(event.target.value)
    }
 
    function addTodo(event) {
        event.preventDefault()
        setTodosList(prevTodosList => [...prevTodosList, newTodoValue])
        setNewTodoValue("")
        // inputRef.current.focus()
        //ref={inputRef}
    }

    function handleSubmit(e){
        e.preventDefault()
        getSearchTodos(newTodoValue)
    }
    
  
  
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input  className="input-search" placeholder="search title" type="text" name="todo" value={newTodoValue} onChange={handleChange}/>
                <button className="search" >🔎</button>
            </form>
          
        </div>
    )
}