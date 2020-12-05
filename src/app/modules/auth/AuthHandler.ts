import { Request, ResponseToolkit, ResponseObject } from "@hapi/hapi";
import Bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "@utils/jwt/config";
import Customer from "@lib/models/Customer";

class AuthHandler {
  /**
   * Register User
   *
   * @param request
   * @param h
   */
  async register(request: Request, h: ResponseToolkit): Promise<ResponseObject> {
    try {
      const salt = Bcrypt.genSaltSync(10);
      let { fullname, password, email, no_hp }: any = request.payload;
      password = Bcrypt.hashSync(password, salt);

      const user = await Customer.create({
        fullname: fullname,
        email: email,
        password: password,
        no_hp: no_hp,
      });

      return h.response({ message: "Register berhasil", data: user }).code(200);
    } catch (error) {
      return h.response({ ...error });
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
      const { email, password }: any = request.payload;

      let dataCustomer = await Customer.findOne({ where: { email: email } });

      // Check user data
      if (!dataCustomer) {
        return h
          .response({
            message: "Your account not found. Please register",
          })
          .code(401);
      }

      // check password
      if (!Bcrypt.compareSync(password, dataCustomer.password)) {
        return h
          .response({
            message: "Incorrect username or password.",
          })
          .code(401);
      }

      // provide jwt token
      const token = jwt.sign(
        { id: dataCustomer.id, username: dataCustomer.fullname },
        config.jwtSecret,
        {
          expiresIn: config.jwtTimer,
        }
      );

      return h.response({ data: dataCustomer, token: token }).code(200);
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
      const dataCustomer = await Customer.findOne({ where: { id: request.params.id } });
      return h.response({ data: dataCustomer }).code(200);
    } catch (error) {
      console.log(error);
      return h.response(error).takeover();
    }
  }
}

export default AuthHandler;
