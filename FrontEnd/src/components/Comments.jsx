import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getCommentsByLinkIdService, createCommentService } from "../services/index";
import { Error } from "./Error";

// eslint-disable-next-line react/prop-types
export const Comments = ({ linkId }) => {
  const { token } = useContext(AuthContext);
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

  return (
    <div>
      <h2>Comments</h2>
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          value={newCommentText}
          onChange={(event) => setNewCommentText(event.target.value)}
          placeholder="Enter your comment"
        />
        <button type="submit">Submit</button>
      </form>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <ul key={comment.id}>
              <li>{comment.comment_text}</li> 
            </ul>
          ))
        ) : (
          <p>No exiten comentarios para este link...</p>
        )}
    </div>
  );
};
