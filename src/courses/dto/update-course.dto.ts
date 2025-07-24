// src/courses/dto/register-course.dto.ts
import { ApiBearerAuth, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class RegisterCourseDto {
  @ApiProperty({default:"9cc8e58f-7c81-44df-935e-cb66d2fa5279"})
  @IsNotEmpty()
  @IsUUID()
  studentId: string;

  @ApiProperty({default:"2a08f7a9-7f62-403a-814d-399335343e3c"})
  @IsNotEmpty()
  @IsUUID()
  courseId: string;
}