// src/courses/entities/course.entity.ts
import { StudentCourse } from 'src/students/entities/student.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: 'timestamptz' })
  startDate: Date;

  @Column({ type: 'timestamptz' })
  endDate: Date;

  // Many-to-many relationship (via join table)
  @OneToMany(() => StudentCourse, (studentCourse) => studentCourse.courseId)
  studentCourses: StudentCourse[];
}