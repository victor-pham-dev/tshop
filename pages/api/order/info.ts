import { NextApiRequest, NextApiResponse } from "next";
import { Order } from "@prisma/client";
import { METHOD, ROLE, STATUS_CODE } from "@/const/app-const";
import { ResponseProps } from "@/network/services/api-handler";
import { AuthToken } from "@/middleware/server/auth";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseProps<Order | null>>
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

  const { id } = req.query;
  try {
    const order = await prisma.order.findUnique({
      where: { id: id?.toString() },
    });

    if (
      tokenValid.data.role === ROLE.USER &&
      tokenValid.data.id !== order?.userId
    ) {
      return res.status(STATUS_CODE.AUTH_FAILED).json({
        code: STATUS_CODE.AUTH_FAILED,
        data: null,
        msg: "Vui lòng vào tài khoản đặt hàng để xem",
      });
    }

    return res.status(STATUS_CODE.OK).json({
      code: STATUS_CODE.OK,
      data: order,
      msg: "ok",
    });
  } catch (error) {
    return res
      .status(STATUS_CODE.INTERNAL)
      .json({ code: STATUS_CODE.INTERNAL, data: null, msg: "internal" });
  }
}
