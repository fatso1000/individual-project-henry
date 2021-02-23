import Joi from "joi";

export default {
  uploadVideogame: Joi.object().keys({
    name: Joi.string().min(3).max(100).required(),
    description: Joi.string().max(1000).required(),
    releaseDate: Joi.string().optional(),
    rating: Joi.number().optional(),
    platforms: Joi.array()
      .min(0)
      .items(Joi.string().uppercase().trim())
      .required(),
  }),
};
