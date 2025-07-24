import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentCourse } from './entities/student.entity';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';
import { UserRole } from 'security/roles.enum';
import { StudentCoursesDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(StudentCourse)
    private studentRepo: Repository<StudentCourse>,
    
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService
  ) {}

  async create(createStudentDto: StudentCoursesDto) {
    const user = await this.authService.findOne(createStudentDto.usertId);

    if (!user) {
      throw new NotFoundException('Invalid id');
    }

    if (user.role !== UserRole.student) {
      user.role = UserRole.student;
      return this.authService.updateUser(user.id, user); // Assumes updateUser accepts (id, updatedEntity)
    }

    return user;
  }


  
  findAll() {
    return `This action returns all students`;
  }

  update(id: number, updateStudentDto: any) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
