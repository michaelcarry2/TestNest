import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'username',
    example: 'ocha',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    description: 'role',
    example: 'user',
  })
  @IsNotEmpty()
  @IsString()
  roles: string;
}
