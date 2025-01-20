import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class HashingProvider {    // make the class abstract coz it'll never be instantiated
    //hash the password during SignUp
  abstract hashedPassword(data: string|Buffer): Promise <string> 

    // compare the password during LogIn
  abstract comparedPassword(data: string | Buffer, encryptedPassword: string) : Promise <boolean> 
}  
