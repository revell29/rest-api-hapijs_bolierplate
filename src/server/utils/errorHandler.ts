import { Request, ResponseToolkit, ResponseObject } from "@hapi/hapi";

export const errorHandler = function (
  request: Request,
  h: ResponseToolkit,
  err: any
) {
  if (err.isJoi && Array.isArray(err.details) && err.details.length > 0) {
    const invalidItem = err.details[0];
    return h
      .response(
        `Data Validation Error. Schema violation. <${
          invalidItem.path
        }> \nDetails: ${JSON.stringify(err.details)}`
      )
      .code(400)
      .takeover();
  }

  return h.response(err).takeover();
};
