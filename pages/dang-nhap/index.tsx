import { Button, Col, Form, Input, message, Row } from "antd";
import React from "react";
// import { Link, useNavigate } from 'react-router-dom
import { LoginApiProps, LoginWithAccountApi } from "../api/user.api";
import { useLoading, useUser } from "../../hooks";
import { LockTwoTone, MailTwoTone } from "@ant-design/icons";
import { PATH, ROLE } from "../../const/app-const";
import { REGEX } from "../../const/regexp";
import { useRouter } from "next/router";
import Link from "next/link";
import { checkRes } from "@/network/services/api-handler";
import { useMutation } from "react-query";
import Image from "next/image";

export default function Login(): JSX.Element {
  const router = useRouter();
  const { login } = useUser();
  const { setIsLoading } = useLoading();

  const Login = useMutation(
    (data: LoginApiProps) => LoginWithAccountApi(data),
    {
      onMutate: () => setIsLoading(true),
      onSuccess: (result) => {
        if (result.data !== null) {
          login(result.data.accessToken);
          router.push(`/`);
        }
        if (result.code >= 400) {
          message.error("Tài khoản hoặc mật khẩu không chính xác!");
        }
      },
      onError: () => {
        setIsLoading(false);
        message.error("Chức năng tạm thời bảo trì!");
      },
    }
  );

  function LoginHandler(values: LoginApiProps) {
    Login.mutate(values);
  }

  return (
    <Row align="middle" justify="center" style={{ height: "90vh" }}>
      <Col
        xs={{ span: 24 }}
        sm={{ span: 24 }}
        md={{ span: 12 }}
        lg={{ span: 8 }}
        xl={8}
        xxl={6}
        style={{ padding: 16 }}
      >
        <Row justify="center" style={{ marginBottom: 20 }}>
          <Col>
            <Image src={`/favicon.svg`} alt="mina" width={80} height={80} />
          </Col>
        </Row>
        <Form
          autoComplete="true"
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={(values) => LoginHandler(values)}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Vui lòng điền email!" },
              { pattern: REGEX.EMAIL, message: "Email không hợp lệ !" },
            ]}
          >
            <Input prefix={<MailTwoTone />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Vui lòng điền mật khẩu!" }]}
          >
            <Input
              prefix={<LockTwoTone />}
              type="password"
              placeholder="Mật khẩu"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
        <Row justify="space-between">
          <Col span={12}>
            {/* <Link href={`/${PATH.FORGOT_PASSWORD}`}>
              <Button type="primary" style={{ float: "right" }}>
                {" "}
                Quên mật khẩu
              </Button>
            </Link> */}
          </Col>
          <Col span={12}>
            <Row justify="end" gutter={[8, 8]}>
              <Col>Chưa có tài khoản?</Col>
              <Col>
                <Link href={`/${PATH.REGISTER}`}>
                  <Button type="primary" style={{ float: "left" }}>
                    Đăng ký
                  </Button>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
