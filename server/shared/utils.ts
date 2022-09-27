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
