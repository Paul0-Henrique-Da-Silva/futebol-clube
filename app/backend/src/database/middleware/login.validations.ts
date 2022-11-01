import { Request, Response, NextFunction } from 'express';
import Joi = require('joi');
import UserModel from '../models/UsersModel';
import UserService from '../services/user.service';
import { IUser } from '../interfaces/IUser';

const userlogin = Joi.object({
  password: Joi.string().required()
    .messages({ 'string.empty': 'All fields must be filled' }),
  email: Joi.string().required()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
    .messages({ 'string.empty': 'All fields must be filled' }),
});

class Validation {
  private model = UserModel;
  constructor(
    private userService = new UserService(),
  ) { }

  public requireLogin = async (request: Request, response: Response, next: NextFunction):
  Promise<Response | undefined> => {
    const { email, password } = request.body;

    const { error } = userlogin.validate({ email, password });
    if (error) return response.status(400).json({ message: error.message });

    const user = await this.model.findOne({ where: { email }, raw: true }) as IUser;
    if (!user) {
      return response.status(401)
        .json({ message: 'Incorrect email or password' });
    }
    const token = await this.userService.login(email, password);
    if (!token) {
      return response.status(401)
        .json({ message: 'Incorrect email or password' });
    }
    next();
  };
}

export default Validation;
