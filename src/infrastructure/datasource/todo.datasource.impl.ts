import prisma from "../../data/postgres";
import {
  CreateTodoDto,
  TodoDataSource,
  TodoEntity,
  UpdateTodoDto,
} from "../../domain";

export class TodoDataSourceImpl extends TodoDataSource {
  async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    const todo = await prisma.todo.create({
      data: {
        text: createTodoDto.text,
      },
    });
    return TodoEntity.fromObject(todo);
  }
  async getAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany();
    return todos.map((todo) => {
      return TodoEntity.fromObject(todo);
    });
  }
  async findById(id: number): Promise<TodoEntity | null> {
    const todo = await prisma.todo.findFirst({
      where: {
        id,
      },
    });
    if (!todo) throw new Error("Todo not found");
    return TodoEntity.fromObject(todo);
  }
  async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity | null> {
    const todo = await this.findById(updateTodoDto.id);
    if (!todo) throw new Error("Todo not found");
    const updatedTodo = await prisma.todo.update({
      where: {
        id: updateTodoDto.id,
      },
      data: {
        text: updateTodoDto.text,
        completedAt: updateTodoDto.completedAt,
      },
    });
    return TodoEntity.fromObject(updatedTodo);
  }
  async deleteById(id: number): Promise<TodoEntity> {
    const todo = await this.findById(id);
    if (!todo) throw new Error("Todo not found");
    const deletedTodo = await prisma.todo.delete({
      where: {
        id,
      },
    });
    return TodoEntity.fromObject(deletedTodo);
  }
}
