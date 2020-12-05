import Inert from "@hapi/inert";
import jwt from "hapi-auth-jwt2";

const plugins = [jwt, Inert];

export default plugins;
