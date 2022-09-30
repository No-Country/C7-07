export default class Util {
  green(msg: string): void {
    console.log("\x1b[32m%s\x1b[0m", msg);
  }
  red(msg: string): void {
    console.log("\x1b[31m%s\x1b[0m", msg);
  }
  blue(msg: string): void {
    console.log("\x1b[36m%s\x1b[0m", msg);
  }
  yellow(msg: string): void {
    console.log("\x1b[33m%s\x1b[0m", msg);
  }
}

export class Email {
  value: string;

  constructor(value: string) {
    this.value = value;
  }
  validate() {
    const regex = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);
    return regex.test(this.value);
  }
}
