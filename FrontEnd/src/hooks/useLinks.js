import { useContext, useEffect, useState } from "react";
import { getAllLinksService, getLinksByIdService } from "../services";
import { AuthContext } from "../context/AuthContext";

export const useLinks = (id) => {

    const { token } = useContext(AuthContext);

    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadLinks = async () => {
            try {
                setLoading(true);
                const data = id
                    ? await getLinksByIdService(id, token)
                    : await getAllLinksService(token);

                setLinks(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadLinks();
    }, [id, token]);

    return { links, error, loading };
};
