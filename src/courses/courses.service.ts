import { ConflictException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';
import { StudentsService } from 'src/students/students.service';
import { RegisterCourseDto } from './dto/update-course.dto';
import { StudentCourse } from 'src/students/entities/student.entity';

@Injectable()
export class CoursesService {
  constructor(@InjectRepository(Course) private courseRepo:Repository<Course>, @InjectRepository(StudentCourse)
  private studentCourseRepository: Repository<StudentCourse>,){}
  async create(createCourseDto: CreateCourseDto) {
    const course = this.courseRepo.create(createCourseDto)
    return await this.courseRepo.save(course)
  }

  findAll() {
    return this.courseRepo.find()
  }
  async registerStudent(courseId: string, studentId: string) {
    // 1. Check if registration already exists
    const exists = await this.studentCourseRepository.findOne({
      where: { studentId, courseId }
    });
    
    if (exists) {
      throw new ConflictException('Already registered for this course');
    }
  
    // 2. Create new registration
    const registration = this.studentCourseRepository.create({
      studentId,
      courseId
    });
  
    // 3. Save and return
    return this.studentCourseRepository.save(registration);
  
  }
 
}
