const { getConnection } = require('../db/db');

// Devuelve todos los comentarios de un link
const getCommentsByLinkId = async (linkId) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
      SELECT c.id, c.user_id, c.link_id, c.comment_text, c.created_at, u.username
      FROM comments c
      INNER JOIN users u ON c.user_id = u.id
      WHERE c.link_id = ?
      ORDER BY c.created_at DESC
      `,
      [linkId]
    );

    return result;
  } finally {
    if (connection) connection.release();
  }
};

// Crea un comentario para un link
const createComment = async (userId, linkId, commentText) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
      INSERT INTO comments (user_id, link_id, comment_text)
      VALUES (?, ?, ?)
      `,
      [userId, linkId, commentText]
    );

    return result.insertId;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  getCommentsByLinkId,
  createComment,
};