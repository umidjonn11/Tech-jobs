import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/auth.entity';
import { Course } from './entities/course.entity';
import { StudentsModule } from 'src/students/students.module';
import { StudentCourse } from 'src/students/entities/student.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Course,StudentCourse]),StudentsModule],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports:[CoursesService]
})
export class CoursesModule {}
