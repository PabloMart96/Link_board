import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUserService } from "../services";
import { AuthContext } from "../context/AuthContext";
import { Slider } from "../components/Slider";
import "../styles/login&register.css";

export const LoginPage = () => {
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
    <section className="formSection">
      <img src="../assets/userIcon.png" alt="user" />
      <form onSubmit={handleForm}>
        <h1 className="formTitle">Login</h1>
        <fieldset>
          <label htmlFor="email">Email</label>
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
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </fieldset>
        <button>Login</button>
        {error ? <p>{error}</p> : null}
      </form>
      <Slider />
    </section>
  );
};
