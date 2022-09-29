export interface IDataBase {
  init(): Promise<void>;
  close(): Promise<void>;
  onError(cb: (error: unknown) => void): void;
  onSucces(cb: () => void): void;
  onClose(cb: () => void): void;
}
