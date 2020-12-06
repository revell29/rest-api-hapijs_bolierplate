import Inert from "@hapi/inert";
import jwt from "hapi-auth-jwt2";
import configs from "@utils/config";
const hapiCors = require("hapi-cors");

const options = {};

const plugins = [
  jwt,
  Inert,
  {
    ...require("hapi-cors"),
    options: {
      origins: [configs.ORIGIN],
      headers: [
        "Accept",
        "Authorization",
        "Content-Type",
        "If-None-Match",
        "Accept-language",
        "cache-control",
        "x-requested-with",
      ],
    },
  },
];

export default plugins;
