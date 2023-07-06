import { useParams } from "react-router-dom";
import { Error } from "../components/Error";
import { Loading } from "../components/Loading";
import { UserLinks } from "../components/UserLinks";
import { useUser } from "../hooks/useUser";
import { Avatar, Grid, Box, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import imageDefault from '../assets/default.jpg';

export const ProfilePage = () => {

    const { id } = useParams();
    const { user, loading, error, removePost } = useUser(id);

    const imagenSrc = user.image ? `http://localhost:3000/${user.image}` : imageDefault;

    if (loading) return <Loading />
    if (error) return <Error message={error} />

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="start"
            sx={{ minHeight: '83vh', padding: 4, borderRadius: 2 }}>
            <Grid
                item
                className='box-shadow'
                xs={3}
                sx={{
                    width: { sm: 500 },
                    backgroundColor: 'white',
                    padding: 3,
                    borderRadius: 2,
                    marginBottom: 3
                }}>
                <Box display='flex' alignItems={'center'}>
                    <Box xs={'auto'} sx={{ mt: 2 }}>
                        <Avatar alt="avatar" src={imagenSrc} sx={{ width: 100, height: 100, backgroundColor: 'lightgray' }}>
                            <PersonIcon sx={{ width: 60, height: 60 }} />
                        </Avatar>
                        {/* <img src={imagenSrc} alt="avatar" /> */}
                        <Typography variant="h4" textAlign={'center'}>{user.username}</Typography>
                    </Box>
                    <Box xs={'auto'} flexGrow={1} sx={{ ml: 3, mt: 2 }}>
                        <p>User email: {user.email}</p>
                        <p> {user.description}</p>
                        <p> Registered on {new Date(user.created_at).toLocaleDateString()}</p>
                    </Box>
                </Box>

            </Grid>
            <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                <Typography variant="h6">Publicaciones</Typography>
                <UserLinks id={id} removePost={removePost} />
            </Box>

        </Grid>

    )
}