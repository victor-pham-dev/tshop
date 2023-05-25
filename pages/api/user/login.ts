import { NextApiRequest, NextApiResponse } from "next";
import { METHOD, STATUS_CODE, TOKEN_KEY } from "@/const/app-const";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ResponseProps } from "@/network/services/api-handler";
import { prisma } from "@/lib/prisma";
import { supabase } from "@/services/supabase";
import { TeleBOT } from "@/services/telegramBOT";

interface ResProps {
  accessToken: string;
}

interface PayloadProps {
  email: string;
  password: string;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseProps<ResProps | null>>
) {
  if (req.method !== METHOD.POST) {
    return res.status(STATUS_CODE.INVALID_METHOD).json({
      code: STATUS_CODE.INVALID_METHOD,
      data: null,
      msg: "Invalid method",
    });
  }

  const { email, password } = req.body as PayloadProps;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });
    if (user === null) {
      return res.status(STATUS_CODE.FAILED).json({
        code: STATUS_CODE.FAILED,
        data: null,
        msg: "Tài khoản hoặc mật khẩu không chính xác",
      });
    }

    if (user.active === false) {
      const userSupabase = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (userSupabase.data.user === null) {
        return res.status(STATUS_CODE.FAILED).json({
          code: STATUS_CODE.FAILED,
          data: null,
          msg: "Tài khoản chưa được xác nhận",
        });
      } else {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            active: true,
          },
        });
      }
    }

    const comparePassword = bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(STATUS_CODE.FAILED).json({
        code: STATUS_CODE.FAILED,
        data: null,
        msg: "Mật khẩu không chính xác",
      });
    }

    const accessToken = jwt.sign(
      { email: email.toLowerCase(), role: user.role, id: user.id },
      TOKEN_KEY,
      {
        expiresIn: "7d",
      }
    );
    await TeleBOT.sendText(
      `Khách đăng nhập: Email: ${email} - tên: ${user.name}`
    );
    return res
      .status(STATUS_CODE.OK)
      .json({ code: STATUS_CODE.OK, data: { accessToken }, msg: "Thành công" });
  } catch (error) {
    return res
      .status(STATUS_CODE.INTERNAL)
      .json({ code: STATUS_CODE.INTERNAL, data: null, msg: "internal" });
  }
}
