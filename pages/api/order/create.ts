import { NextApiRequest, NextApiResponse } from "next";
import { Order } from "@prisma/client";
import { METHOD, STATUS_CODE } from "@/const/app-const";
import { ResponseProps } from "@/network/services/api-handler";
import { AuthToken } from "@/middleware/server/auth";
import { prisma } from "@/services/prisma";
import { CartDataProps } from "@/contexts/CartContext";
import { TeleBOT } from "@/services/telegramBOT";
import { templates } from "@/lib/mail-template/templates";
import { sendMail } from "@/services/nodemailer";

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
    const items: CartDataProps[] = JSON.parse(payload.items);
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
      const result = await prisma.order.create({
        data: payload,
      });

      if (result) {
        const listCartItems = JSON.parse(result.items) as CartDataProps[];
        const cartIds = listCartItems.map((item) => item.id);
        await prisma.cart.deleteMany({
          where: { id: { in: cartIds } },
        });

        await Promise.all(
          listCartItems.map(async (item) => {
            if (item.classificationId !== null) {
              return await prisma.classification.update({
                where: { id: item.classificationId },
                data: {
                  quantity: { decrement: item.quantity },
                },
              });
            }
            return;
          })
        );
        const mailContent = templates.orderInfo(
          result.id,
          result.paymentStatus,
          result.status,
          `${result.receiver}-${result.phone}-${result.specificAddress}-${result.ward}-${result.district}-${result.province}`,
          result.total,
          listCartItems,
          "",
          ""
        );
        sendMail({
          to: result.email,
          subject: "Xác nhận đặt hàng - ITX Gear",
          html: mailContent,
        });
        await TeleBOT.sendText(
          `💰💰💰 ĐƠN  HÀNG  MỚI: phone: ${payload.phone} - mail: ${payload.email} - tỉnh: ${payload.province} - Sô SP: ${items.length}- Tổng tiền: ${payload.total}`
        );

        return res.status(STATUS_CODE.CREATED).json({
          code: STATUS_CODE.CREATED,
          data: result.id,
          msg: "Tạo đơn thành công",
        });
      }
    } else {
      return res.status(STATUS_CODE.CONFLICT).json({
        code: STATUS_CODE.CONFLICT,
        data: null,
        msg: "Một hoặc vài sản phẩm đã hết hàng",
      });
    }
  } catch (error) {
    return res
      .status(STATUS_CODE.INTERNAL)
      .json({ code: STATUS_CODE.INTERNAL, data: null, msg: "internal" });
  }
}
