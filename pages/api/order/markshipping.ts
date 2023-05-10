import { NextApiRequest, NextApiResponse } from "next";
import { METHOD, ORDER_STATUS, STATUS_CODE } from "@/const/app-const";
import { ResponseProps } from "@/network/services/api-handler";
import { AuthToken } from "@/middleware/server/auth";
import { prisma } from "@/lib/prisma";

export interface MarkShippingOrderProps {
  id: string;
  shippingInfo: string;
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

  const { id, shippingInfo } = req.body as MarkShippingOrderProps;
  try {
    const order = await prisma.order.findFirst({
      where: { id },
    });

    if (order) {
      if (order.status === ORDER_STATUS.CONFIRMED) {
        await prisma.order.update({
          where: { id },
          data: { status: ORDER_STATUS.SHIPPING, shippingInfo },
        });
        return res.status(STATUS_CODE.OK).json({
          code: STATUS_CODE.OK,
          data: null,
          msg: "Xác nhận đơn đang vận chuyển",
        });
      }
    } else {
      return res.status(STATUS_CODE.FAILED).json({
        code: STATUS_CODE.FAILED,
        data: null,
        msg: "Đã có lỗi xảy ra",
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(STATUS_CODE.INTERNAL)
      .json({ code: STATUS_CODE.INTERNAL, data: null, msg: "internal" });
  }
}
