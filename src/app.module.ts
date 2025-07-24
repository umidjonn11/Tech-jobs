import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { StudentsModule } from './students/students.module';
import { CoursesModule } from './courses/courses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/entities/auth.entity';
import { Task } from './tasks/entities/task.entity';
import { Course } from './courses/entities/course.entity';
import { StudentCourse } from './students/entities/student.entity';

@Module({
  imports: [AuthModule, TasksModule, StudentsModule, CoursesModule,
    TypeOrmModule.forRoot({
      host: process.env.DB_HOST||'localhost',
      username: process.env.DB_USERNAME||'postgres',
      port: parseInt(process.env.DB_PORT as string)||5432,
      database:  process.env.DB_DATABASE||"courses",
      password: process.env.DB_PASSWORD||'umidjon06',
      type: 'postgres',
      synchronize: true,
      entities: [User,Task,Course,StudentCourse],
      autoLoadEntities: true,

    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
