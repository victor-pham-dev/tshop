"use client";
import { LockOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Form, Input, Row, message } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { ResetPasswordApi } from "../api/user.api";
import { useLoading } from "@/hooks";
import { PATH, STATUS_CODE } from "@/const/app-const";

export default function ConfirmRegister() {
  const router = useRouter();

  const { token, type } = router.query;
  // console.log(token, type);

  // console.log(accessToken);
  // console.log(type);
  return (
    <React.Fragment>
      <ResetPassword token={token} />
    </React.Fragment>
  );
}

// let { data, error } = await supabase.auth.resetPasswordForEmail(email);
interface ResetPasswordProps {
  token: string | string[] | undefined;
}
function ResetPassword({ token }: ResetPasswordProps) {
  const { setIsLoading } = useLoading();
  const router = useRouter();
  async function onChangePassword(values: any) {
    if (token === null) {
      message.error("Đường dẫn đã hết hạn");
    } else {
      setIsLoading(true);
      const result = await ResetPasswordApi({
        token: token?.toString() ?? "",
        newPassword: values.password,
      });

      if (result.code === STATUS_CODE.OK) {
        message.success("Mật khẩu đã được thay đổi");
        router.push(`/${PATH.LOGIN}`);
      } else {
        message.error("Đường dẫn đã hết hạn hoặc không hợp lệ");
      }
      setIsLoading(false);
    }
  }
  return (
    <Row align="middle" justify="center" style={{ minHeight: "90vh" }}>
      <Col
        xs={{ span: 24 }}
        sm={{ span: 24 }}
        md={{ span: 12 }}
        lg={{ span: 12 }}
        xl={{ span: 8 }}
        style={{ padding: 16 }}
      >
        <Row justify="center" style={{ marginBottom: 20 }}>
          <Col>
            <Image src={`/favicon.svg`} alt="mina" width={80} height={80} />
          </Col>
        </Row>
        <Form
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={(values: any) => onChangePassword(values)}
        >
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Vui lòng điền mật khẩu!" },
              { min: 6, message: "Ít nhất 6 kí tự!" },
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Mật khẩu mới"
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu!" },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Mật khẩu xác nhận không trùng!");
                },
              }),
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Xác nhận mật khẩu"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block
            >
              Đổi mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}
