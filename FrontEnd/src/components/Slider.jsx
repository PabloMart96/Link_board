import { useLocation, Link } from "react-router-dom";
import "../styles/slider.css";

export const Slider = () => {
  const location = useLocation();

  return (
    <div
      id="slider"
      className={location.pathname === "/login" ? "login" : "register"}
    >
      <Link to={location.pathname === "/login" ? "/register" : "/login"}>
        <button id="sliderButton">
          {location.pathname === "/login" ? "Registrarse" : "Iniciar sesión"}
        </button>
      </Link>
    </div>
  );
};
