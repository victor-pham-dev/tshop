import { NextApiRequest, NextApiResponse } from "next";
import { METHOD, ORDER_STATUS, STATUS_CODE } from "@/const/app-const";
import { ResponseProps } from "@/network/services/api-handler";
import { AuthToken } from "@/middleware/server/auth";
import { CartDataProps } from "@/contexts/CartContext";
import { prisma } from "@/lib/prisma";

export interface MarkDoneOrderProps {
  id: string;
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

  const { id } = req.body as MarkDoneOrderProps;
  try {
    const order = await prisma.order.findFirst({
      where: { id },
    });

    if (order) {
      if (order.status === ORDER_STATUS.SHIPPING) {
        const today = new Date();

        await prisma.order.update({
          where: { id },
          data: {
            status: ORDER_STATUS.DONE,
            doneAt: today.toLocaleDateString(),
          },
        });

        const items: CartDataProps[] = JSON.parse(order.items);
        await Promise.all(
          items.map(async (item) => {
            if (item.classificationId !== null) {
              const classifi = item.Product.classifications.find(
                (cls) => cls.id === item.classificationId
              );
              if (classifi !== undefined && classifi.warranty > 0) {
                const dueDate = new Date(
                  new Date().getTime() + classifi.warranty * 24 * 60 * 60 * 1000
                );

                return await prisma.warranty.create({
                  data: {
                    phone: order.phone,
                    email: order.email,
                    classificationId: item.classificationId,
                    orderId: order.id,
                    dueAt: dueDate.toISOString(),
                    productId: item.Product.id,
                    userId: order.userId,
                  },
                });
              }

              const statistic = await prisma.sellstatistic.findFirst({
                where: { classificationId: item.classificationId },
              });
              if (statistic !== null && classifi !== undefined) {
                const newQuantity = statistic.sellQuantity + item.quantity;
                const newAverage =
                  (statistic.sellAveragePrice * statistic.sellQuantity +
                    item.quantity * classifi.price) /
                  newQuantity;
                await prisma.sellstatistic.update({
                  where: { id: statistic.id },
                  data: {
                    sellQuantity: newQuantity,
                    sellAveragePrice: newAverage,
                  },
                });
              }

              return;
            }
            return;
          })
        );

        return res.status(STATUS_CODE.OK).json({
          code: STATUS_CODE.OK,
          data: null,
          msg: "Xác nhận đã hoàn thành",
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
