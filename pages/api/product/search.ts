import { NextApiRequest, NextApiResponse } from "next";
import { Product } from "@prisma/client";
import { METHOD, STATUS_CODE } from "@/const/app-const";
import {
  PagingResponseProps,
  ResponseProps,
} from "@/network/services/api-handler";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseProps<PagingResponseProps<Product> | null>>
) {
  if (req.method !== METHOD.GET) {
    return res.status(STATUS_CODE.INVALID_METHOD).json({
      code: STATUS_CODE.INVALID_METHOD,
      data: null,
      msg: "Invalid method",
    });
  }
  const { name, page = 1, pageSize = 10 } = req.query;
  const lowercaseName = name ? name.toString().toLowerCase() : "";

  try {
    const products: Product[] = await prisma.product.findMany({
      include: {
        classifications: true,
      },
    });

    const filteredProducts = products.filter((product) => {
      const lowercaseProductName = product.name.toLowerCase();
      return lowercaseProductName.includes(lowercaseName);
    });

    const startIndex = (Number(page) - 1) * Number(pageSize);
    const endIndex = Number(page) * Number(pageSize);
    const result = filteredProducts.slice(startIndex, endIndex);

    return res.status(STATUS_CODE.OK).json({
      code: STATUS_CODE.OK,
      data: {
        dataTable: result,
        paging: {
          page: Number(page),
          pageSize: Number(pageSize),
        },
        totalCount: filteredProducts.length,
      },
      msg: "OK",
    });
  } catch (error) {
    // console.log(error);
    return res.status(STATUS_CODE.INTERNAL).json({
      code: STATUS_CODE.INTERNAL,
      data: null,
      msg: "Internal server error",
    });
  }
}
