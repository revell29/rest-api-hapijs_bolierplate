"use strict";

import AuthHandler from "@modules/auth/AuthHandler";
import Joi from "@hapi/joi";
const auth = new AuthHandler();

const schemaRegister = Joi.object({
  email: Joi.string().email().required(),
  fullname: Joi.string().required(),
  password: Joi.string().required(),
  no_hp: Joi.number().required(),
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
            failAction: async (request: any, h: any, err: any) => {
              throw err;
            },
          },
        },
      },
      {
        path: "/auth/login",
        method: "POST",
        handler: auth.login,
        config: { auth: false },
      },
      {
        path: "/auth/profile/{id}",
        method: "get",
        handler: auth.profile,
        config: {
          auth: "jwt",
        },
      },
    ]);
  },
};

export default register;
