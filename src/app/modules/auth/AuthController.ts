import { Request, ResponseToolkit, ResponseObject } from "@hapi/hapi";
import User, { IUser } from "@database/models/User";
import Bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "@utils/jwt/config";

class AuthController {
  /**
   * Register User
   *
   * @param request
   * @param h
   */
  async register(
    request: Request,
    h: ResponseToolkit
  ): Promise<ResponseObject> {
    try {
      const salt = Bcrypt.genSaltSync(10);
      let { username, password }: any = request.payload;
      password = Bcrypt.hashSync(password, salt);

      const user = new User({ username: username, password: password });
      const result = await user.save();
      return h
        .response({ message: "Register berhasil", data: result })
        .code(200);
    } catch (error) {
      return h.response(error).takeover();
    }
  }

  /**
   * Login user
   *
   * @param request
   * @param h
   */
  async login(request: Request, h: ResponseToolkit): Promise<ResponseObject> {
    try {
      const { username, password }: any = request.payload;

      let user: IUser | null = await User.findOne({ username });

      // Check user data
      if (!user) {
        return h
          .response({
            message: "Your account not found. Please register",
          })
          .code(401);
      }

      // check password
      if (!Bcrypt.compareSync(password, user.password)) {
        return h
          .response({
            message: "Incorrect username or password.",
          })
          .code(401);
      }

      // provide jwt token
      const token = jwt.sign(
        { id: user.id, username: user.username },
        config.jwtSecret,
        {
          expiresIn: config.jwtTimer,
        }
      );

      return h.response({ data: user, token: token }).code(200);
    } catch (error) {
      console.log(error);
      return h.response(error).takeover();
    }
  }

  /**
   * Get user profile
   *
   * @param request
   * @param h
   */
  async profile(request: Request, h: ResponseToolkit): Promise<ResponseObject> {
    try {
      const user: IUser | null = await User.findOne({ _id: request.params.id });
      return h.response({ data: user }).code(200);
    } catch (error) {
      console.log(error);
      return h.response(error).takeover();
    }
  }
}

export default new AuthController();
