// src/tasks/dto/create-task.dto.ts
import { IsString, IsNotEmpty, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { TaskStatus } from '../entities/task.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({default:"welcome to coding course"})
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({default:"Really well-known course"})
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({default:"pending"})
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus = TaskStatus.PENDING;

  @ApiProperty({default:"2025-07-24"})
  @IsDateString() 
  dueDate: string;
}
