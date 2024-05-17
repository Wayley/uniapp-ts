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
interface ILogger {
  setLevel(level: Level): void;
  addAppender(appender: IAppender): void;
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

  addAppender(appender: IAppender): void {
    if (this.appenders.includes(appender)) {
      return;
    }
    this.appenders.push(appender);
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

export class FileAppender implements IAppender {
  constructor() {}
  execute(...args: any[]): void {
    console.log('FileAppender execute: ', ...args);
  }
}
