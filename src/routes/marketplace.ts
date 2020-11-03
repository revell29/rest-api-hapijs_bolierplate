import { Server, Request, ResponseToolkit } from "@hapi/hapi";
import TokopediaController from "@modules/market/Tokopedia";
import BukalapakController from "@modules/market/Bukalapak";
import AllMarketController from "@modules/market/AllMarket";

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
  {
    path: "/marketplace/tokopedia/product/download",
    method: "GET",
    handler: TokopediaController.eportToExcel,
    config: { auth: "jwt" },
  },
  {
    path: "/marketplace/bukalapak/product/search",
    method: "POST",
    handler: BukalapakController.getProduct,
    config: { auth: "jwt" },
  },
  {
    path: "/marketplace/all/product/search",
    method: "POST",
    handler: AllMarketController.getAllProduct,
    config: { auth: "jwt" },
  },
  {
    path: "/marketplace/all/product/export",
    method: "GET",
    handler: AllMarketController.eportToExcel,
    config: { auth: "jwt" },
  },
];
