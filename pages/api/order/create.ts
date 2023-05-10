import { NextApiRequest, NextApiResponse } from "next";
import { Cart, Order } from "@prisma/client";
import { METHOD, STATUS_CODE } from "@/const/app-const";
import { ResponseProps } from "@/network/services/api-handler";
import { AuthToken } from "@/middleware/server/auth";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseProps<string | null>>
) {
  if (req.method !== METHOD.POST) {
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

  const payload = req.body as Order;
  try {
    const result = await prisma.order.create({
      data: payload,
    });

    if (result) {
      const listCartItems = JSON.parse(result.items) as Cart[];
      const cartIds = listCartItems.map((item) => item.id);
      await prisma.cart.deleteMany({
        where: { id: { in: cartIds } },
      });
      return res.status(STATUS_CODE.CREATED).json({
        code: STATUS_CODE.CREATED,
        data: result.id,
        msg: "Tạo đơn thành công",
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(STATUS_CODE.INTERNAL)
      .json({ code: STATUS_CODE.INTERNAL, data: null, msg: "internal" });
  }
}
