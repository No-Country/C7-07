import { compareSync } from "bcrypt";

export const decryptPassword = (compare: string, toCompare: string) => {
  return compareSync(compare, toCompare);
};
