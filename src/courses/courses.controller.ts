import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { RolesGuard } from 'security/roles-guard';
import { AuthGuard } from 'security/auth-guard';
import { UserRole } from 'security/roles.enum';
import { Roles } from 'security/roles.decorator';
import { RegisterCourseDto } from './dto/update-course.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}
  @ApiOperation({ summary: 'Create a new course / admin only' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.admin)
  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }
  @ApiOperation({ summary: 'Get all courses' })
  @Get()
  findAll() {
    return this.coursesService.findAll();
  }
  @ApiOperation({ summary: 'Registration for courses / only for students' })
  @ApiBearerAuth()
  @Post(':courseId/register')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.student)
  async registerForCourse(
    @Body() registerCourseDto: RegisterCourseDto,
  ) {
    return this.coursesService.registerStudent(
      registerCourseDto.studentId,
      registerCourseDto.courseId,
    );
  }
  
}
