import { Element } from './Element';
import propTypes from 'prop-types';

export const LinkList = ({ links, removePost }) => {
    return links.length ? (
        <ul>
            {links.map((link, index) => {
                return (
                    <li key={index}>
                        <Element link={link} removePost={removePost} />
                    </li>
                );
            })}
        </ul>
    ) : (
        <p>No existen publicaciones...</p>
    )
};

LinkList.propTypes = {
    links: propTypes.array,
    removePost: propTypes.func,
}