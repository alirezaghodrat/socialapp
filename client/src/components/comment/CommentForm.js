import React from "react";

export default function CommentForm(props) {
  const { handleChange, handleSubmit, comment } = props;
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="comment"
        value={comment}
        onChange={handleChange}
        onBlur={handleChange}
      />
      <button>Submit</button>
    </form>
  );
}