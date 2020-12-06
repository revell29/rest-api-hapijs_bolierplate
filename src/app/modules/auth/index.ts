"use strict";
import { Request, ResponseToolkit, ResponseObject } from "@hapi/hapi";
import AuthHandler from "@modules/auth/AuthHandler";
import Joi from "@hapi/joi";
import { errorHandler } from "@utils/errorHandler";
const auth = new AuthHandler();

const schemaRegister = Joi.object().keys({
  email: Joi.string().email().required(),
  fullname: Joi.string().required(),
  password: Joi.string().required(),
  no_hp: Joi.number().required(),
});

const schemaLogin = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const register = {
  name: "auth-api",
  version: "1.0.0",
  register: async function (server: any, options: any) {
    server.route([
      {
        path: "/auth/register",
        method: "POST",
        config: {
          handler: auth.register,
          auth: false,
          validate: {
            payload: schemaRegister,
            options: {
              allowUnknown: true,
              abortEarly: false,
            },
            failAction: async (request: Request, h: ResponseToolkit, err: any) => {
              console.log(err);
            },
          },
        },
      },
      {
        path: "/auth/login",
        method: "POST",
        handler: auth.login,
        config: {
          auth: false,
          validate: {
            payload: schemaLogin,
            options: { abortEarly: false },
            failAction: async (request: Request, h: ResponseToolkit, err: any) => {
              return errorHandler(request, h, err);
            },
          },
        },
      },
      {
        path: "/auth/verify",
        method: "post",
        handler: auth.profile,
        config: {
          auth: "jwt",
        },
      },
    ]);
  },
};

export default register;
