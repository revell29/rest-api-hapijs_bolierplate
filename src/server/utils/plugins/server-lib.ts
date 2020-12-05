function addAuth(route: any) {
  if (route.config) {
    route.config.auth = "jwt";
  } else {
    route.config = {
      auth: "jwt",
    };
  }
}

function privateRoute(this: any, options: any) {
  if (Array.isArray(options)) {
    for (const route of options) {
      addAuth(route);
    }
  } else {
    addAuth(options);
  }

  this.route(options);
}

const register = function register(server: any, options: any, next: any) {
  server.decorate("server", "privateRoute", privateRoute);
  return next();
};

register.attributes = {
  name: "private-route",
  version: "1.0.0",
};

export default register;
