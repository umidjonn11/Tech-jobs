// src/students/dto/student-courses.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class StudentCoursesDto {
  @ApiProperty({default:"2025-07-24 12:35:11.545529"})
  @IsUUID()
  usertId: string;
}