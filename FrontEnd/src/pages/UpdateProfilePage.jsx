import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { UpdateUserService, getMyDataService } from "../services/index";

export const UpdateProfilePage = () => {
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [picture, setPicture] = useState(null);
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getMyDataService(token);
                setUsername(userData.username);
                setEmail(userData.email);
                setDescription(userData.description);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchUserData();
    }, [token]);

    const handleForm = async (e) => {
        e.preventDefault();

        try {
            const data = new FormData(e.target);
            await UpdateUserService({ token, data });

            navigate("/");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <section>
            <h1>Actualizar Usuario</h1>
            <form onSubmit={handleForm}>
                <fieldset>
                    <label htmlFor="image">Imagen</label>
                    <input
                        type="file"
                        name="picture"
                        id="image"
                        onChange={(e) => setPicture(e.target.files[0])}
                    />
                    {picture ? (
                        <figure>
                            <img
                                src={URL.createObjectURL(picture)}
                                style={{ width: "100px" }}
                                alt="Preview"
                            />
                        </figure>
                    ) : null}
                </fieldset>
                <fieldset>
                    <label htmlFor="username">Nombre de usuario</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={username}
                        required
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        disabled
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="description">Descripción</label>
                    <textarea
                        type="text"
                        name="description"
                        id="description"
                        value={description || ""}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </fieldset>
                <button>Actualizar</button>
                {error ? <p>{error}</p> : null}
            </form>
        </section>
    );
};
