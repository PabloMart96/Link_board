import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { sendPostService } from "../services";
import { PropTypes } from 'prop-types';
import { useNavigate } from "react-router-dom";

export const NewPost = ({ addPost }) => {
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleForm = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const data = new FormData(e.target);
            const post = await sendPostService({ data, token });

            addPost(post);

            e.target.reset();
            navigate('/');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <h2>Añadir Publicación</h2>
            <form onSubmit={handleForm}>
                <fieldset>
                    <label htmlFor="text">URL</label>
                    <input type="text" name="url" id="url" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="text">Titulo</label>
                    <input type="text" name="titulo" id="titulo" required />
                </fieldset>
                <fieldset>
                    <label>Descripción</label>
                    <textarea
                        type="text"
                        name="description"
                        id="description"
                    />
                </fieldset>
                <button>Publicar</button>
                {error ? <p>{error}</p> : null}
                {loading ? <p>publicando...</p> : null}
            </form>
        </>
    );
};


NewPost.propTypes = {
    addPost: PropTypes.func,
}