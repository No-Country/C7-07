import { Register } from "../components/Auth/Register";

interface Props {
  userType: string;
}

export const RegisterPage = ({ userType }: Props) => {
  return (
    <>
      <Register userType={userType} />
    </>
  );
};
