import { useAntdTable } from 'ahooks'
import { Button, Image, Table, Tooltip } from 'antd'
import { useTable } from '../hooks/useTable'
import { useEffect } from 'react'
import { useImageModal } from '../hooks/useImageModal'
import moment from 'moment'
import { EditOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import { PRODUCT_ROUTER } from '../../configs/router'
import { useDescriptionModal } from '../hooks/useDescriptionModal'

export default () => {
	const router = useRouter()
	const { getTableData } = useTable()
	const { tableProps, run } = useAntdTable(getTableData)
	console.log("🚀 ~ file: Table.tsx:16 ~ tableProps:", tableProps)
	
	console.log('🚀 ~ file: Table.tsx:9 ~ tableProps:', tableProps)
	const { handleOpenImageModal, renderImagesModal } = useImageModal()
	const { handleOpenDescriptionModal, renderDescriptionModal } = useDescriptionModal()

	// const { type, changeType, submit, reset } = search

	const columns = [
		{
			title: 'ID',
			dataIndex: 'id'
		},
		{
			title: 'Tên sản phẩm',
			dataIndex: 'name'
		},
		{
			title: 'Ảnh',
			dataIndex: 'images',
			render: (images: string) => {
				const arr = JSON.parse(images) as string[]
				return (
					<div className="flex w-[120px]  flex-col gap-2">
						<Image className="rounded-md aspect-square" src={arr[0]} />
						<Button onClick={() => handleOpenImageModal(arr)} type="primary">
							Xem tất cả
						</Button>
					</div>
				)
			}
		},
		{
			title: 'Danh mục',
			dataIndex: 'category'
		},
		{
			title: 'Phân loại',
			dataIndex: 'classifications',
			render: (data: any) => <Button type="primary">Xem {data?.length} phân loại</Button>
		},
		{
			title: 'Mô tả- Giới thiệu',
			dataIndex: 'description',
			render: (data: string) => (
				<Button onClick={() => handleOpenDescriptionModal(data)} type="primary">
					Xem mô tả
				</Button>
			)
		},
		{
			title: 'Trạng thái',
			dataIndex: 'status'
		},

		{
			title: 'Ngày tạo',
			dataIndex: 'createdAt',
			render: (data: any) => <>{moment(data).format('DD/MM/YYYY')}</>
		},
		{
			title: 'Ngày cập nhật',
			dataIndex: 'updatedAt',
			render: (data: any) => <>{moment(data).format('DD/MM/YYYY - hh:mm')}</>
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
								onClick={() => router.push(PRODUCT_ROUTER.DETAIL(data?.id))}
								type="primary"
								color="success"
							>
								<EditOutlined />
							</Button>
						</Tooltip>
					</div>
				)
			}
		}
	]

	const renderAllImage = () => {}

	return (
		<>
			<Table columns={columns} rowKey="id" {...tableProps} />
			{renderImagesModal()}
			{renderDescriptionModal()}
		</>
	)
}
