import { Image, Table,  } from 'antd'

export default (data: any) => {
	const { order } = data

	const columns = [
		{
			title: 'Classification ID',
			dataIndex: ['Classification', 'id']
		},
		{
			title: 'Tên sản phẩm',
			dataIndex: ['Product', 'name']
		},
		{
			title: 'Ảnh',
			dataIndex: ['Product', 'images'],
			render: (images: string) => {
				const arr = JSON.parse(images) as string[]
				return (
					<div className="flex w-[120px]  flex-col gap-2">
						<Image className="rounded-md aspect-square" src={arr[0]} />
					</div>
				)
			}
		},
		{
			title: 'Số lượng',
			dataIndex: 'quantity'
		},
		{
			title: 'Đơn giá',
			dataIndex: ['Classification', 'price']
		}
	]
	return (
		<Table columns={columns} rowKey={record => record.Classification.id}  dataSource={order?.items}/>
	)
}
