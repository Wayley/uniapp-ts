import { Queue } from './Queue';

export type PromiseHandler<T> = ((value: boolean) => T | PromiseLike<T>) | null | undefined;

export class Sequence<T extends PromiseHandler<boolean>> extends Queue<T> {
  private done: boolean;
  constructor() {
    super();
    this.done = true;
  }
  push(promiseHandler: T) {
    this.tasks.push(promiseHandler);
    if (this.done) {
      this.run();
    }
  }
  private run() {
    this.done = false;
    let len = this.tasks.length;
    this.runInSequence(this.tasks, true).then(() => {
      const _len = this.tasks.length;
      this.tasks.splice(0, len);
      if (_len <= len) {
        this.done = true;
      } else {
        this.run();
      }
    });
  }
  private runInSequence(promises: T[], input: boolean) {
    return promises.reduce((promise, promiseHandler: T) => promise.then(promiseHandler), Promise.resolve(input));
  }
}
export default Sequence;
