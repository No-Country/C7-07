type Status = "OK" | "ERROR";

export interface IMessage<Data> {
  message: string;
  status: Status;
  code: number;
  data: Data | null;
}
