import { useContext, useEffect, useState} from 'react';
import { getCommentsByLinkIdService } from '../services';
import { AuthContext } from "../context/AuthContext";

const useComments = (linkId) => {

    const { token } = useContext(AuthContext);

    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadComments = async () => {
            try{
                setLoading(true);

                const data = await getCommentsByLinkIdService(linkId, token);
                setComments(data);

            } catch(error){
                setError(error.message);
            } finally{
                setLoading(false);
            }
        }

        loadComments();
    }, [linkId, token]);

    return { comments, loading, error };
};

export default useComments;