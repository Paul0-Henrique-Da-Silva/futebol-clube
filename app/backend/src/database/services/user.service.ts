import { IToken, JwtUser } from '../interfaces/IToken';
import { IUser } from '../interfaces/IUser';
import UserModel from '../models/UsersModel';
import bcrypt from '../helpers/bcrypt';
import jwt from '../helpers/jwt';
import ErrorUser from '../helpers/erros/erro-user';
import ErrorPassword from '../helpers/erros/erro-password';

export default class UserService {
  private modelUser = UserModel;

  public async login(email: string, password: string): Promise<IToken | null> {
    const user = await this.modelUser.findOne({ where: { email }, raw: true }) as IUser;
    if (!user) throw new ErrorUser('Incorrect email or password', 401);
    if (!bcrypt(password, user.password)) return null;
    if (!password) throw new ErrorPassword('Incorrect email or password', 401);
    const token = jwt(user);
    return token as unknown as IToken;
  }

  public async validate(data: JwtUser): Promise<string> {
    const { userId } = data;
    const user = await this.modelUser.findOne({ where: { id: userId }, raw: true }) as IUser;
    return user.role;
  }
}
