import { NextApiRequest, NextApiResponse } from "next";
import { Cart, PrismaClient } from "@prisma/client";
import { METHOD, STATUS_CODE } from "@/const/app-const";
import { ResponseProps } from "@/network/services/api-handler";
import { AuthToken } from "@/middleware/server/auth";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseProps<null>>
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
    return null;
  }

  let { classificationId, userId, productId, image } = req.body as Cart;
  try {
    const existedCartItem = await prisma.cart.findFirst({
      where: {
        userId,
        classificationId,
      },
    });

    if (existedCartItem !== null) {
      await prisma.cart.update({
        where: { id: existedCartItem.id },
        data: {
          quantity: { increment: 1 },
        },
      });
    } else {
      await prisma.cart.create({
        data: {
          classificationId,
          userId,
          image,
          productId,
        },
      });
    }

    return res.status(STATUS_CODE.CREATED).json({
      code: STATUS_CODE.CREATED,
      data: null,
      msg: "Thêm thành công",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(STATUS_CODE.INTERNAL)
      .json({ code: STATUS_CODE.INTERNAL, data: null, msg: "internal" });
  }
}
