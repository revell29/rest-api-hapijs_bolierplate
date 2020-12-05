import { Request, ResponseToolkit } from "@hapi/hapi";
import Customer from "@lib/models/Customer";
export const checkJwt = async (decode: any, request: Request) => {
  const customer = await Customer.findOne({ where: { id: decode.id } });

  if (!customer) {
    return { isValid: false };
  } else {
    return { isValid: true, credentials: { customer } };
  }
};
