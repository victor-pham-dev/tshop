'use client'
import { Button, Col, Divider, Form, Input, Row } from 'antd'
import React from 'react'
import { LockTwoTone, MailTwoTone } from '@ant-design/icons'
import Link from 'next/link'
import Image from 'next/image'
import { useLogin } from './hooks/useLogin'
import { REGEX } from '@/const/regexp'
import { AUTH_ROUTER } from '../configs/router'

const Login = () => {
	const { loading, handleSubmit } = useLogin()

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
				<Divider style={{ color: 'white' }}>Đăng nhập</Divider>
				<Form
					autoComplete="true"
					name="normal_login"
					initialValues={{ remember: true }}
					onFinish={handleSubmit}
				>
					<Form.Item
						name="email"
						rules={[
							{ required: true, message: 'Vui lòng điền email!' },
							{ pattern: REGEX.EMAIL, message: 'Email không hợp lệ !' }
						]}
					>
						<Input prefix={<MailTwoTone />} placeholder="Email" />
					</Form.Item>
					<Form.Item name="password" rules={[{ required: true, message: 'Vui lòng điền mật khẩu!' }]}>
						<Input prefix={<LockTwoTone />} type="password" placeholder="Mật khẩu" />
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" className="login-form-button" block loading={loading}>
							Đăng nhập
						</Button>
					</Form.Item>
				</Form>
				<p style={{ marginBottom: 16 }}> {`Bạn chưa có tài khoản ?`}</p>

				<Row justify="space-between" gutter={[10, 10]}>
					<Col span={12}>
						<Link href={`${AUTH_ROUTER.REGISTER}`}>
							<Button type="primary" style={{ float: 'left' }}>
								Đăng ký
							</Button>
						</Link>
					</Col>
					<Col>
						<Link href={`${AUTH_ROUTER.REGISTER}`}>
							<Button type="primary" style={{ float: 'left' }}>
								Quên mật khẩu
							</Button>
						</Link>
					</Col>
				</Row>
			</Col>
		</Row>
	)
}

export default Login
