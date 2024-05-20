export class Queue<T> {
  private maxSize: number;
  tasks: Array<T>;

  constructor(maxSize?: number) {
    this.maxSize = maxSize ?? Number.MAX_VALUE;
    this.tasks = new Array<T>();
  }

  public enqueue(task: T): number {
    if (this.tasks.length >= this.maxSize) {
      throw new Error('Queue is full');
    }
    return this.tasks.push(task);
  }

  public dequeue(): T {
    if (this.tasks.length === 0) {
      throw new Error('Queue is empty');
    }
    return this.tasks.shift()!;
  }

  public size(): number {
    return this.tasks.length;
  }

  public peek(): T {
    return this.tasks[0];
  }

  public clear(): void {
    this.tasks = new Array<T>();
  }
}

export default Queue;
