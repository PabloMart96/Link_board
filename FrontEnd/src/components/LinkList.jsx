import { Element } from './Element';
import PropTypes from 'prop-types';
import '../styles/linkList.css'

export const LinkList = ({ links, removePost }) => {

    return links.length ? (
        <ul className='container'>
            {links.map((link, index) => {
                return (
                    <li key={index} className='element'>
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
    links: PropTypes.array,
    removePost: PropTypes.func,
}