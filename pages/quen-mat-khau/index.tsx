import { Button, Col, Divider, Form, Input, Row, message } from 'antd'
import React from 'react'
import { MailTwoTone } from '@ant-design/icons'
import { PATH, STATUS_CODE } from '../../const/app-const'
import { REGEX } from '../../const/regexp'
import Link from 'next/link'
import Image from 'next/image'

export default function Login(): JSX.Element {
	// async function SendEmail(email: string) {
	//   setIsLoading(true);
	//   const result = await SendResetMailApi(email);
	//   if (result.code === STATUS_CODE.OK) {
	//     message.info("Đã gửi mail, vui lòng kiểm tra cả spam và hòm thư rác");
	//   } else {
	//     message.error("Đã có lỗi xảy ra");
	//   }
	//   setIsLoading(false);
	// }

	return (
		<Row align="middle" justify="center" style={{ height: '90vh' }}>
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
				<Divider style={{ color: 'white' }}>Quên mật khẩu</Divider>
				<Form autoComplete="true" name="normal_login" initialValues={{ remember: true }} onFinish={values => 1}>
					<Form.Item
						name="email"
						rules={[
							{ required: true, message: 'Vui lòng điền email!' },
							{ pattern: REGEX.EMAIL, message: 'Email không hợp lệ !' }
						]}
					>
						<Input prefix={<MailTwoTone />} placeholder="Email" />
					</Form.Item>

					<Form.Item>
						<Button type="primary" htmlType="submit" className="login-form-button" block>
							Gửi Email
						</Button>
					</Form.Item>
				</Form>
				<Row justify="space-between" gutter={[10, 10]}>
					{`Bạn chưa có tài khoản ?`}
					<Col span={24}>
						<Link href={`/${PATH.LOGIN}`}>
							<Button type="primary" style={{ float: 'left' }}>
								Đăng nhập
							</Button>
						</Link>
					</Col>
					{/* <Col span={16}>
            <p>Hoặc đăng nhập với</p>
            <Facebook />
          </Col> */}
				</Row>
			</Col>
		</Row>
	)
}
