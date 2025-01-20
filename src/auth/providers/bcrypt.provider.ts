import { Injectable } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptProvider implements HashingProvider {
  //hashing the password
  public async hashedPassword(data: string | Buffer): Promise<string> {
  //generate Salt
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(data, salt);
  }
  //comparing the password
  public async  comparedPassword(
    data: string | Buffer,
    encryptedPassword: string,
  ): Promise <boolean> {
    return bcrypt.compare(data, encryptedPassword);
  }
}
