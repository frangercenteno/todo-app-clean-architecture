import {
  CreateTodoDto,
  TodoDataSource,
  TodoEntity,
  TodoRepository,
  UpdateTodoDto,
} from "../../domain";

export class TodoRepositoryImpl extends TodoRepository {
  constructor(private readonly todoDataSource: TodoDataSource) {
    super();
  }
  create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    return this.todoDataSource.create(createTodoDto);
  }
  getAll(): Promise<TodoEntity[]> {
    return this.todoDataSource.getAll();
  }
  findById(id: number): Promise<TodoEntity | null> {
    return this.todoDataSource.findById(id);
  }
  updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity | null> {
    return this.todoDataSource.updateById(updateTodoDto);
  }
  deleteById(id: number): Promise<TodoEntity> {
    return this.todoDataSource.deleteById(id);
  }
}
