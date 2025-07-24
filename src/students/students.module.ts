import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentCourse } from './entities/student.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CoursesModule } from 'src/courses/courses.module';
import { User } from 'src/auth/entities/auth.entity';

@Module({
  imports:[TypeOrmModule.forFeature([StudentCourse]),AuthModule],
  controllers: [StudentsController],
  providers: [StudentsService],
  exports:[StudentsService]
})
export class StudentsModule {}
