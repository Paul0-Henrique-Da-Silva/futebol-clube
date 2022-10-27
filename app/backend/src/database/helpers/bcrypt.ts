import * as bcrypt from 'bcryptjs';

const ecrypt = (password: string, hash: string): boolean =>
  bcrypt.compareSync(password, hash);

export default ecrypt;
