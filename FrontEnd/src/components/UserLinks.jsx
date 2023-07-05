import { useLinks } from '../hooks/useLinks';
import { Error } from './Error';
import { LinkList } from './LinkList';
import PropTypes from 'prop-types'

export const UserLinks = ({ id }) => {
    const { links, loading, error, removePost } = useLinks(id);

    if (loading) return <p>Loading...</p>
    if (error) return <Error message={error} />;

    return <LinkList links={links} removePost={removePost} />
}

UserLinks.propTypes = {
    id: PropTypes.string.isRequired,
}