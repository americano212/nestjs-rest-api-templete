import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsInt, IsNotEmpty, IsString, Length } from 'class-validator';
import { UserRole } from './user-role.entity';

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  @IsInt()
  public roleId!: number;

  @ApiProperty({ example: 'Test' })
  @Column({ type: 'varchar', nullable: false, unique: true })
  @IsNotEmpty()
  @Length(4, 12)
  @IsString()
  public roleName!: string;

  @OneToMany(() => UserRole, (userRole) => userRole.role)
  users?: UserRole[];
}
