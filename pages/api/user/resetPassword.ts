import { NextApiRequest, NextApiResponse } from "next";
import { METHOD, STATUS_CODE, TOKEN_KEY } from "@/const/app-const";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ResponseProps } from "@/network/services/api-handler";
import { prisma } from "@/lib/prisma";
import { supabase } from "@/services/supabase";
// import { MailSendProps, sendgrid } from "@/services/sendgrid";

interface PayloadProps {
  token: string;
  newPassword: string;
}
interface TokenDecodeProps {
  email: string;
  exp: number;
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

  const { token, newPassword } = req.body as PayloadProps;

  try {
    const user = jwt.decode(token) as TokenDecodeProps;
    const now = new Date();

    if (user && now.getTime() > user.exp) {
      await supabase.auth.updateUser({
        email: user.email,
        password: newPassword,
      });
      const encryptPw = await bcrypt.hash(newPassword, 10);
      await prisma.user.update({
        where: {
          email: user.email,
        },
        data: {
          password: encryptPw,
        },
      });
      return res
        .status(STATUS_CODE.OK)
        .json({ code: STATUS_CODE.OK, data: null, msg: "Thành công" });
    }

    return res.status(STATUS_CODE.FAILED).json({
      code: STATUS_CODE.FAILED,
      data: null,
      msg: "Đường dẫn đã hết hạn hoặc không hợp lệ",
    });
    // const mailContent: MailSendProps = {
    //   to: "truongpham241.nd@gmail.com",
    //   from: "truongpham2412.dev@gmail.com",
    //   subject: "test cai",
    //   text: "vui ve thoi",
    // };
    // const a = await sendgrid.send(mailContent);
    // console.log(a);
    // const user = await prisma.user.findUnique({
    //   where: {
    //     email: email.toLowerCase(),
    //   },
    // });
    // if (user === null) {
    //   return res.status(STATUS_CODE.FAILED).json({
    //     code: STATUS_CODE.FAILED,
    //     data: null,
    //     msg: "Tài khoản hoặc mật khẩu không chính xác",
    //   });
    // }

    // if (user.active === false) {
    //   const userSupabase = await supabase.auth.signInWithPassword({
    //     email,
    //     password,
    //   });
    //   if (userSupabase.data.user === null) {
    //     return res.status(STATUS_CODE.FAILED).json({
    //       code: STATUS_CODE.FAILED,
    //       data: null,
    //       msg: "Tài khoản chưa được xác nhận",
    //     });
    //   } else {
    //     await prisma.user.update({
    //       where: { id: user.id },
    //       data: {
    //         active: true,
    //       },
    //     });
    //   }
    // }

    // const comparePassword = bcrypt.compare(password, user.password);
    // if (!comparePassword) {
    //   return res.status(STATUS_CODE.FAILED).json({
    //     code: STATUS_CODE.FAILED,
    //     data: null,
    //     msg: "Mật khẩu không chính xác",
    //   });
    // }

    // const accessToken = jwt.sign(
    //   { email: email.toLowerCase(), role: user.role, id: user.id },
    //   TOKEN_KEY,
    //   {
    //     expiresIn: "7d",
    //   }
    // );
  } catch (error) {
    return res
      .status(STATUS_CODE.INTERNAL)
      .json({ code: STATUS_CODE.INTERNAL, data: null, msg: "internal" });
  }
}
