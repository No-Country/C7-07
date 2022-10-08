import { hashSync, genSaltSync } from "bcrypt";

const SALT_ROUNDS = 10;

export const encryptPassword = (pswd: string): string => {
  const salt = genSaltSync(SALT_ROUNDS);
  return hashSync(pswd, salt);
};
