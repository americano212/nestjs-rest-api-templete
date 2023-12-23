import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { User } from '#entities/user.entity';

import { RolesRepository } from './role.repository';
import { UserRolesRepository } from './user-role.repository';

@Injectable()
export class RoleService {
  constructor(
    private readonly rolesRepository: RolesRepository,
    private readonly userRolesRepository: UserRolesRepository,
  ) {}

  public async create(role_name: string): Promise<boolean> {
    try {
      const role = await this.rolesRepository.create(role_name);
      if (!role) throw new BadRequestException(`The role ${role_name} already exist`);
      return true;
    } catch (error: unknown) {
      if (error instanceof BadRequestException) {
        const message = error?.message;
        throw new HttpException(message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('UNKNOWN ERROR', HttpStatus.BAD_REQUEST);
    }
  }

  public async addRoleToUser(role_name: string, user: User): Promise<boolean> {
    try {
      const role = await this.rolesRepository.findRoleByName(role_name);
      if (!role) throw new NotFoundException(`The role ${role_name} is not valid role`);
      const user_roles: string[] = [];
      user.roles?.forEach((user_role) => {
        user_roles.push(user_role.role_name);
      });
      const isExistRoleToUser = user_roles.includes(role_name);
      if (isExistRoleToUser)
        throw new BadRequestException(
          `The role ${role_name} already exist role to user ${user.user_id}`,
        );
      const user_role = await this.userRolesRepository.create({ user, role, role_name });
      if (!user_role) throw new Error();
      return true;
    } catch (error: unknown) {
      if (error instanceof NotFoundException) {
        const message = error?.message;
        throw new HttpException(message, HttpStatus.NOT_FOUND);
      }
      if (error instanceof BadRequestException) {
        const message = error?.message;
        throw new HttpException(message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('UNKNOWN ERROR', HttpStatus.BAD_REQUEST);
    }
  }
}
