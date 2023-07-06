const Joi = require('joi');
const { getCommentsByLinkId, createComment } = require("../repositories/commentsRepository");

const schema = Joi.object().keys({
  comment_text: Joi.string().min(1).max(500).required()
});

// Devuelve todos los comentarios de un link por ID
const getCommentsController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const comments = await getCommentsByLinkId(id);

    res.send({
      status: 'success',
      data: comments,
    });
  } catch (error) {
    next(error);
  }
};

// Crea un comentario para un link
const createCommentController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    await schema.validateAsync(body);
    const { comment_text } = body;

    const userId = req.auth.id;

    const commentId = await createComment(userId, id, comment_text);

    res.send({
      status: 'success',
      message: `Comentario con ID: ${commentId} creado correctamente!!`,
      data: { comment_text },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCommentsController,
  createCommentController,
};
