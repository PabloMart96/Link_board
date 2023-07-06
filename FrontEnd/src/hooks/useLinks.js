/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { getAllLinksService, getLinksByIdService } from "../services";
import { AuthContext } from "../context/AuthContext";

export const useLinks = (id) => {

    const { token } = useContext(AuthContext);
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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


    useEffect(() => {
        loadLinks();
    }, [id, token]);


    const addPost = (data) => {
        setLinks([data, ...links]);
        loadLinks();
    };

    const removePost = (id) => {
        setLinks(links.filter((link) => link.id !== id));
    };


    return { links, error, addPost, removePost, loading };
};
