const Joi = require('joi');
const { getAllLinks, createLink, getLinkById, deleteLinkById, updateLinkById } = require("../repositories/linksRepository");
const { generateError } = require('../helpers');

//Crea un esquema de validacion con el paquete Joi
const schema = Joi.object().keys({
  url: Joi.string().min(10).max(200).required(),
  titulo: Joi.string().min(3).max(200).required(),
  description: Joi.string().min(10).max(200).required()
});

const schema2 = Joi.number().integer().positive().required();

//Devuelve todos los links publicados
const getLinksController = async (req, res, next) => {
  try {
    const links = await getAllLinks();

    res.send({
      status: 'success',
      data: links,
    })

  } catch (error) {
    next(error);
  }
};

//Crea la publiacion de un link de un usuario registrado
const newLinkController = async (req, res, next) => {
  try {
    const { body } = req;
    await schema.validateAsync(body);
    const { url, titulo, description } = body;

    const userId = req.auth.id;

    const id = await createLink(userId, url, titulo, description);

    res.send({
      status: 'success',
      message: `Links con id: ${id} creado correctamente!!`,
      data: { url, titulo, description },
    });

  } catch (error) {
    next(error);
  }
};

const updateLinkController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    await schema.validateAsync(body);
    const { url, titulo, description } = body;
    const userId = req.auth.id;

    const link = await getLinkById(id);
    
    if (userId !== link.user_id) {
      throw generateError('Estás tratando de editar un link que no es tuyo!!', 401);
    }

    await updateLinkById({ id, url, titulo, description });

    res.send({
      status: 'success',
      message: `El link con id: ${id} fue editado exitosamente!!`,
      data: { url, titulo, description },
    });

  } catch (error) {
    next(error);
  }
};

//Borra una publicacion de un usuario registrado
const deleteLinkController = async (req, res, next) => {
  try {
    const userId = req.auth.id;
    const { id } = req.params;
    await schema2.validateAsync(id);

    const link = await getLinkById(id);
    const { url, titulo } = link;
    
    if (userId !== link.user_id) {
      throw generateError('Estas tratando de borrar un link que no es tuyo!!', 401);
    }

    await deleteLinkById(id);

    res.send({
      status: 'success',
      message: `El link con id: ${id} fue borrado exitosamente!!`,
      data: { titulo, url },
    });

  } catch (error) {
    next(error);
  }
};


//Devuelve el link por ID
const getSingleLinkController = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const link = await getLinkById(id);

    res.send({
      status: 'success',
      data: link,
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getLinksController,
  newLinkController,
  deleteLinkController,
  getSingleLinkController,
  updateLinkController,
}