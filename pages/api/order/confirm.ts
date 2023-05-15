import { NextApiRequest, NextApiResponse } from "next";
import {
  METHOD,
  ORDER_STATUS,
  PAYMENT_STATUS,
  STATUS_CODE,
} from "@/const/app-const";
import { ResponseProps } from "@/network/services/api-handler";
import { AuthToken } from "@/middleware/server/auth";
import { prisma } from "@/lib/prisma";
import { CartDataProps } from "@/contexts/CartContext";

export interface ConfirmOrderProps {
  id: string;
  paymentInfo: string;
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

  const { id, paymentInfo } = req.body as ConfirmOrderProps;
  try {
    const order = await prisma.order.findFirst({
      where: { id },
    });

    if (order) {
      if (order.status === ORDER_STATUS.WAITING_FOR_CONFIRM) {
        const items: CartDataProps[] = JSON.parse(order.items);

        const stockCheck = await Promise.all(
          items.map(async (item) => {
            if (item.classificationId !== null) {
              const classification = await prisma.classification.findUnique({
                where: { id: item.classificationId },
              });
              if (
                classification?.quantity !== undefined &&
                classification?.quantity >= item.quantity
              ) {
                return true;
              }
              return false;
            }
            return false;
          })
        );
        if (stockCheck.every((item) => item === true)) {
          await prisma.order.update({
            where: { id },
            data: {
              paymentInfo,
              status: ORDER_STATUS.CONFIRMED,
              paymentStatus: PAYMENT_STATUS.DONE,
            },
          });
          return res.status(STATUS_CODE.OK).json({
            code: STATUS_CODE.OK,
            data: null,
            msg: "Xác nhận đơn thành công",
          });
        } else {
          return res.status(STATUS_CODE.CONFLICT).json({
            code: STATUS_CODE.CONFLICT,
            data: null,
            msg: "Một hoặc vài sản phẩm đã hết hàng, Vui lòng kiểm tra lại",
          });
        }
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
