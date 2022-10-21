import jwt_decode from "jwt-decode";

const decodeToken = (token: string) => {
  return jwt_decode(token);
};

export default decodeToken;
