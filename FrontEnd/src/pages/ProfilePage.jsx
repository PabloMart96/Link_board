import { useParams } from "react-router-dom";
import { Error } from "../components/Error";
import { Loading } from "../components/Loading";
import { UserLinks } from "../components/UserLinks";
import { useUser } from "../hooks/useUser";

export const ProfilePage = () => {

    const { id } = useParams();
    const { user, loading, error } = useUser(id);

    const imagenSrc = user.image ? `http://localhost:3000/${user.image}` : `../assets/default.jpg`;

    if (loading) return <Loading />
    if (error) return <Error message={error} />

    return (
        <div>
            <section>
                <img src={imagenSrc} alt="avatar" />
                <h2>{user.username}</h2>
                <section>
                    <p>User email: {user.email}</p>
                    <p> {user.description}</p>
                    <p> Registered on {new Date(user.created_at).toLocaleString()}</p>
                </section>
            </section>
            <section>
                <UserLinks id={id} />
            </section>
        </div>

    )
}