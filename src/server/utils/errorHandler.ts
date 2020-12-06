import { Request, ResponseToolkit, ResponseObject } from "@hapi/hapi";

export const errorHandler = function (request: Request, h: ResponseToolkit, err: any) {
  if (err.isJoi && Array.isArray(err.details) && err.details.length > 0) {
    const invalidItem = err.details[0];
    if (invalidItem) {
      return h.response({ detail: err.details, code: err.output.statusCode }).code(400).takeover();
    }
  }

  return h.response(err).takeover();
};
