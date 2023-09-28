import React from "react";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import Link from "next/link";
import Image from "next/image";
import { useRegister } from "./hooks/useRegister";
import { AUTH_ROUTER } from "../configs/router";

export default function Register(): JSX.Element {
  const { loading, handleSubmit } = useRegister();

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
          <Divider style={{ color: "white" }}>Đăng ký</Divider>
        </Row>
        <Form
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Vui lòng điền họ tên!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Họ tên"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Vui lòng điền email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
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
              placeholder="Mật khẩu"
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
              loading={loading}
            >
              Đăng Ký
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
              <Col>Đã có tài khoản?</Col>
              <Col>
                <Link href={AUTH_ROUTER.LOGIN}>
                  <Button type="primary" style={{ float: "left" }}>
                    Đăng nhập
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
