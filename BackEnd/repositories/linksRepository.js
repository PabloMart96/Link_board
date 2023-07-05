const { getConnection } = require('../db/db');
const { generateError } = require('../helpers');


//Devuelve todos los links de la base de datos
const getAllLinks = async () => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(`
        SELECT l.id, l.user_id,  l.url, l.titulo, l.description, l.created_at, u.username, u.email, u.image, ROUND(AVG(rating)) as media, COUNT(link_id) AS votes FROM links l left JOIN users u 
        ON l.user_id=u.id left JOIN ratings r ON r.link_id= l.id GROUP BY l.id  ORDER BY l.created_at DESC
        `);
        return result;
    } finally {
        if (connection) connection.release();
    }
};

//Crea la publicacion de un link
const createLink = async (userId, url, titulo, description) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(`
            INSERT INTO links (user_id, url, titulo, description) VALUES (?, ?, ?, ?)
        `,
            [userId, url, titulo, description]);

        return result.insertId;
    } finally {
        if (connection) connection.release();
    }
};

//Devuelve el link a partir del id
const getLinkById = async (id) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(`
            SELECT * FROM links WHERE id = ?
        `,
            [id]);

            if(result.length === 0){
                throw generateError(`El link con ID: ${id} no existe`, 404);
            }

            console.log(result);
        return result[0];
    } finally {
        if (connection) connection.release();
    }
};

//Borra el link a partir del id
const deleteLinkById = async (id) => {
    let connection;

    try {
        connection = await getConnection();

        await connection.query(`
            DELETE FROM links WHERE id = ?
        `,
            [id]);

        return;
    } finally {
        if (connection) connection.release();
    }
};

//Devuelve los links a partir de id del usuario autentificado
const getLinksByUserId = async (id) => {
    let connection;

    try {
        connection = await getConnection();

        const [result] = await connection.query(
            `
            SELECT links.*, users.email, users.username FROM links LEFT JOIN users on links.user_id = users.id WHERE links.user_id = ?
        `,
            [id]
        );

        return result;
    } finally {
        if (connection) connection.release();
    }
};

const updateLinkById = async (data) => {
    let connection;
    const { id, url, titulo, description } = data;

    try {
        connection = await getConnection();

        await connection.query(`
            UPDATE links
            SET url = ?, titulo = ?, description = ? WHERE id = ?
        `,
            [url, titulo, description, id]);

        return true;
    } finally {
        if (connection) connection.release();
    }

};

module.exports = {
    getAllLinks,
    createLink,
    getLinkById,
    deleteLinkById,
    getLinksByUserId,
    updateLinkById,
}