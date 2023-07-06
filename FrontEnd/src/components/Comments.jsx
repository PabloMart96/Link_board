import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getCommentsByLinkIdService, createCommentService, deleteCommentService } from "../services/index";
import { Error } from "./Error";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export const Comments = ({ linkId, removeComment }) => {

  const navigate = useNavigate();
  const { token, user } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newCommentText, setNewCommentText] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsData = await getCommentsByLinkIdService(linkId, token);
        setComments(commentsData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchComments();
  }, [linkId, token]);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    try {
      const newComment = await createCommentService(linkId, newCommentText, token);
      setComments((prevComments) => [...prevComments, newComment]);
      setNewCommentText("");
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <p>Loading comments...</p>;
  if (error) return <Error message={error} />;

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
      </form>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <ul key={comment.id}>
              <li>{comment.comment_text}
                    {comment.user_id === user.id && (
                      <button onClick={() => 
                      {if (window.confirm("Are you sure?"))deleteComment(comment.id)}}>Borrar Comentario</button>
                    )}   
                  {error ? <p>{error}</p> : null}
              </li> 
            </ul>
          ))
        ) : (
          <p>No exiten comentarios para este link...</p>
        )}
    </div>
  );
};
