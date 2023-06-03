import { NextApiRequest, NextApiResponse } from "next";
import { METHOD, ORDER_STATUS, STATUS_CODE } from "@/const/app-const";
import { ResponseProps } from "@/network/services/api-handler";
import { AuthToken } from "@/middleware/server/auth";
import { prisma } from "@/services/prisma";
import { templates } from "@/lib/mail-template/templates";
import { CartDataProps } from "@/contexts/CartContext";
import { sendMail } from "@/services/nodemailer";

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
        const today = new Date();
        await prisma.order.update({
          where: { id },
          data: {
            status: ORDER_STATUS.SHIPPING,
            shippingInfo,
            shipAt: today.toLocaleDateString(),
          },
        });

        const items: CartDataProps[] = JSON.parse(order.items);
        const mailContent = templates.orderInfo(
          order.id,
          order.paymentStatus,
          order.status,
          `${order.receiver}-${order.phone}-${order.specificAddress}-${order.ward}-${order.district}-${order.province}`,
          order.total,
          items,
          shippingInfo,
          "Đơn hàng của quý khách đang được vận chuyển"
        );
        sendMail({
          to: order.email,
          subject: "Đơn hàng đang được vận chuyển - ITX Gear",
          html: mailContent,
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
    return res
      .status(STATUS_CODE.INTERNAL)
      .json({ code: STATUS_CODE.INTERNAL, data: null, msg: "internal" });
  }
}
