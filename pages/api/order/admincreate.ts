import { NextApiRequest, NextApiResponse } from "next";
import { METHOD, ORDER_STATUS, STATUS_CODE } from "@/const/app-const";
import { ResponseProps } from "@/network/services/api-handler";
import { AuthToken } from "@/middleware/server/auth";
import { prisma } from "@/lib/prisma";
import { CartDataProps } from "@/contexts/CartContext";

export interface adminCreateOrderProps {
  productId: string;
  classificationId: string;
  price: number;
  quantity: number;
  note: string;
  phone?: string;
  email?: string;
  shipCode?: string;
}

type ItemProps = Partial<CartDataProps>;

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
  const tokenValid = AuthToken(req, res, "ADMIN");
  if (!tokenValid.pass) {
    return;
  }

  const {
    classificationId,
    productId,
    note,
    price,
    quantity,
    email,
    shipCode,
    phone,
  } = req.body as adminCreateOrderProps;
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { classifications: true },
    });

    if (product !== null) {
      const classify = product.classifications.find(
        (cls) => cls.id === classificationId
      );

      if (classify !== undefined && classify.quantity >= quantity) {
        const replacePrice = product.classifications.map((cls) => {
          if (cls.id === classificationId) {
            return { ...cls, price };
          }
          return cls;
        });
        const cloneProduct = { ...product, classifications: replacePrice };

        const items: ItemProps[] = [
          {
            classificationId,
            image: classify.image,
            Product: cloneProduct,
            productId,
            quantity,
          },
        ];
        await prisma.order.create({
          data: {
            items: JSON.stringify(items),
            paymentMethod: "Nền tảng khác",
            total: classify.price * quantity,
            userId: tokenValid.data.id,
            note,
            email,
            shipCode,
            phone,
            status: ORDER_STATUS.DONE,
          },
        });

        const statistic = await prisma.sellstatistic.findFirst({
          where: { classificationId },
        });
        if (statistic !== null) {
          const newQuantity = statistic.sellQuantity + quantity;
          const newAverage =
            (statistic.sellAveragePrice * statistic.sellQuantity +
              quantity * price) /
            newQuantity;
          await prisma.sellstatistic.update({
            where: { id: statistic.id },
            data: {
              sellQuantity: newQuantity,
              sellAveragePrice: newAverage,
            },
          });
        }
      }

      return res
        .status(STATUS_CODE.CREATED)
        .json({ code: STATUS_CODE.CREATED, data: null, msg: "CREATED" });
    } else {
      return res
        .status(STATUS_CODE.FAILED)
        .json({ code: STATUS_CODE.FAILED, data: null, msg: "failed" });
    }
  } catch (error) {
    return res
      .status(STATUS_CODE.INTERNAL)
      .json({ code: STATUS_CODE.INTERNAL, data: null, msg: "internal" });
  }
}
