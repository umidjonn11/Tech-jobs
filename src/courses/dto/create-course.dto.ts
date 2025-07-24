// src/courses/dto/create-course.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';



export class CreateCourseDto {
  @ApiProperty({default:"Welcome to coding"})
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({default:"There you gonna learn basics of learning "})
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({default:"2025-12-24"})
  @IsDateString()
  startDate: string;

  @ApiProperty({default:"2026-02-24"})
  @IsDateString()
  endDate: string;
}

