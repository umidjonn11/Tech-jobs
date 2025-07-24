import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const task = this.taskRepo.create(createTaskDto);
    return await this.taskRepo.save(task); // ❗ You must save `task`, not `createTaskDto`
  }

  findAll() {
    return this.taskRepo.find();
  }

  async findOne(id: string) {
    const task = await this.taskRepo.findOne({ where: { id } });
    if (!task) throw new NotFoundException('Task not found!');
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskRepo.findOne({ where: { id } });
    if (!task) throw new NotFoundException('Task not found!');

    const updated = this.taskRepo.merge(task, updateTaskDto);
    return await this.taskRepo.save(updated); // ✅ Save the merged entity
  }

  async remove(id: string) {
    const task = await this.taskRepo.findOne({ where: { id } });
    if (!task) throw new NotFoundException('Task not found!');
    return await this.taskRepo.remove(task); // ❗ Add `await` to ensure it's actually removed
  }
}
