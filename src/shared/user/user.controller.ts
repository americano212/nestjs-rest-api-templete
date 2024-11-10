import { Body, Controller, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

import { User } from '#entities/user.entity';

import { LocalRegisterDto, GiveRoleToUserDto, UpdateUserDto } from './dto';
import { UserService } from './user.service';
import { SuccessResponseDto } from 'src/common/dto';
import { Role, Roles, UserId } from 'src/common';

@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly user: UserService) {}

  @ApiBody({ type: LocalRegisterDto })
  @Post('register')
  public async localRegister(@Body() localRegisterData: LocalRegisterDto): Promise<User> {
    return await this.user.createLocalUser(localRegisterData);
  }

  @Roles(Role.SuperAdmin)
  @Post('role')
  public async giveRoleToUser(@Body() data: GiveRoleToUserDto): Promise<SuccessResponseDto> {
    return { isSuccess: await this.user.giveRole(data) };
  }

  @Patch()
  public async update(
    @UserId() userId: number,
    @Body() updateUserdata: UpdateUserDto,
  ): Promise<SuccessResponseDto> {
    return { isSuccess: await this.user.update(userId, updateUserdata) };
  }
}
