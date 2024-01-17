export class UpdateTodoDto {
  private constructor(
    public readonly id: number,
    public readonly text?: string,
    public readonly completedAt?: Date
  ) {}

  get values() {
    const returnObJ: { [key: string]: any } = {};
    if (this.text) {
      returnObJ.text = this.text;
    }
    if (this.completedAt) {
      returnObJ.completedAt = this.completedAt;
    }
    return returnObJ;
  }

  static create(props: { [key: string]: any }): [string?, UpdateTodoDto?] {
    const { completedAt, text, id } = props;
    let newCompletedAt: Date | undefined = undefined;

    if (!id || isNaN(Number(id))) {
      return ["Id is required"];
    }
    if (completedAt) {
      newCompletedAt = new Date(completedAt);

      if (newCompletedAt.toString() === "Invalid Date") {
        return ["CompletedAt must be a valid date"];
      }
    }

    if (!text) {
      return ["Text is required"];
    }

    if (typeof text !== "string") {
      return ["Text must be a string"];
    }
    return [undefined, new UpdateTodoDto(id, text, completedAt)];
  }
}
