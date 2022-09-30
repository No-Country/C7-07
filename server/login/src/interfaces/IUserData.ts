import { Email } from "../../../shared/utils";

type UserType = "traveler" | "business";

type PhoneType = "Landline" | "Mobile";

type Phone = {
  value: `+${number}`;
  type: PhoneType;
};

type MetaData = {
  country: string;
  locality: string;
  phone: Phone;
};

export interface IUserData {
  fullName: string;
  password: string;
  alias: string;
  email: string;
  type: UserType;
  metaData: MetaData;
}
