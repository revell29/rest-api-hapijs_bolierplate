import { Server, Request, ResponseToolkit } from "@hapi/hapi";
import TokopediaController from "@modules/market/Tokopedia";

export default [
  {
    path: "/marketplace/tokopedia/product/search",
    method: "POST",
    handler: TokopediaController.productSearch,
    config: { auth: "jwt" },
  },
  {
    path: "/marketplace/tokopedia/product/store/search",
    method: "POST",
    handler: TokopediaController.productSearchByStore,
  },
];
