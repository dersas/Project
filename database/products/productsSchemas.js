import Joi from "joi";

const createProductSchema = Joi.object({
  title: Joi.string().required().min(3).max(32),
  author: Joi.string().required().max(32),
  publication_year: Joi.alternatives()
    .try(Joi.string(), Joi.number())
    .required(),
  genre: Joi.array().items(Joi.string().required()).max(5),
  description: Joi.string().required().min(6).max(280),
  cover_image: Joi.string()
    .optional()
    .default(
      "https://www.shutterstock.com/image-vector/book-icon-sign-design-600nw-553945819.jpg"
    ),
  currency: Joi.string().required().max(3),
  price: Joi.number().required().min(0),
});

export default {
  createProductSchema,
};
