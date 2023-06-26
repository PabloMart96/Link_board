import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export const Error = ({ message }) => {
    return (
        <section>
            <h1>Error</h1>
            <p>{message}</p>
            <Link to={'/'}>Go to Home Page.</Link>
        </section>
    )
};


Error.propTypes = {
    message: PropTypes.string,
}