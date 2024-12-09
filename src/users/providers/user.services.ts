import { Injectable } from '@nestjs/common';
import { GetUserParamDto } from '../dto/get-usersParam.dto';
// Any communication to the dataBase must come from the services
@Injectable()
export class UserService {
  public findAll(
    getUserParamDto: GetUserParamDto,
    limits: number,
    page: number,
  ) {
    return [
      {
        firstName: "Hauwa'u",
        lastName: 'Muhammad',
        email: 'muhammadhauwa@gmail.com',
        password: 'Hauwa@01',
        address: 'Malalin-gabas, kaduna',
        isAuth: true,
      },
    ];
  }

  public findOneById(GetUserParamDto) {
    return [{}];
  }
}
