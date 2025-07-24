import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentCoursesDto } from './dto/update-student.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('students/register')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}
  @ApiOperation({ summary: 'Register as a student' })
  @Post()
  create(@Body() createStudentDto: StudentCoursesDto) {
    return this.studentsService.create(createStudentDto);
  }

}
