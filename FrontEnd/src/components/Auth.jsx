import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export const Auth = () => {

    const { user, logout } = useContext(AuthContext);

    const handleLogoutClick = () => {
        logout();
    }


    return user ? (
        <section>
            <h3>Logged in as {user.username}</h3>
            <ul>
                <li>
                    <Link to={`/user/${user.id}`}>Perfil</Link>
                </li>
                <li>
                    <Link to={`/update`}>Actualizar Perfil</Link>
                </li>
                <li onClick={handleLogoutClick}>
                    <Link to={'/login'}>Logout</Link>
                </li>
            </ul>
        </section>
    ) : (
        <ul>
            <li>
                <Link to={"/register"}>Register</Link>
            </li>
            <li>
                <Link to={"/login"}>Login</Link>
            </li>
        </ul>
    );
};
