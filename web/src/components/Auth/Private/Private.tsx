import React, { useEffect, useMemo, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { IMessage } from "../../../interfaces/IMessage";
import { IUser } from "../../../interfaces/IUser";

interface PrivateProps {
  children: React.ReactElement;
}

const URL = import.meta.env.VITE_SERVER_URI;
const getUser = async (token: string): Promise<IMessage<IUser[]> | null> => {
  const fetched = await fetch(`${URL}/users/me`, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
  const parsed = await fetched.json();
  return parsed;
};
export const Private = React.memo(function PrivateMemo({
  children,
}: PrivateProps) {
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [response, setResponse] = useState<IMessage<IUser[]> | null>(null);
  const token = useMemo(() => window.localStorage.getItem("token") || "", []);
  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    getUser(token)
      .then((res) => {
        setIsLoading(false);
        setResponse(res);
      })
      .catch((err) => {
        setIsLoading(false);
        setResponse(err);
      });
  }, [token, pathname]);

  if (isLoading) return <></>;
  if (!token) return <Navigate to={"/login"} />;
  if (!response?.data?.[0]?.id) <Navigate to={"/login"} />;
  return children;
});
