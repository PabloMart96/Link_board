import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUserService } from "../services";
import { AuthContext } from "../context/AuthContext";
import { Slider } from "../components/Slider.jsx";
import "../styles/loginRegister.css";

export const LogRegForms = () => {
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      const token = await loginUserService({ email, password });

      const BearerToken = `Bearer ${token}`;

      login(BearerToken);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="loginAndRegister">
      <form id="loginForm" onSubmit={handleForm}>
        <h1 id="loginTitle">Iniciar sesión</h1>
        <fieldset className="mailField">
          <label className="mailLabel" htmlFor="email">
            Correo electrónico:
          </label>
          <input
            type="email"
            name="email"
            className="mailInput"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </fieldset>
        <fieldset className="passField">
          <label className="passLabel" htmlFor="password">
            Contraseña:
          </label>
          <input
            type="password"
            name="password"
            className="passInput"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </fieldset>
        <button className="submitForm">Acceder</button>
        {error ? <p>{error}</p> : null}
      </form>

      <form id="registerForm">
        <h1 id="registerTitle">Registro</h1>

        <fieldset className="nameField">
          <label className="nameLabel">Nombre:</label>
          <input className="nameInput" type="text" name="name" />
        </fieldset>

        <fieldset className="mailField">
          <label className="mailLabel">Correo electrónico:</label>
          <input className="mailInput" type="email" name="mail" />
        </fieldset>

        <fieldset className="passField">
          <label className="passLabel">Contraseña:</label>
          <input className="passInput" type="password" name="password" />
        </fieldset>

        <button className="submitForm">Registrarse</button>
      </form>
      <Slider />
    </section>
  );
};
