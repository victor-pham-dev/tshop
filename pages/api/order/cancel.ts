import { NextApiRequest, NextApiResponse } from "next";
import { METHOD, ORDER_STATUS, STATUS_CODE } from "@/const/app-const";
import { ResponseProps } from "@/network/services/api-handler";
import { AuthToken } from "@/middleware/server/auth";
import { prisma } from "@/lib/prisma";
import { CartDataProps } from "@/contexts/CartContext";

export interface MarkCancelOrderProps {
  id: string;
  cancelReason: string;
}

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
  const tokenValid = AuthToken(req, res, "ADMIN");
  if (!tokenValid.pass) {
    return;
  }

  const { id, cancelReason } = req.body as MarkCancelOrderProps;
  try {
    const order = await prisma.order.findUnique({
      where: { id },
    });
    if (order) {
      await prisma.order.update({
        where: { id },
        data: { status: ORDER_STATUS.CANCELED, cancelReason },
      });
      if (order.status === ORDER_STATUS.SHIPPING) {
        const items: CartDataProps[] = JSON.parse(order.items);
        await Promise.all(
          items.map(async (item) => {
            if (item.classificationId !== null) {
              return await prisma.classification.update({
                where: { id: item.classificationId },
                data: {
                  quantity: { increment: item.quantity },
                },
              });
            }
            return;
          })
        );
        return res.status(STATUS_CODE.OK).json({
          code: STATUS_CODE.OK,
          data: null,
          msg: "Xác nhận đơn thành công",
        });
      }
    } else {
      return res.status(STATUS_CODE.FAILED).json({
        code: STATUS_CODE.FAILED,
        data: null,
        msg: "Không tìm thấy order",
      });
    }
  } catch (error) {
    return res
      .status(STATUS_CODE.INTERNAL)
      .json({ code: STATUS_CODE.INTERNAL, data: null, msg: "internal" });
  }
}
