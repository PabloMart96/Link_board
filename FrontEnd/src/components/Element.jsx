import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { deletePostService } from "../services";
import { PropTypes } from 'prop-types';
import Box from '@mui/material/Box';
import { Typography } from "@mui/material";
import { Vote } from "./Vote";

export const Element = ({ link, removePost }) => {

    const navigate = useNavigate();
    const { token, user } = useContext(AuthContext);
    const [error, setError] = useState("");


    const deletePost = async (id) => {
        try {
            await deletePostService({ id, token });
            if (removePost) {
                removePost(id);
            } else {
                navigate(`/`);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <article>
            <h4><Link to={`/link-detail/${link.id}`}>{link.titulo}</Link></h4>
            <p>{link.url}</p>
            <p>{link.description}</p>
            <p>
                By <Link to={`/user/${link.user_id}`}>{link.username}</Link> on{" "}
                {new Date(link.created_at).toLocaleString()}
            </p>
            <Box sx={{
                '& > legend': { mt: 2 },
            }}>
                <Vote linkId={link.id} initialValue={parseInt(link.media)} />
                <Typography>Votos: {link.votes}</Typography>

            </Box>

            {user && user.id === link.user_id ? (
                <section>
                    <Link to={`/links/edit/${link.id}`}>
                        <button>Editar</button>
                    </Link>
                        <button
                            onClick={() => {
                                if (window.confirm("Are you sure?")) deletePost(link.id);
                            }}
                        >
                            Eliminar
                        </button>
                    {error ? <p>{error}</p> : null}
                </section>
            ) : null}
        </article>
    );
};

Element.propTypes = {
    link: PropTypes.object,
    removePost: PropTypes.func,
}
