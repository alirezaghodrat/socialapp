import React from "react";

export default function Comments(props) {
  const { comments } = props;
  console.log(comments)
  return (
    <div>
      {comments.map(comment => (
        <p key={comment._id}>{comment.postingUser}:{comment.text}</p>
      ))}
    </div>
  );
}