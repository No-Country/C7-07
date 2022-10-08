import { useEffect, useCallback, useState } from "react";

let abortController: AbortController;

type RequestStatus = "idle" | "loading" | "error" | "success";

interface Params {
  url: string;
  inmediate?: boolean;
  options?: RequestInit;
}

export function useFetch<DataType>({
  url,
  options = {},
  inmediate = false,
}: Params) {
  const [response, setResponse] = useState<DataType | undefined>(undefined);
  const [requestStatus, setRequestStatus] = useState<RequestStatus>("idle");

  const call = useCallback(async () => {
    try {
      setRequestStatus("loading");
      const fetched = await fetch(url, {
        ...options,
        signal: abortController?.signal,
      });
      const parsed = await fetched.json();
      setResponse((prev) => {
        setRequestStatus("success");
        return !prev ? parsed : { ...prev, ...parsed };
      });
    } catch (e) {
      (e as Error).name !== "AbortError" && setRequestStatus("error");
    }
  }, [url, options]);

  useEffect(() => {
    if (!inmediate) return;
    abortController = new AbortController();
    call();
    return () => abortController.abort();
  }, [inmediate]);

  return {
    call,
    response,
    requestStatus,
    abort: () => {
      abortController.abort();
      setRequestStatus("idle");
    },
  };
}
