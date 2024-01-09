import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { CoreEntity } from '..';

export class UploadFile extends CoreEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  @IsInt()
  public uploadFileId!: number;

  @Column({ type: 'varchar', nullable: false })
  @IsNotEmpty()
  @IsString()
  public originalName!: string;

  @Column({ type: 'varchar', nullable: false })
  @IsNotEmpty()
  @IsString()
  public encoding!: string;

  @Column({ type: 'varchar', nullable: false })
  @IsNotEmpty()
  @IsString()
  public mimeType!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @IsNotEmpty()
  @IsInt()
  public size!: number;

  @Column({ type: 'varchar', nullable: false })
  @IsNotEmpty()
  @IsString()
  public url!: string;
}