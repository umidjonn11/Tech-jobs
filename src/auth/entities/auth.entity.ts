// src/users/entities/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert } from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';
import { UserRole } from 'security/roles.enum';
import { StudentCourse } from 'src/students/entities/student.entity';
import { hash } from 'bcrypt';


@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string; // Will be hashed using bcrypt

  @Column({ type: 'enum', enum: UserRole,  })
  role: UserRole; // Supports multiple roles (e.g., ['user', 'student'])

  @Column({ nullable: true })
  name?: string; // Optional for general users, required for students

  // Relations
  @OneToMany(() => Task, (task) => task.createdBy)
  tasks: Task[];

  @OneToMany(() => StudentCourse, (studentCourse) => studentCourse.studentId)
  studentCourses: StudentCourse[];


  
  @BeforeInsert()
  async hash(){
    this.password=await hash(this.password,12)  
  }
}