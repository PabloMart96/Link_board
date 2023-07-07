import { useParams } from "react-router-dom";
import { Error } from "../components/Error";
import { Loading } from "../components/Loading";
import { UserLinks } from "../components/UserLinks";
import { useUser } from "../hooks/useUser";
import { Avatar, Box, Typography } from "@mui/material";
import imageDefault from '../assets/default.jpg';
import '../styles/profile.css';

export const ProfilePage = () => {

    const { id } = useParams();
    const { user, loading, error, removePost, handlePagination } = useUser(id);

    const imagenSrc = user.image ? `http://localhost:3000/${user.image}` : imageDefault;

    if (loading) return <Loading />
    if (error) return <Error message={error} />

    return (
        <div className="profileContainer">
            <article className='profileCard'>
                <Avatar alt="avatar" src={imagenSrc} className="avatarProfile" />
                <Box xs={'auto'} flexGrow={1} sx={{ ml: 3, mt: 2 }}>
                    <Typography variant="h4" textAlign={'start'}>{user.username}</Typography>
                    <p>User email: {user.email}</p>
                    <p> {user.description}</p>
                    <p> Registered on {new Date(user.created_at).toLocaleDateString()}</p>
                </Box>
            </article>
            <section className="listProfile">
                <h2>Publicaciones</h2>
                <UserLinks id={id} removePost={removePost} handlePagination={handlePagination} />
            </section>

        </div>

    )
}