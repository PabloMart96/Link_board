import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { sendPostService } from "../services";
import { PropTypes } from 'prop-types';
import '../styles/newLink.css';

export const NewPost = ({ addPost }) => {
    const { token } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [picture, setPicture] = useState(null);
    const [error, setError] = useState("");

    const handleForm = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const data = new FormData(e.target);
            const post = await sendPostService({ data, token });

            addPost(post);

            e.target.reset();
            setPicture(null);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <section className="newPublication">
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
                        type="textarea"
                        name="description"
                        id="description"
                    />

                </fieldset>
                <fieldset className="image-field">
                    {/* <label htmlFor="image">Imagen:</label> */}
                    <input
                        type="file"
                        name="image"
                        id="image"
                        onChange={(e) => setPicture(e.target.files[0])}
                    />
                    <label htmlFor="image">Cargar imagen</label>
                    {picture ? (
                        <figure>
                            <img
                                src={URL.createObjectURL(picture)}
                                style={{ width: "100px", borderRadius: '5px' }}
                                alt="Preview"
                            />
                        </figure>
                    ) : null}
                </fieldset>
                <button className="btn">Publicar</button>
                {error ? <p>{error}</p> : null}
                {loading ? <p>publicando...</p> : null}
            </form>
        </section>
    );
};


NewPost.propTypes = {
    addPost: PropTypes.func,
}