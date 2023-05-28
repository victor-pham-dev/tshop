import { NextApiRequest, NextApiResponse } from "next";
import { METHOD, STATUS_CODE } from "@/const/app-const";
import { ResponseProps } from "@/network/services/api-handler";
import { AuthToken } from "@/middleware/server/auth";
import { prisma } from "@/services/prisma";

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
  const id = req.body.id as string;
  try {
    const record = await prisma.warehouseImport.findUnique({
      where: { id },
    });
    if (record !== null) {
      await prisma.warehouseImport.update({
        where: { id },
        data: { deleted: true },
      });

      await prisma.classification.update({
        where: { id: record.classificationId },
        data: {
          quantity: { decrement: record.quantity },
        },
      });

      const statistic = await prisma.sellstatistic.findFirst({
        where: { classificationId: record.classificationId },
      });
      if (statistic !== null) {
        const newQuantity = statistic.importQuantity - record.quantity;
        const newAverage =
          (statistic.importAveragePrice * statistic.importQuantity -
            record.quantity * record.importPrice) /
          newQuantity;
        await prisma.sellstatistic.update({
          where: { id: statistic.id },
          data: {
            importQuantity: newQuantity,
            importAveragePrice: newAverage,
          },
        });
      }
    }

    return res.status(STATUS_CODE.OK).json({
      code: STATUS_CODE.OK,
      data: null,
      msg: "Xoá thành công",
    });
  } catch (error) {
    // console.log(error);
    return res
      .status(STATUS_CODE.INTERNAL)
      .json({ code: STATUS_CODE.INTERNAL, data: null, msg: "internal" });
  }
}
