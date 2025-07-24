import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class StudentCourse {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  studentId: string;

  @Column()
  courseId: string;

  @CreateDateColumn()
  registeredAt: Date;
}