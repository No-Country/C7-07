import { connect } from "mongoose";
import Print from "../utils";

const print = new Print();

export class Mongo {
  async exec(): Promise<void> {
    try {
      await connect(
        "mongodb+srv://travis:$travis@cluster0.l5ovygm.mongodb.net/?retryWrites=true&w=majority"
      ).then(() => print.green("CONNECTED"));
    } catch (err) {
      print.red(
        `\rError:\n${print.repeat(
          "-",
          10
        )}Methdo: exec()\n Context: config/Mongo.ts\n${print.repeat("-", 10)}\n`
      );
    }
  }
}
