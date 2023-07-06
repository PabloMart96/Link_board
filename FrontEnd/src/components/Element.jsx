import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { deletePostService } from "../services";
import { PropTypes } from 'prop-types';
import Box from '@mui/material/Box';
import { Typography } from "@mui/material";
import { Vote } from "./Vote";
import imageDefault from '../assets/default.jpg';

export const Element = ({ link, removePost }) => {

    const navigate = useNavigate();
    const { token, user } = useContext(AuthContext);
    const [error, setError] = useState("");

    const imageSrc = link.image ? `http://localhost:3000/${link.image}` : imageDefault;

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
            <Box>
                <img src={imageSrc} alt="image" />
            </Box>
            <Typography ><Link to={`/link-detail/${link.id}`}>{link.titulo}</Link></Typography>
            <p>{link.url}</p>
            <p>{link.description}</p>
            <p>
                By <Link to={`/user/${link.user_id}`}>{link.username}</Link> on{" "}
                {new Date(link.created_at).toUTCString()}
            </p>
            <Box>
                <Vote linkId={link.id} initialValue={parseInt(link.media)} />

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
