/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
export const Element = ({ link }) => {
    return (
        <article>
            <h4>{link.titulo}</h4>
            <p>{link.url}</p>
            <p>{link.description}</p>
            <p>
                By <Link to={`/user/${link.user_id}`}>{link.username}</Link> on{" "}
                {new Date(link.created_at).toLocaleString()}
            </p>
            {link.media ? <p>rating: {link.media}</p> : null}
        </article>
    );
};