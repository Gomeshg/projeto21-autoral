import joi from "joi";

const idSchema = joi.object({
  id: joi.number().min(1).required(),
});

const dateSchema = joi.object({
  date: joi
    .string()
    .pattern(/[0-9]{2}-[0-9]{2}-[0-9]{4}/)
    .required(),
});

const userSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(4).required(),
  numberPhone: joi
    .string()
    .pattern(/([0-9]{2})?[9]{1}[0-9]{4}[0-9]{4}/)
    .required(),
});

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(4).required(),
});

const lineSchema = joi.object({
  type: joi
    .string()
    .valid("MAQUINA", "MAQUINA_E_TESOURA", "TESOURA", "NAVALHA")
    .required(),
  date: joi.string().pattern(/([0-9]{2})?[9]{1}[0-9]{4}[0-9]{4}/),
  initTime: joi.string().pattern(/[0-9]{2}:[0-9]{2}/),
  avgDuration: joi.number().required(),
});

const Joi = {
  idSchema,
  dateSchema,
  userSchema,
  loginSchema,
  lineSchema,
};

export default Joi;
