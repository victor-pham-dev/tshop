import { NextApiRequest, NextApiResponse } from "next";
import { Cart, PrismaClient } from "@prisma/client";
import { METHOD, STATUS_CODE } from "@/const/app-const";
import { ResponseProps } from "@/network/services/api-handler";
import { AuthToken } from "@/middleware/server/auth";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseProps<Cart[] | null>>
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
    return null;
  }

  try {
    const carts = await prisma.cart.findMany({
      where: { userId: tokenValid.data.id },
      include: {
        Product: {
          include: {
            classifications: true,
          },
        },
      },
    });

    const filterCartsNotYetOrder = carts.filter(
      (item) => item.orderId === null
    );

    return res.status(STATUS_CODE.OK).json({
      code: STATUS_CODE.OK,
      data: filterCartsNotYetOrder,
      msg: "ok",
    });
  } catch (error) {
    return res
      .status(STATUS_CODE.INTERNAL)
      .json({ code: STATUS_CODE.INTERNAL, data: null, msg: "internal" });
  }
}
