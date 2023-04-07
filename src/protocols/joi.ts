import joi from "joi";

const userSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  numberPhone: joi.string().pattern(/[0-9]+/),
});

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const Joi = {
  userSchema,
  loginSchema,
};

export default Joi;
