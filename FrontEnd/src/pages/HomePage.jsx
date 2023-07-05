import { useLinks } from '../hooks/useLinks';
import { LinkList } from '../components/LinkList';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Error } from '../components/Error';
import { Loading } from '../components/Loading';
import { NewPost } from '../components/NewPost';

export const HomePage = () => {

    const { links, error, addPost, loading, removePost } = useLinks();
    const { user } = useContext(AuthContext);

    if (loading) return <Loading />
    if (error) return <Error message={error} />

    return (
        <>
            {user ?
                <div>
                    <NewPost addPost={addPost} />
                    <section>
                        <h2>Publicaciones Recientes</h2>
                        <LinkList links={links} removePost={removePost} />
                    </section>

                </div> : null
            }
        </>

    )
}
