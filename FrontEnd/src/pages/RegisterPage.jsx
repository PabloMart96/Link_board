import { useContext } from "react";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { registerUserService } from "../services";
import { AuthContext } from "../context/AuthContext";

export const RegisterPage = () => {

    const navigate = useNavigate();

    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


    const handleForm = async (e) => {
        e.preventDefault();

        try{
            //Con este trozo de codigo se logea al usuario despues de registrarse
            //Descomentar todo lo que esta comentado

            const response = await registerUserService({ username, email, password });
           // const token = response.access;
            const BearerToken = `Bearer ${response}`;
            login(BearerToken);
            navigate("/");


            //Con este trozo se redirige al login
            // await registerUserService({ username, email, password });
            // navigate("/login");


        } catch (error){
            setError(error.message);
        }
    };

    // const redirectToLogin = () => {
    //     navigate("/login");
    //   };

    return (
        <section>
            <form onSubmit={handleForm}>
                <fieldset >
                <legend>Register New User</legend>
                    <label htmlFor="username">Username:</label><br/>
                    <input type="text" name="username" id="username" value={username} required
                    onChange={(e) => setUsername(e.target.value)}/><br/>

                    <label htmlFor="email">Email:</label><br/>
                    <input type="email" name="email" id="email" value={email} required
                    onChange={(e) => setEmail(e.target.value)}/><br/>

                    <label htmlFor="password">Password:</label><br/>
                    <input type="password" name="password" id="password" value={password} required
                    onChange={(e) => setPassword(e.target.value)}/><br/>
                </fieldset>
                <button /*type="button" onClick={redirectToLogin}*/>Sign Up</button>
                {error ? <p>{error}</p> : null}
            </form>
        </section>
    )
}
