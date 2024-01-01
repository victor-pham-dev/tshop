import { useAntdTable, useRequest } from 'ahooks'
import { Button, Image, Switch, Table, Tag, Tooltip } from 'antd'
import { useTableBill } from '../hooks/useTableBill'
import { useEffect } from 'react'
import moment from 'moment'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
// import { PRODUCT_ROUTER } from '../../configs/router'
import { useCorePageContext } from '@/@App/Core/hooks/useAppContext'
import { WareHouseBill, WarehouseLogReason } from '@prisma/client'
import { useNoteModal } from '../hooks/useNoteModal'
import { useEditFormModal } from '../hooks/useEditFormModal'

export default function TableBill() {
	const router = useRouter()
	const { tableProps } = useTableBill()

	const { handleOpenRoleModal } = useCorePageContext()
	const { handleOpenNoteModal, renderNoteModal } = useNoteModal()
	const { handleCloseEditModal, renderEditModal, handleOpenEditModal } = useEditFormModal()
	// const { type, changeType, submit, reset } = search
	// const { loadingDeleteRole, deleteRole } = roleUserFormDetail()
	const columns = [
		{
			title: 'ID',
			dataIndex: 'id'
		},
		{
			title: 'Hành động',
			dataIndex: 'reason',
			render: (data: WarehouseLogReason) => {
				return (
					<Tag
						color={data === 'DAMAGED' ? 'red' : data === 'IMPORT' ? 'blue' : data === 'SELL' ? 'green' : ''}
					>
						{data === 'DAMAGED'
							? 'Hàng hỏng'
							: data === 'IMPORT'
							? 'Nhập hàng'
							: data === 'SELL'
							? 'Bán hàng'
							: ''}
					</Tag>
				)
			}
		},
		{
			title: 'Số lượng',
			dataIndex: 'quantity',
			render: (data: number) => <>{data.toLocaleString()}</>
		},
		{
			title: 'Giá',
			dataIndex: 'price',
			render: (data: number) => <>{data.toLocaleString()} VND</>
		},
		{
			title: 'Ghi chú',
			dataIndex: 'note',
			render: (data: string) => (
				<Button type="primary" onClick={() => handleOpenNoteModal(data)}>
					Xem ghi chú
				</Button>
			)
		},
		{
			title: 'Ngày tạo',
			dataIndex: 'createdAt',
			render: (data: string) => <>{moment(data).format('HH:mm DD/mm/YYYY')}</>
		},
		{
			title: 'Cập nhật',
			dataIndex: 'updatedAt',
			render: (data: string) => <>{moment(data).format('HH:mm DD/mm/YYYY')}</>
		},
		{
			title: 'Nền tảng',
			dataIndex: '',
			render: (data: WareHouseBill) => <>{`${data.platformSell} - Id: ${data?.platformOrderId}`}</>
		},
		{
			title: 'Đơn hàng',
			dataIndex: 'orderId',
			render: (data: string | null) => <>{data ? <Button>Xem đơn hàng</Button> : ''}</>
		},
		{
			title: 'Hành động',
			render: (data: WareHouseBill) => {
				return (
					<div className="flex flex-col gap-2">
						<Tooltip placement="topLeft" title={'Chỉnh sửa'}>
							<Button
								className="flex items-center justify-center"
								onClick={() => handleOpenEditModal(data)}
								type="primary"
								style={{ width: '25%' }}
							>
								<EditOutlined />
							</Button>
						</Tooltip>
					</div>
				)
			}
		}
	]
	return (
		<>
			{/* <Button
				onClick={() => handleOpenRoleModal()}
				type="primary"
				color="success"
				style={{ width: '20%', marginBottom: '10px' }}
			>
				Thêm Quyền User
			</Button> */}
			<Table columns={columns} rowKey="id" {...tableProps} />
			{renderNoteModal()}
			{renderEditModal()}
		</>
	)
}
