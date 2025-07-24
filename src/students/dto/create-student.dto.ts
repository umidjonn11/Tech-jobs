// src/students/dto/register-student.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength } from 'class-validator';

export class RegisterStudentDto {
  @ApiProperty({default:"Ali"})
  @IsString()
  name: string;

  @ApiProperty({default:"umidjonu@gmail.com"})
  @IsEmail()
  email: string;

  @ApiProperty({default:"qwerty1234"})
  @IsString()
  @MinLength(8)
  password: string;
}

