import { NextApiRequest, NextApiResponse } from "next";
import { Cart } from "@prisma/client";
import { METHOD, STATUS_CODE } from "@/const/app-const";
import { ResponseProps } from "@/network/services/api-handler";
import { AuthToken } from "@/middleware/server/auth";
import { prisma } from "@/lib/prisma";
import { TeleBOT } from "@/services/telegramBOT";

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

  let { classificationId, userId, productId, image, quantity } =
    req.body as Cart;
  try {
    let id: string = "";
    const existedCartItem = await prisma.cart.findFirst({
      where: {
        userId,
        classificationId,
      },
      include: {
        Product: {
          include: {
            classifications: true,
          },
        },
      },
    });

    if (existedCartItem !== null) {
      id = existedCartItem.id;
      let newQuantity = 0;
      const max = existedCartItem.Product?.classifications.find(
        (item) => item.id === classificationId
      )?.quantity;
      if (max !== undefined && max >= existedCartItem.quantity + quantity) {
        newQuantity = existedCartItem.quantity + quantity;
      } else if (
        max !== undefined &&
        max < existedCartItem.quantity + quantity
      ) {
        newQuantity = max;
      }

      await prisma.cart.update({
        where: { id: existedCartItem.id },
        data: {
          quantity: newQuantity,
        },
      });
    } else {
      const createResult = await prisma.cart.create({
        data: {
          classificationId,
          userId,
          image,
          productId,
          quantity,
        },
      });
      id = createResult.id;
    }

    const a = await TeleBOT.sendText(`Thêm giỏ hàng: userId: ${userId}`);
    const b = await TeleBOT.sendPhoto(image);

    console.log("a", a);
    console.log("b", b);

    return res.status(STATUS_CODE.CREATED).json({
      code: STATUS_CODE.CREATED,
      data: id,
      msg: "Thêm thành công",
    });
  } catch (error) {
    return res
      .status(STATUS_CODE.INTERNAL)
      .json({ code: STATUS_CODE.INTERNAL, data: null, msg: "internal" });
  }
}
