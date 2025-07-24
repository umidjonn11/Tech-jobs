
// src/auth/dto/login.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
    @ApiProperty({default:"umidjonu@gmail.com"})
    @IsNotEmpty()
    @IsEmail()
    email: string;

  @ApiProperty({default:"qwerty1234"})
  @IsNotEmpty()
  @IsString()
  password: string;

}