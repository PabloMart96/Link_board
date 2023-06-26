import { Element } from './Element';
import propTypes from 'prop-types';

export const LinkList = ({ links }) => {
    return links.length ? (
        <ul>
            {links.map((link, index) => {
                return (
                    <li key={index}>
                        <Element link={link} />
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
}