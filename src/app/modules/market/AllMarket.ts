import { Request, ResponseToolkit, ResponseObject } from "@hapi/hapi";
import { searchProduct as bukalapakProduct } from "@utils/bukalapak";
import { searchProduct as tokopediaProduct } from "@utils/tokpedia";
import excel from "exceljs";
import path from "path";

class AllMarketController {
  async getAllProduct(
    request: Request,
    h: ResponseToolkit
  ): Promise<ResponseObject> {
    try {
      let allProduct = [];
      const [tokped, bukalapak] = await Promise.all([
        tokopediaProduct(request.payload),
        bukalapakProduct(request.payload),
      ]);

      const joinData = [...tokped.products, ...bukalapak.products];

      return h.response({ data: joinData }).code(200);
    } catch (error) {
      return h.response(error).takeover();
    }
  }

  async eportToExcel(request: Request, h: ResponseToolkit) {
    try {
      const [tokped, bukalapak] = await Promise.all([
        tokopediaProduct(request.query),
        bukalapakProduct(request.query),
      ]);

      const data = [...tokped.products, ...bukalapak.products];

      let dataScraping: Array<object> = [];
      data.map((items: any) => {
        dataScraping.push({
          productName: items.productName,
          deskripsi: null,
          kategory_code: null,
          berat: 1,
          minOrder: 1,
          kondisi: null,
          gambar: items.imageUrl,
          status: "Aktif",
          stock: 1000,
          price: items.price,
          marketplace: items.marketplace,
        });
      });

      let workbook = new excel.Workbook();
      let worksheet: any = workbook.addWorksheet("DataProduct");

      worksheet.columns = [
        { header: "Nama Produk", key: "productName", width: 70 },
        { header: "Deskripsi Produk", key: "deskripsi", width: 50 },
        { header: "Kategori Kode", key: "kategory_code", width: 25 },
        { header: "Berat", key: "berat", width: 10 },
        { header: "Minimum Pemesanan", key: "minOrder", width: 10 },
        { header: "Kondisi", key: "kondisi", width: 10 },
        { header: "Gambar 1", key: "gambar", width: 70 },
        { header: "Status", key: "status", width: 10 },
        { header: "Jumlah Stock", key: "stock", width: 10 },
        { header: "Harga", key: "price", width: 20 },
        { header: "Market Place", key: "marketplace", width: 20 },
      ];

      worksheet.addRows(dataScraping);
      const bufer = await workbook.xlsx.writeBuffer();

      return h
        .response(bufer)
        .type("text/xlsx")
        .encoding("binary")
        .header("content-Type", "application/vnd.ms-excel")
        .header("access-control-expose-headers", "Content-Disposition")
        .header("content-Disposition", 'attachment; filename="results.csv"');
    } catch (error) {
      console.log(error);
      return h.response(error).takeover();
    }
  }
}

export default new AllMarketController();
