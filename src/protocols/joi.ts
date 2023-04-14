import joi from "joi";

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
  date: joi.date().required(),
  initTime: joi.date().required(),
  avgDuration: joi.number().required(),
});

const Joi = {
  userSchema,
  loginSchema,
  lineSchema,
};

export default Joi;
