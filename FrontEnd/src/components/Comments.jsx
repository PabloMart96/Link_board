import { useState, useContext } from "react";
import PropTypes from 'prop-types';
import { AuthContext } from "../context/AuthContext";
import { createCommentService, deleteCommentService } from "../services/index";
import { useNavigate } from "react-router-dom";
import { DeletePopUp } from "./DeletePopUp";

export const Comments = ({ linkId, comments, addComment, removeComment }) => {

  const navigate = useNavigate();
  const { token, user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newCommentText, setNewCommentText] = useState("");


  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const newComment = await createCommentService(linkId, newCommentText, token);
      addComment(newComment);
      setNewCommentText("");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };



  const deleteComment = async (id) => {
    try {
      await deleteCommentService({ id, token });
      if (removeComment) {
        removeComment(id);
      } else {
        navigate(`/`);
      }
    } catch (error) {
      setError(error.message);
    }
  };


  return (
    <div>
      <h2>Comments</h2>
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          value={newCommentText}
          onChange={(event) => setNewCommentText(event.target.value)}
          placeholder="Introduce tu comentario"
        />
        <button type="submit">Submit</button>
        {loading ? <p>Loading comments...</p> : null}
        {error ? <p>{error}</p> : null}
      </form>
      {comments.length > 0 ?
        (
          comments.map((comment, index) => (
            <ul key={index}>
              <li>{comment.comment_text}
                {comment.user_id === user.id && (
                  <DeletePopUp onConfirm={() => deleteComment(comment.id)} />
                )}
                {error ? <p>{error}</p> : null}
              </li>
            </ul>
          ))
        )

        : (
          <p>No exiten comentarios para este link...</p>
        )}
    </div>

  );

};

Comments.propTypes = {
  linkId: PropTypes.string,
  comments: PropTypes.array,
  addComment: PropTypes.func,
  removeComment: PropTypes.func,
}