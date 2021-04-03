import { ResultFAIL, ResultFail, ResultOK, ResultOk } from "./deps.ts";

type Response = {
  status: number;
  headers: Headers;
  body?: ArrayBuffer;
};

export const request = async (
  url: string,
  requestInit: RequestInit,
): Promise<ResultOK<Response> | ResultFAIL<Error>> => {
  try {
    const result = await fetch(url, requestInit);
    const { status, headers } = result;
    const body = (headers.has("content-type"))
      ? (await result.arrayBuffer())
      : void 0;
    return ResultOk({ status, headers, body });
  } catch (error) {
    return ResultFail(error);
  }
};
