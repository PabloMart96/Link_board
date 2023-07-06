import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleLinkService, UpdateLinkService } from "../services";

const UpdateLinkPage = () => {
  const [updatedUrl, setUpdatedUrl] = useState("");
  const [updatedTitulo, setUpdatedTitulo] = useState("");
  const [updatedDescripcion, setUpdatedDescripcion] = useState("");
  const [updatePicture, setUpdatePicture] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  // eslint-disable-next-line no-unused-vars
  const [link, setLink] = useState({
    url: "",
    titulo: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await getSingleLinkService(id, token);
        setLink(data);
        setUpdatedUrl(data.url);
        setUpdatedTitulo(data.titulo);
        setUpdatedDescripcion(data.description);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // const data = {
      //   url: updatedUrl,
      //   titulo: updatedTitulo,
      //   description: updatedDescripcion,
      // };

      const data = new FormData(e.target);

      const token = localStorage.getItem("token");
      await UpdateLinkService({ id, token, data });
      navigate(`/`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUrlChange = (e) => {
    setUpdatedUrl(e.target.value);
  };

  const handleTituloChange = (e) => {
    setUpdatedTitulo(e.target.value);
  };

  const handleDescripcionChange = (e) => {
    setUpdatedDescripcion(e.target.value);
  };

  return (
    <div>
      <h1>Editar Enlace</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="url">URL:</label>
        <input
          type="text"
          id="url"
          name="url"
          value={updatedUrl}
          onChange={handleUrlChange}
        />
        <label htmlFor="titulo">Título:</label>
        <input
          type="text"
          id="titulo"
          name="titulo"
          value={updatedTitulo}
          onChange={handleTituloChange}
        />
        <label htmlFor="description">Descripción:</label>
        <input
          type="text"
          id="description"
          name="description"
          value={updatedDescripcion}
          onChange={handleDescripcionChange}
        />
        <fieldset>
          <label htmlFor="image">Imagen</label>
          <input
            type="file"
            name="picture"
            id="image"
            onChange={(e) => setUpdatePicture(e.target.files[0])}
          />
          {updatePicture ? (
            <figure>
              <img
                src={URL.createObjectURL(updatePicture)}
                style={{ width: "100px" }}
                alt="Preview"
              />
            </figure>
          ) : null}
        </fieldset>
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default UpdateLinkPage;
