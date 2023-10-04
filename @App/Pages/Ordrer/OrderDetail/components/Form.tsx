import { Button, Col, Divider, Input, Row, Select } from 'antd'
import { CoreCard } from '@/@App/@Core/components'
import { useCoreContext } from '@/@App/@Core/hooks/useAppContext'
import { useFormDetail } from '../hooks/useFormDetail'
import Table from './Table'
import { buttonStatus } from '@/const/order-const'
import { useCallback, useEffect, useState } from 'react'

const FormDetail = () => {
	const { orderForm, id, loadingSaveOrder, saveOrder, statusChange } = useCoreContext()
	console.log('🚀 ~ file: Form.tsx:11 ~ FormDetail ~ statusChange:', statusChange)
	const { order, customer, payment } = orderForm || { order: {}, customer: {}, payment: {} }
	const [status, setStatus] = useState(order?.status as 'WAITING' | 'CONFIRM' | 'SHIPPING' | 'CANCELED' | 'DONE')

	useEffect(() => {
		if (statusChange !== ''){
			setStatus(statusChange)
		}
	}, [statusChange])
	return (
		<div>
			<Divider className="textTheme">Thông tin đơn hàng id: {id}</Divider>
			<Row gutter={[16, 16]}>
				{status !== 'CANCELED' && status !== 'DONE' && order?.status !== undefined ? (
					<Col xxl={24}>
						<CoreCard>
							<p style={{ width: '100%' }} className="text-[20px] p-4 font-bold text-blue-500">
								Thay đổi trạng thái đơn hàng
							</p>
							{buttonStatus[status].map(item => {
								return (
									<Button
										className="ml-4 mb-4"
										type="primary"
										color="success"
										loading={loadingSaveOrder}
										style={{ backgroundColor: item.color }}
										onClick={async () => {
											saveOrder({ orderId: id, status: item.status })
										}}
									>
										{item.title}
									</Button>
								)
							})}
						</CoreCard>
					</Col>
				) : (
					<></>
				)}
				<Col xxl={24}>
					<CoreCard>
						<p style={{ width: '100%' }} className="text-center text-[20px] py-4 font-bold text-blue-500">
							Danh sách sản phẩm
						</p>
						<Table order={orderForm?.order} />
					</CoreCard>
				</Col>
				<Col xxl={8}>
					<CoreCard>
						<p style={{ width: '100%' }} className="text-[18px] py-2 font-bold text-blue-500">
							Thông tin đơn hàng
						</p>
						<p style={{ width: '100%' }} className="text-[14px] py-2 font-600 text-300">
							Id: {id}
						</p>
						<p style={{ width: '100%' }} className="text-[14px] py-2 font-600 text-500">
							Note: {order?.note}
						</p>
						<p style={{ width: '100%' }} className="text-[14px] py-2 font-600 text-500">
							Status: {order?.status}
						</p>
					</CoreCard>
				</Col>
				<Col xxl={8}>
					<CoreCard>
						<p style={{ width: '100%' }} className="text-[18px] py-2 font-bold text-blue-500">
							Thông tin khách hàng
						</p>
						<p style={{ width: '100%' }} className="text-[14px] py-2 font-600 text-300">
							Họ Tên: {customer?.name}
						</p>
						<p style={{ width: '100%' }} className="text-[14px] py-2 font-600 text-500">
							Địa Chỉ: {customer?.address}
						</p>
						<p style={{ width: '100%' }} className="text-[14px] py-2 font-600 text-500">
							Email: {customer?.email}
						</p>
						<p style={{ width: '100%' }} className="text-[14px] py-2 font-600 text-500">
							SĐT: {customer?.phone}
						</p>
					</CoreCard>
				</Col>
				<Col xxl={8}>
					<CoreCard>
						<p style={{ width: '100%' }} className="text-[18px] py-2 font-bold text-blue-500">
							Thông tin khách hàng
						</p>
						<p style={{ width: '100%' }} className="text-[14px] py-2 font-600 text-300">
							Họ Tên: {customer?.name}
						</p>
						<p style={{ width: '100%' }} className="text-[14px] py-2 font-600 text-500">
							Địa Chỉ: {customer?.address}
						</p>
						<p style={{ width: '100%' }} className="text-[14px] py-2 font-600 text-500">
							Email: {customer?.email}
						</p>
						<p style={{ width: '100%' }} className="text-[14px] py-2 font-600 text-500">
							SĐT: {customer?.phone}
						</p>
					</CoreCard>
				</Col>
			</Row>
		</div>
	)
}

export default FormDetail
