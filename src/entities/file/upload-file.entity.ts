import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { CoreEntity } from '..';

@Entity('upload_file')
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
  public url!: string;

  @Column({ type: 'int', unsigned: true })
  @IsNotEmpty()
  @IsInt()
  public fileSize!: number;

  @Column({ type: 'varchar', nullable: false, select: false })
  @IsNotEmpty()
  @IsString()
  public mimeType!: string;
}
