export class TodoEntity {
  constructor(
    public readonly id: number,
    public readonly text: string,
    public readonly completedAt: Date | null
  ) {}

  get isCompleted() {
    return !!this.completedAt;
  }

  public static fromObject(obj: { [key: string]: any }) {
    const { id, text, completedAt } = obj;
    if (!id) throw new Error("id is required");
    if (!text) throw new Error("text is required");

    let newCompletedAt: Date | null = null;
    if (completedAt) {
      newCompletedAt = new Date(completedAt);
      if (isNaN(newCompletedAt.getTime())) {
        throw new Error("completedAt is invalid");
      }
    }

    return new TodoEntity(id, text, newCompletedAt);
  }
}
