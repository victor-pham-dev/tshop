import { NextApiRequest, NextApiResponse } from "next";
import { Order } from "@prisma/client";
import { METHOD, STATUS_CODE } from "@/const/app-const";
import { ResponseProps } from "@/network/services/api-handler";
import { AuthToken } from "@/middleware/server/auth";
import { prisma } from "@/services/prisma";

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
  const tokenValid = AuthToken(req, res, "USER");
  if (!tokenValid.pass) {
    return;
  }

  try {
    const orders = await prisma.order.findMany({
      where: { userId: tokenValid.data.id },
    });

    return res.status(STATUS_CODE.OK).json({
      code: STATUS_CODE.OK,
      data: orders,
      msg: "ok",
    });
  } catch (error) {
    return res
      .status(STATUS_CODE.INTERNAL)
      .json({ code: STATUS_CODE.INTERNAL, data: null, msg: "internal" });
  }
}
