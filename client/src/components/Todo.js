import React, { useContext,useState, useEffect } from 'react'
import { UserContext } from "../context/UserProvider.js"
import Comments from "./comment/Comments.js";
import CommentForm from "./comment/CommentForm.js";
import { useParams,Link } from "react-router-dom";



export default function Todo(props){
  const { user:{img, _id: userId},upVote, downVote ,getComments,addComment} = useContext(UserContext)
  const { username,title, description,_id ,imgUrl ,vote ,comments, user } = props
  // const { _id } = useParams();
  console.log(props)

  const [commentToggle, setCommentToggle] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  

  useEffect(() => {
     getComments(_id);
  }, [getComments]);

  const toggler = () => {
    setCommentToggle(p => !p)
  };
  const handleChange = e => setCommentInput(e.target.value);
  const handleSubmit = e => {
    e.preventDefault();
    console.log(_id, commentInput)
    addComment(_id, { text: commentInput });
  };
  

  return (
    <div className="todo">
      <Link to={`/profile/${user}`} className="img-name-user">
        <img src={"https://www.ankersmid.eu/wp-content/uploads/2015/10/Facebook-no-profile-picture-icon-620x389.jpg"} className="img-user"/>
      <h1>{username}</h1>
      </Link>
      <img src={imgUrl} alt={imgUrl} className="img-url"/>
      <h1>{ title }</h1>
      <h3>{ description }</h3>
      <h1>LIKES: {vote}</h1>
      <button onClick={() => upVote(_id)}>{"👍"}</button>
      <button onClick={() => downVote(_id)}>{"👎"}</button>
      <button onClick={toggler}>Comments</button>
      {commentToggle && (
        <div>
          <Comments
            id={_id}
            getComments={getComments}
            addComment={addComment}
            comments={comments}
            toggler={toggler}
          />
          <CommentForm
            comment={commentInput}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </div>
      )}
    </div>
  )
}
