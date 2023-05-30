import { NextApiRequest, NextApiResponse } from "next";
import { METHOD, ORDER_STATUS, STATUS_CODE } from "@/const/app-const";
import { ResponseProps } from "@/network/services/api-handler";
import { AuthToken } from "@/middleware/server/auth";
import { prisma } from "@/services/prisma";
import { CartDataProps } from "@/contexts/CartContext";
import { templates } from "@/lib/mail-template/templates";
import { sendMail } from "@/services/nodemailer";

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
    const today = new Date();
    const order = await prisma.order.findUnique({
      where: { id },
    });
    if (order) {
      await prisma.order.update({
        where: { id },
        data: {
          status: ORDER_STATUS.CANCELED,
          cancelReason,
          cancelAt: today.toLocaleDateString(),
        },
      });
      // if (order.status !== ORDER_STATUS.WAITING_FOR_CONFIRM) {
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
      // }
      const mailContent = templates.orderCancel(
        order.id,
        `${order.receiver}-${order.phone}-${order.specificAddress}-${order.ward}-${order.district}-${order.province}`,
        order.total,
        items,
        cancelReason
      );
      await sendMail({
        to: order.email,
        subject: "Thông tin huỷ đơn hàng - ITX Gear",
        html: mailContent,
      });

      return res.status(STATUS_CODE.OK).json({
        code: STATUS_CODE.OK,
        data: null,
        msg: "Đã huỷ",
      });
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
