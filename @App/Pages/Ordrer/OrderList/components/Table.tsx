import { useAntdTable } from 'ahooks'
import { Button, Image, Table, Tooltip } from 'antd'
import { useTable } from '../hooks/useTable'
import { useEffect } from 'react'
import { useImageModal } from '../hooks/useImageModal'
import moment from 'moment'
import { EditOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import { ORDER_ROUTER } from '../../configs/router'
import { useDescriptionModal } from '../hooks/useDescriptionModal'

export default () => {
	const router = useRouter()
	const { getTableData } = useTable()
	const { tableProps, run } = useAntdTable(getTableData)

	const { handleOpenImageModal, renderImagesModal } = useImageModal()
	const { handleOpenDescriptionModal, renderDescriptionModal } = useDescriptionModal()

	// const { type, changeType, submit, reset } = search

	const columns = [
		{
			title: 'ID',
			dataIndex: 'id'
		},
		{
			title: 'Tên khác hàng',
			dataIndex: ['customerInfo', 'name']
		},
		{
			title: 'Note',
			dataIndex: 'note'
		},
		{
			title: 'Trạng thái',
			dataIndex: 'status'
		},
		{
			title: 'Hành động',
			dataIndex: '',
			render: (data: any) => {
				console.log(data)
				return (
					<div className="flex flex-col gap-2">
						<Tooltip placement="topLeft" title={'Chỉnh sửa'}>
							<Button
								style={{width: '25%'}}
								type="primary"
								color="success"
								onClick={() => router.push(ORDER_ROUTER.DETAIL(data?.id))}
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
			<Table columns={columns} rowKey="id" {...tableProps} />
			{renderImagesModal()}
			{renderDescriptionModal()}
		</>
	)
}
