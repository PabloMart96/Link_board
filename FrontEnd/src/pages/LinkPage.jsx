import { useParams } from "react-router-dom"
import useLink from "../hooks/useLink";
import { Error } from "../components/Error";
import { Element } from "../components/Element";

export const LinkPage = () => {
    const { id } = useParams();
    const { link, loading, error } = useLink(id);
    

    if(loading) return <p>loading publication...</p>;
    if (error) return <Error message={error} />;


    return(
        <section>
            <h1>Link</h1>
            <Element link={link} />
        </section>
    );
};