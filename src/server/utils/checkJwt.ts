import { Request, ResponseToolkit } from "@hapi/hapi";
import User, { IUser } from "@database/models/User";

export const checkJwt = async (decode: any, request: Request) => {
  const user: IUser | null = await User.findOne({ _id: decode.id });

  if (!user) {
    return { isValid: false };
  } else {
    return { isValid: true, credentials: { user } };
  }
};
