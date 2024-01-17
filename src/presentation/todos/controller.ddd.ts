import { Request, Response } from "express";
import prisma from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoRepository } from "../../domain";

export class TodosController {
  constructor(private readonly todoRepository: TodoRepository) {}

  public getTodos = async (req: Request, res: Response) => {
    const todos = await this.todoRepository.getAll();

    return res.json(todos);
  };

  public getTodoById = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (isNaN(Number(id))) {
      return res.status(400).json({
        message: "Id is required",
      });
    }

    try {
      const todo = await this.todoRepository.findById(Number(id));

      res.json(todo);
    } catch (error) {
      res.status(404).json({
        error,
      });
    }
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if (error) {
      return res.status(400).json({
        message: error,
      });
    }

    const todo = await this.todoRepository.create(createTodoDto!);

    res.json(todo);
  };
  public updateTodo = async (req: Request, res: Response) => {
    const id = req.params.id;
    const [error, updateTodoDto] = UpdateTodoDto.create({
      ...req.body,
      id,
    });

    if (error) {
      return res.status(400).json({
        message: error,
      });
    }

    const todoUpdated = this.todoRepository.updateById(updateTodoDto!);

    res.json({ message: "update todo", todoUpdated });
  };
  public deleteTodo = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (isNaN(Number(id))) {
      return res.status(400).json({
        message: "Id is required",
      });
    }

    const todoDeleted = await this.todoRepository.deleteById(Number(id));

    res.json({ message: "delete todo", todoDeleted });
  };
}
