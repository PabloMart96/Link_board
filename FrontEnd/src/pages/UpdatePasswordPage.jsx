import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { UpdatePasswordService } from "../services/index";
import '../styles/PopUp.css';

export const UpdatePasswordPage = () => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);

    const handleForm = async (e) => {
        e.preventDefault();
    
        if (password !== confirmPassword) {
          setError("Las contraseñas no coinciden");
          return;
        }
    
        setShowModal(true);
      };
    
    const handleLogout = async () => {
        try {
            await UpdatePasswordService({ password });
            logout();
            navigate("/login");
        } catch (error) {
            setError(error.message);
        }
     };

    return (
        <section className="updatePassword">
        <h2>Cambiar Contraseña</h2>
        <form onSubmit={handleForm}>
            <fieldset>
            <label htmlFor="password">Nueva Contraseña</label>
            <input
                type="password"
                name="password"
                id="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
            />
            </fieldset>
            <fieldset>
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={confirmPassword}
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            </fieldset>
            <button className="btn">Cambiar Contraseña</button>
            {error && <p className="error">{error}</p>}
        </form>

        {showModal && (
        <div className="modalUpdate">
          <div className="modalText">
            <p>
              Al actualizar tu contraseña se procederá al cierre de la sesión y se te redirigirá a la página de Login.
            </p>
            <p>¿Deseas continuar?</p>
            <div className="modalbuttons">
              <button onClick={handleLogout}>Confirmar</button>
              <button onClick={() => setShowModal(false)}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
        <Link to="/update" className="btn">
        Volver a Actualizar Usuario
        </Link>
        </section>
    );
};
