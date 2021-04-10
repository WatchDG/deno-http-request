import { fail, ok } from "./deps.ts";
import type { TResultAsync } from "./deps.ts";

type Response = {
  status: number;
  headers: Headers;
  body?: ArrayBuffer;
};

export const request = async (
  url: string,
  requestInit: RequestInit,
): TResultAsync<Response, Error> => {
  try {
    const result = await fetch(url, requestInit);
    const { status, headers } = result;
    const body = (headers.has("content-type"))
      ? (await result.arrayBuffer())
      : void 0;
    return ok({ status, headers, body });
  } catch (error) {
    return fail(error);
  }
};
