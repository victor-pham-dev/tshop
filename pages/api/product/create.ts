import { NextApiRequest, NextApiResponse } from "next";
import { Classification, PrismaClient } from "@prisma/client";
import { METHOD, STATUS_CODE } from "@/const/app-const";
import { ResponseProps } from "@/network/services/api-handler";
const prisma = new PrismaClient();

interface BodyProps {
  name: string;
  status: string;
  images: string[];
  description: string;
  classifications: Classification[];
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
  const { name, status, images, description, classifications } =
    req.body as BodyProps;
  try {
    await prisma.product.create({
      data: {
        name,
        status,
        images,
        description,
        classifications: {
          create: classifications.map((item) => item),
        },
      },
    });

    return res.status(STATUS_CODE.CREATED).json({
      code: STATUS_CODE.CREATED,
      data: null,
      msg: "Tạo sản phẩm thành công",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(STATUS_CODE.INTERNAL)
      .json({ code: STATUS_CODE.INTERNAL, data: null, msg: "internal" });
  }
}
