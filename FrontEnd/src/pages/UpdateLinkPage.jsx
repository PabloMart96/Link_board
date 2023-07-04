import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleLinkService, UpdateLinkService } from "../services";

const UpdateLinkPage = () => {
  const [updatedUrl, setUpdatedUrl] = useState("");
  const [updatedTitulo, setUpdatedTitulo] = useState("");
  const [updatedDescripcion, setUpdatedDescripcion] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  // eslint-disable-next-line no-unused-vars
  const [link, setLink] = useState({
    url: "",
    titulo: "",
    description: "",
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
      const data = {
        url: updatedUrl,
        titulo: updatedTitulo,
        description: updatedDescripcion,
      };

      const token = localStorage.getItem("token");
      await UpdateLinkService({ id, token, data });
      navigate(`/`);
     // navigate(`/link-detail/${id}`);
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
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default UpdateLinkPage;
