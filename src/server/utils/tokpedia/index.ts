import fetch from "isomorphic-unfetch";

const url = `https://gql.tokopedia.com`;

export const searchProduct = async (req: any) => {
  const headers = {
    authority: "gql.tokopedia.com",
    pragma: "no-cache",
    "cache-control": "no-cache",
    "sec-fetch-dest": "empty",
    "user-agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
    dnt: "1",
    accept: "*/*",
    "x-source": "tokopedia-lite",
    "x-tkpd-lite-service": "zeus",
    "content-type": "application/json",
    origin: "https://www.tokopedia.com",
    "sec-fetch-site": "same-site",
    "sec-fetch-mode": "cors",
    referer: "https://www.tokopedia.com/",
    "accept-language": "en-US,en;q=0.9,id;q=0.8",
  };

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: `[{"operationName":"SearchProductQueryV4","variables":{"params":"device=desktop&navsource=home&ob=23&page=${req.page}&pmax=${req.maxPrice}&pmin=${req.minPrice}&q=${req.keyword}&related=true&rows=1000&safe_search=false&scheme=https&shipping=&source=search&st=product&start=0&unique_id=24ffa8daecbd1504dae19def8320d8b6&user_id=&variants="},"query":"query SearchProductQueryV4($params: String!) {\\n  ace_search_product_v4(params: $params) {\\n    header {\\n      totalData\\n      totalDataText\\n      processTime\\n      responseCode\\n      errorMessage\\n      additionalParams\\n      keywordProcess\\n      __typename\\n    }\\n    data {\\n      isQuerySafe\\n      ticker {\\n        text\\n        query\\n        typeId\\n        __typename\\n      }\\n      redirection {\\n        redirectUrl\\n        departmentId\\n        __typename\\n      }\\n      related {\\n        relatedKeyword\\n        otherRelated {\\n          keyword\\n          url\\n          product {\\n            id\\n            name\\n            price\\n            imageUrl\\n            rating\\n            countReview\\n            url\\n            priceStr\\n            wishlist\\n            shop {\\n              city\\n              isOfficial\\n              isPowerBadge\\n              __typename\\n            }\\n            ads {\\n              id\\n              productClickUrl\\n              productWishlistUrl\\n              shopClickUrl\\n              productViewUrl\\n              __typename\\n            }\\n            __typename\\n          }\\n          __typename\\n        }\\n        __typename\\n      }\\n      suggestion {\\n        currentKeyword\\n        suggestion\\n        suggestionCount\\n        instead\\n        insteadCount\\n        query\\n        text\\n        __typename\\n      }\\n      products {\\n        id\\n        name\\n        ads {\\n          id\\n          productClickUrl\\n          productWishlistUrl\\n          productViewUrl\\n          __typename\\n        }\\n        badges {\\n          title\\n          imageUrl\\n          show\\n          __typename\\n        }\\n        category: departmentId\\n        categoryBreadcrumb\\n        categoryId\\n        categoryName\\n        countReview\\n        discountPercentage\\n        gaKey\\n        imageUrl\\n        labelGroups {\\n          position\\n          title\\n          type\\n          __typename\\n        }\\n        originalPrice\\n        price\\n        priceRange\\n        rating\\n        shop {\\n          id\\n          name\\n          url\\n          city\\n          isOfficial\\n          isPowerBadge\\n          __typename\\n        }\\n        url\\n        wishlist\\n        sourceEngine: source_engine\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n"}]`,
  });
  const data = await response.json();

  let finalData: Array<object> = [];
  data.map((item: any) => {
    item.data.ace_search_product_v4.data.products.map((product: any) => {
      finalData.push({
        id: product.id,
        productName: product.name,
        categoryName: product.categoryName,
        imageUrl: product.imageUrl,
        price: product.price,
        originalPrice: product.originalPrice,
        ratting: product.ratting,
        shop: product.shop.name,
        url: product.url,
        badges: product.badges,
        marketplace: "tokopedia",
      });
    });
  });

  return {
    query: {
      page: req.page,
      keywords: req.keyword,
      totalData: data
        ? data[0].data.ace_search_product_v4.header.totalData
        : null,
    },
    products: finalData,
  };
};

export const searchGroupByStore = async (request: any) => {
  const headers = {
    authority: "gql.tokopedia.com",
    pragma: "no-cache",
    "cache-control": "no-cache",
    accept: "*/*",
    "x-source": "tokopedia-lite",
    "user-agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36",
    "x-tkpd-lite-service": "zeus",
    "content-type": "application/json",
    origin: "https://www.tokopedia.com",
    "sec-fetch-site": "same-site",
    "sec-fetch-mode": "cors",
    "sec-fetch-dest": "empty",
    referer: "https://www.tokopedia.com/",
    "accept-language": "en-US,en;q=0.9,id;q=0.8",
  };

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: `[{"operationName":"AceSearchShop","variables":{"params":"q=${request.payload.keyword}&rows=30&start=0&user_id=0"},"query":"query AceSearchShop($params: String!) {\\n  aceSearchShop(params: $params) {\\n    totalData: total_shop\\n    shops {\\n      id: shop_id\\n      name: shop_name\\n      domain: shop_domain\\n      ownerId: shop_is_owner\\n      city: shop_location\\n      shopStatus: shop_status\\n      tagLine: shop_tag_line\\n      desc: shop_description\\n      reputationScore: reputation_score\\n      totalFave: shop_total_favorite\\n      isPowerBadge: shop_gold_shop\\n      isOfficial: is_official\\n      url: shop_url\\n      imageURL: shop_image\\n      reputationImageURL: reputation_image_uri\\n      shopLucky: shop_lucky\\n      products {\\n        id\\n        name\\n        url\\n        price\\n        productImg: image_url\\n        priceText: price_format\\n        __typename\\n      }\\n      GAKey: ga_key\\n      favorited\\n      voucher {\\n        freeShipping: free_shipping\\n        cashback {\\n          cashbackValue: cashback_value\\n          isPercentage: is_percentage\\n          __typename\\n        }\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n"}]`,
  });
  const data = await response.json();

  let result: Array<object> = [];
  data.map((e: any) => {
    e.data.aceSearchShop.shops.map((item: any) => {
      result.push({
        id: item.id,
        storeName: item.name,
        domain: item.domain,
        city: item.city,
        tagLine: item.tagLine,
        description: item.desc,
        reputation: item.reputationScore,
        isOfficial: item.isOfficial,
        urlShop: item.url,
        products: item.products,
      });
    });
  });

  return {
    query: {
      keywords: request.payload.keyword,
      totalData: data ? data[0].data.aceSearchShop.totalData : null,
    },
    shops: result,
  };
};
