import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { registerUserService } from "../services";
import { AuthContext } from "../context/AuthContext";

export const RegisterPage = () => {

    const navigate = useNavigate();

    const { register } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


    const handleForm = async (e) => {
        e.preventDefault();

        try{
            console.log();
        } catch (error){
            setError(error.message)
        }



    }

    return (
        <section>
            <form>
                <fieldset onSubmit={handleForm}>
                <legend>Register New User</legend>
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" id="username" value={username} required
                    onChange={(e) => setUsername(e.target.value)}/>

                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" id="email" value={email} required
                    onChange={(e) => setEmail(e.target.value)}/>

                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                </fieldset>
                <button>Sign Up</button>
                {error ? <p>{error}</p> : null}
            </form>
        </section>
    )
}
