import { NextApiRequest, NextApiResponse } from "next";
import { METHOD, STATUS_CODE } from "@/const/app-const";
import { ResponseProps } from "@/network/services/api-handler";
import { AuthToken } from "@/middleware/server/auth";
import { prisma } from "@/lib/prisma";
import { Classification, Product, WarehouseImport } from "@prisma/client";
import { ProductWithClassifyProps } from "@/contexts/CartContext";

export interface WarehouseBillProps extends WarehouseImport {
  Classification: Classification | null;
  Product: Product | null;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseProps<ProductWithClassifyProps[] | null>>
) {
  if (req.method !== METHOD.GET) {
    return res.status(STATUS_CODE.INVALID_METHOD).json({
      code: STATUS_CODE.INVALID_METHOD,
      data: null,
      msg: "Invalid method",
    });
  }
  const tokenValid = AuthToken(req, res, "ADMIN");
  if (!tokenValid.pass) {
    return;
  }
  try {
    const result = await prisma.product.findMany({
      include: {
        classifications: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return res.status(STATUS_CODE.OK).json({
      code: STATUS_CODE.OK,
      data: result,
      msg: "ok",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(STATUS_CODE.INTERNAL)
      .json({ code: STATUS_CODE.INTERNAL, data: null, msg: "internal" });
  }
}
