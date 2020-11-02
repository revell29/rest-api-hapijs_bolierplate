import { Request, ResponseToolkit, ResponseObject } from "@hapi/hapi";
import { searchProduct, searchGroupByStore } from "@utils/tokpedia";

class TokopediaController {
  async productSearch(
    request: Request,
    h: ResponseToolkit
  ): Promise<ResponseObject> {
    try {
      const data = await searchProduct(request);
      return h.response({ data: data }).code(200);
    } catch (error) {
      return h.response(error).takeover();
    }
  }

  async productSearchByStore(
    request: Request,
    h: ResponseToolkit
  ): Promise<ResponseObject> {
    try {
      const data = await searchGroupByStore(request);
      return h.response({ data: data }).code(200);
    } catch (error) {
      console.log(error);
      return h.response(error).takeover();
    }
  }
}

export default new TokopediaController();
