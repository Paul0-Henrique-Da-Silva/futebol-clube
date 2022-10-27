import * as Jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/IUser';

const SECRET = process.env.JWT_SECRET;

const jwt = (user: IUser) => {
  const token = Jwt.sign(
    { userId: user.id },
    SECRET as string,
    { algorithm: 'HS256', expiresIn: '3600' },
  );

  return token;
};

export default jwt;
