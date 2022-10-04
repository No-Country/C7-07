type Status = "OK" | "ERROR";

export interface IMessage<Data = null> {
  message: string;
  status: Status;
  code: number;
  data: Data;
}
