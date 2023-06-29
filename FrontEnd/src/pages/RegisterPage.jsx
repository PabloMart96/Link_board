//import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUserService } from "../services";
import { Slider } from "../components/Slider";
//import { AuthContext } from "../context/AuthContext";
import "../styles/login&register.css";

export const RegisterPage = () => {
  const navigate = useNavigate();

  //   const { register } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      //Con este trozo de codigo se logea al usuario despues de registrarse
      //Descomentar todo lo que esta comentado

      // const response = await registerUserService({ username, email, password });
      // const token = response.access;
      // const BearerToken = `Bearer ${token}`;
      // register(BearerToken);
      // navigate("/");

      //Con este trozo se redirige al login
      await registerUserService({ username, email, password });
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="formSection">
      <img src="../assets/userIcon.png" alt="user" />
      <form onSubmit={handleForm}>
        <h1 className="formTitle">Register</h1>

        <fieldset>
          <label htmlFor="username">Username:</label>
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
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </fieldset>

        <fieldset>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </fieldset>
        <button>Sign Up</button>
        {error ? <p>{error}</p> : null}
      </form>
      <Slider />
    </section>
  );
};
