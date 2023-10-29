import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { LocalRegisterDto, addRoleDto } from './dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller()
export class UserController {
  constructor(private readonly user: UserService) {}

  @Post('register')
  public async localRegister(
    @Body() registerData: LocalRegisterDto,
  ): Promise<boolean> {
    const isSuccess = this.user.create(registerData);
    return isSuccess;
  }

  @Post('user/role')
  public async addRoleToUser(@Body() data: addRoleDto): Promise<boolean> {
    console.log('data', data);
    const isSuccess = this.user.addRole(data);

    return isSuccess;
  }
}