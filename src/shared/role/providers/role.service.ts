import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { User } from '#entities/user.entity';

import { RolesRepository } from './role.repository';
import { UserRolesRepository } from './user-role.repository';

@Injectable()
export class RoleService {
  constructor(
    private readonly rolesRepository: RolesRepository,
    private readonly userRolesRepository: UserRolesRepository,
  ) {}

  public async create(roleName: string): Promise<boolean> {
    const role = await this.rolesRepository.create(roleName);
    return role ? true : false;
  }

  public async addRoleToUser(roleName: string, user: User): Promise<boolean> {
    const role = await this.rolesRepository.findRoleByName(roleName);
    if (!role) throw new NotFoundException(`The role '${roleName}' invalid role`);
    const userRoles: string[] = [];
    user.roles?.forEach((user_role) => {
      userRoles.push(user_role.role_name);
    });
    const isExistRoleToUser = userRoles.includes(roleName);
    if (isExistRoleToUser)
      throw new BadRequestException(`'${roleName}' already exist role to user '${user.user_id}'`);
    const userRole = await this.userRolesRepository.create({ user, role, role_name: roleName });
    return userRole ? true : false;
  }
}
