import { useLinks } from '../hooks/useLinks';
import { LinkList } from '../components/LinkList';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Error } from '../components/Error';
import { Loading } from '../components/Loading';

export const HomePage = () => {

    const { links, error, loading } = useLinks();
    const { user } = useContext(AuthContext);

    if (loading) return <Loading />
    if (error) return <Error message={error} />

    return (
        <>
            {user ?
                <section>
                    <h1>Links Posted</h1>
                    <LinkList links={links} />
                </section> : null}
        </>

    )
}
