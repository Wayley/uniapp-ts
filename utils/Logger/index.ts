import Sequence, { type PromiseHandler } from 'wing-sequence';

export enum Level {
  Off,
  Fatal,
  Error,
  Warn,
  Info,
  Debug,
  Trace,
  All,
}
export interface ILogger {
  setLevel(level: Level): void;
  addAppenders(appender: IAppender[]): void;
}

export class Logger implements ILogger {
  private subject: string | number;
  private level: Level;
  private appenders: IAppender[];

  constructor(subject?: string | number, level?: Level) {
    this.subject = subject ?? new Date().valueOf();
    this.level = level ?? Level.Info;
    this.appenders = [];
  }

  setLevel(level: Level): void {
    this.level = level;
  }

  addAppenders(appenders: IAppender[]): void {
    appenders.forEach((appender) => {
      if (this.appenders.includes(appender)) {
        return;
      }
      this.appenders.push(appender);
    });
  }

  log(...args: any[]) {
    this.execute(...args);
  }

  private execute(...args: any[]): void {
    this.appenders.forEach((appender) => {
      appender.execute(...args);
    });
  }
}
export interface IAppender {
  execute(...args: any[]): void;
}
export class ConsoleAppender implements IAppender {
  constructor() {}

  execute(...args: any[]): void {
    console.log('ConsoleAppender execute: ', ...args);
  }
}

export class FileAppender extends Sequence<PromiseHandler<boolean>> implements IAppender {
  constructor() {
    super();
  }

  execute(...args: any[]) {
    const v = args.join(',');
    this.push((f: boolean) => new Promise(async (r) => r(f && (await write(v)))));
  }
}
function write(value: string): Promise<boolean> {
  return new Promise((r) => {
    setTimeout(() => {
      console.log('write:', value);
      r(true);
    }, Math.random() * 100);
  });
}
