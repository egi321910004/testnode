import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const userSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  identity_number: Joi.string().length(16).required(),
  email: Joi.string().email().required(),
  date_of_birth: Joi.date().required(),
});

const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  } else {
    next();
  }
};

export default validateUser;
