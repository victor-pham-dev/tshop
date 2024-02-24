import { useAntdTable } from 'ahooks'
import { Button, Image, Table, Tag, Tooltip } from 'antd'
import { useTable } from '../hooks/useTable'
import { useImageModal } from '../hooks/useImageModal'
import moment from 'moment'
import { EditOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import { PRODUCT_ROUTER } from '../../configs/router'
import { useDescriptionModal } from '../hooks/useDescriptionModal'
import clsx from 'clsx'

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
			title: 'Tên sản phẩm',
			dataIndex: 'name'
		},
		{
			title: 'Giá gốc',
			dataIndex: 'price',
			render: (data: any) => data?.toLocaleString()
		},
		{
			title: 'Giá bán',
			dataIndex: 'salePrice',
			render: (data: any) => data?.toLocaleString()
		},
		{
			title: 'Kho',
			dataIndex: 'WareHouse',
			render: (data?: any) => (
				<span
					className={clsx('rounded-md text-white  p-4', {
						'bg-red-500': data?.quantity === 0,
						'bg-green-500': data?.quantity && data?.quantity > 4,
						'bg-orange-500': data?.quantity && data?.quantity > 0
					})}
				>
					{data?.quantity?.toLocaleString()}
				</span>
			)
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
			title: 'Trạng thái',
			dataIndex: 'active',
			render: (data: boolean) => (
				<>
					<Tag color={data ? 'green' : 'red'}>{data ? 'Bật' : 'Tắt'}</Tag>
				</>
			)
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
