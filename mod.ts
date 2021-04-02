import { ResultFAIL, ResultFail, ResultOK, ResultOk } from "./deps.ts";

type Response = {
  status: number;
  headers: Headers;
  body?: ArrayBuffer;
};

export const request = async (
  request: RequestInfo,
): Promise<ResultOK<Response> | ResultFAIL<Error>> => {
  try {
    const result = await fetch(request);
    if (!result.ok) return ResultFail(new Error("Request execution error."));
    const { status, headers } = result;
    if (headers.has("content-type")) {
      const body = await result.arrayBuffer();
      return ResultOk({ status, headers, body });
    } else {
      return ResultOk({ status, headers });
    }
  } catch (error) {
    return ResultFail(error);
  }
};
