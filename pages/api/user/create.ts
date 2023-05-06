import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { METHOD } from "@/const/app-const";
import bcrypt from "bcrypt";
import { ResponseProps } from "@/network/services/api-handler";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseProps<string | null>>
) {
  if (req.method !== METHOD.POST) {
    return res
      .status(405)
      .json({ code: 405, data: null, msg: "Request not found" });
  }

  const { name, email, password } = req.body;

  try {
    const findExisted = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (findExisted !== null) {
      return res
        .status(409)
        .json({ code: 409, data: null, msg: "Email đã được sử dụng" });
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        name,
        email,
        password: encryptedPassword,
      },
    });
    return res
      .status(201)
      .json({ code: 201, data: null, msg: "Đăng ký thành công" });
  } catch (error) {
    return res.status(500).json({ code: 500, data: null, msg: "internal" });
  }
}
