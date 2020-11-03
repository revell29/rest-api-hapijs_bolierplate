import fetch from "isomorphic-unfetch";
import qs from "qs";

const url = `https://api.bukalapak.com/multistrategy-products`;

export const getToken = async () => {
  const response = await fetch(
    `https://www.bukalapak.com/westeros_auth_proxies`,
    {
      method: "POST",
      body: `{"application_id":1,"authenticity_token":""}`,
    }
  );

  const data = response.json();
  return data;
};

const headers = {
  authority: "api.bukalapak.com",
  pragma: "no-cache",
  "cache-control": "no-cache",
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36",
  accept: "*/*",
  origin: "https://www.bukalapak.com",
  "sec-fetch-site": "same-site",
  "sec-fetch-mode": "cors",
  "sec-fetch-dest": "empty",
  referer: "https://www.bukalapak.com/",
  "accept-language": "en-US,en;q=0.9",
};

export const searchProduct = async (request: any) => {
  const token = await getToken();
  const response = await fetch(
    `${url}?${qs.stringify({
      prambanan_override: true,
      keywords: request.keyword,
      limit: 50,
      offset: 0,
      page: request.page,
      facet: true,
      access_token: token.access_token,
    })}`,
    { headers }
  );
  const data = await response.json();

  let finalData: Array<object> = [];
  data.data.map((item: any) => {
    finalData.push({
      id: item.sku_id,
      productName: item.name,
      categoryName: item.category.name,
      imageUrl: item.images.large_urls[0],
      price: item.price,
      ratting: item.rating.average_rate,
      shop: item.store.name,
      url: item.url,
      badges: null,
      marketplace: "bukalapak",
    });
  });

  return {
    query: {
      page: request.page,
      keywords: request.keyword,
      totalData: finalData.length,
    },
    products: finalData,
  };
};
