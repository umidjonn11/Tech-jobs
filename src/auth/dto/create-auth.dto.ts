// src/auth/dto/register.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, MaxLength, IsOptional } from 'class-validator';
import { UserRole } from 'security/roles.enum';


export class RegisterDto {
  @ApiProperty({default:"umidjonu@gmail.com"})
  @IsEmail()
  email: string;

  @ApiProperty({default:"qwerty1234"})
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  password: string;

  @ApiProperty({default:"Ali"})
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({default:"user"})
  @IsOptional()
  role?: UserRole  // Default role
}
