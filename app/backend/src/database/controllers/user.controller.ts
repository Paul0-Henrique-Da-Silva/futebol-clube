import * as Jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { IAuthorization } from '../interfaces/IAuthorization';
import { JwtUser } from '../interfaces/IToken';
import UserService from '../services/user.service';

const SECRET = process.env.JWT_SECRET;

export default class UserController {
  constructor(
    private serviceUser = new UserService(),
  ) {}

  public login = async (request: Request, response: Response): Promise<Response> => {
    const { email, password } = request.body;
    if (!password) return response.status(401).json({ message: 'Incorrect email or password' });
    const token = await this.serviceUser.login(email, password);
    return response.status(200).json({ token });
  };

  public validate = async (request: Request, response: Response): Promise<Response> => {
    try {
      const { authorization } = request.headers as IAuthorization;
      const auth = authorization.replace('Bearer ', '');
      const verifyToken = Jwt.verify(auth as string, SECRET as string);
      const role = await this.serviceUser.validate(verifyToken as JwtUser);
      return response.status(200).json({ role });
    } catch (err) {
      return response.status(401).json({ message: 'Token invalid or expired' });
    }
  };
}
