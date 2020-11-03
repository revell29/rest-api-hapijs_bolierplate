import { Request, ResponseToolkit, ResponseObject } from "@hapi/hapi";
import { searchProduct } from "@utils/bukalapak";

class BukalapakController {
  async getProduct(
    request: Request,
    h: ResponseToolkit
  ): Promise<ResponseObject> {
    try {
      const data = await searchProduct(request.payload);
      return h.response({ data: data }).code(200);
    } catch (error) {
      console.log(error);
      return h.response(error).takeover();
    }
  }
}

export default new BukalapakController();
