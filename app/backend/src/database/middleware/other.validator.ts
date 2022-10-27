import * as Jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';
import { IAuthorization } from '../interfaces/IAuthorization';

const secret = process.env.JWT_SECRET as string;

class Validation {
  public requiretoken = async (request: Request, response: Response, next: NextFunction):
  Promise<Response | undefined> => {
    try {
      const { authorization } = request.headers as IAuthorization;
      const auth = authorization.replace('Bearer ', '');
      Jwt.verify(auth as string, secret);
      next();
    } catch (error) {
      return response.status(401).json({ message: 'Token invalid or expired' });
    }
  };
}

export default Validation;
