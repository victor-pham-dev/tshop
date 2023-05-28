import { NextApiRequest, NextApiResponse } from "next";
import { METHOD, ORDER_STATUS, STATUS_CODE } from "@/const/app-const";
import { ResponseProps } from "@/network/services/api-handler";
import { AuthToken } from "@/middleware/server/auth";
import { prisma } from "@/services/prisma";
import {
  Classification,
  Order,
  Product,
  WarehouseImport,
} from "@prisma/client";

export interface WarehouseBillProps extends WarehouseImport {
  Classification: Classification | null;
  Product: Product | null;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseProps<Order[] | null>>
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
    const result = await prisma.order.findMany({
      where: { status: ORDER_STATUS.DONE },
      orderBy: { createdAt: "desc" },
    });

    return res.status(STATUS_CODE.OK).json({
      code: STATUS_CODE.OK,
      data: result,
      msg: "ok",
    });
  } catch (error) {
    return res
      .status(STATUS_CODE.INTERNAL)
      .json({ code: STATUS_CODE.INTERNAL, data: null, msg: "internal" });
  }
}
