import AuthController from "@modules/auth/AuthController";

export default [
  {
    path: "/auth/register",
    method: "POST",
    handler: AuthController.register,
    config: { auth: false },
  },
  {
    path: "/auth/login",
    method: "POST",
    handler: AuthController.login,
    config: { auth: false },
  },
  {
    path: "/auth/profile/{id}",
    method: "get",
    handler: AuthController.profile,
    config: {
      auth: "jwt",
    },
  },
];
