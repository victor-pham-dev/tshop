import { NextApiRequest } from 'next'
import { prisma } from '@/services/prisma'
import { OrderPaymentMethod } from '@prisma/client'
import moment from 'moment'
import { STATUS_CODE } from '@/const/app-const'

interface ItemProps {
	productId: number
	quantity: number
}
interface DataProps {
	receiver: {
		name: string
		phone: string
		address: string
		email: string
	}
	payment: {
		method: OrderPaymentMethod
		note: string
		voucher: string
	}
	items: ItemProps[]
	note: string
}

export default async function create(req: NextApiRequest) {
	const { receiver, payment, items, note } = req.body as DataProps
	try {
		let itemsPrice = 0
		let hasPaid = 0
		// for check quantity in warehouse
		let productNameSoldOut: string[] = []
		const mapCheckQuantity = await Promise.all(
			items.map(async item => {
				const { quantity, productId } = item
				const warehouseItem = await prisma.wareHouse.findUnique({
					where: {
						productId
					},
					select: {
						Product: true,
						quantity: true
					}
				})
				itemsPrice += quantity * (warehouseItem?.Product?.salePrice ?? 0)
				if (warehouseItem?.quantity && warehouseItem?.quantity >= quantity) {
					return true
				} else {
					productNameSoldOut.push(warehouseItem?.Product?.name ?? '')
				}
				return false
			})
		)

		if (!mapCheckQuantity.every(item => Boolean(item))) {
			return {
				ok: false,
				data: null,
				msg: productNameSoldOut.toString(),
				status: STATUS_CODE.OK
			}
		}

		// check quantity DONE

		const customerInfo = await prisma.orderCustomerInfo.create({
			data: receiver
		})

		// check voucher
		let discountAmount = 0
		let voucherId: undefined | number = undefined

		if (payment.voucher?.trim().length > 0) {
			const voucherDetail = await prisma.voucher.findUnique({
				where: {
					code: payment.voucher
				}
			})
			if (voucherDetail) {
				if (voucherDetail?.usageCount <= 0) {
					return {
						ok: false,
						data: true,
						msg: `Voucher ${payment.voucher} đã hết lượt sử dụng `,
						status: STATUS_CODE.OK
					}
				}

				const now = moment()
				if (now.isBefore(voucherDetail?.activeAt)) {
					return {
						ok: false,
						data: true,
						msg: `Voucher ${payment.voucher} có hiệu lực vào lúc ${moment(voucherDetail.activeAt).format(
							'HH:mm DD/mm/YYYY'
						)}  ^ ^`,
						status: STATUS_CODE.OK
					}
				}
				if (now.isAfter(voucherDetail?.dueAt)) {
					return {
						ok: false,
						data: true,
						msg: `Voucher ${payment.voucher} đã hết hiệu lực rồi quý khách!`,
						status: STATUS_CODE.OK
					}
				}
			}
			voucherId = voucherDetail?.id
			discountAmount = voucherDetail?.discount ?? 0
		}
		// check voucher ok

		const createPayment = await prisma.orderPayment.create({
			data: {
				itemsPrice,
				hasPaid: itemsPrice - discountAmount,
				status: 'PROCESSING',
				discountAmount,
				...payment
			}
		})

		const newOrder = await prisma.order.create({
			data: {
				status: 'WAITING_CONFIRM',
				orderCustomerInfoId: customerInfo.id,
				orderPaymentId: createPayment.id,
				note,
				voucherId
			}
		})

		prisma.orderItem.createMany({
			data: items.map(item => ({ ...item, orderId: newOrder.id }))
		})

		return {
			ok: true,
			data: newOrder,
			msg: 'Đơn hàng của bạn đã được tạo thành công',
			status: STATUS_CODE.CREATED
		}
	} catch (error: any) {
		// console.log('🚀 ~ file: create.ts:35 ~ create ~ error:', error)
		return {
			ok: false,
			data: null,
			msg: error?.message,
			status: STATUS_CODE.INTERNAL
		}
	}
}
