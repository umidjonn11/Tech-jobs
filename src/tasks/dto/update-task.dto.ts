
// src/tasks/dto/update-task.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../entities/task.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
    @ApiProperty({default:"Leave the world behind"})
    @IsString()
    @IsOptional()
    title?: string | undefined;

    @ApiProperty({default:"Our new field"})
    @IsOptional()
    @IsString()
    description?: string | undefined;

    @ApiProperty({default:"in-progress"})
    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus | undefined;


    @ApiProperty({default:"2025-12-24"})
    @IsOptional()
    dueDate?: string | undefined;

} // Inherits all fields as optional