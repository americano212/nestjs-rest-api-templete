import { User } from '#entities/user.entity';
import { PickType } from '@nestjs/swagger';

export class UpdateUserDto extends PickType(User, ['username'] as const) {}
