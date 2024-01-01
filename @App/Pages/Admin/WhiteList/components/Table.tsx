import { Divider, Table, Tag, message } from 'antd'
import { useTable } from '../hooks/useTable'

import { useCorePageContext } from '@/@App/Core/hooks/useAppContext'
import { FormAddWhiteList } from './FormAddWhiteList'
import { DeleteAction } from '@/@App/Core/components/action'
import { adminWhiteListService } from '../../services/adminWhiteListService'

export default () => {
	const { tableProps } = useTable()

	const { triggerRefresh } = useCorePageContext()

	const handleHardDelete = async (id: string) => {
		try {
			const result = await adminWhiteListService.remove(id)
			message.success(result?.message)
			triggerRefresh()
		} catch (error: any) {
			message.error(error?.message)
		}
	}

	const columns = [
		{
			title: 'ID',
			dataIndex: 'id'
		},
		{
			title: 'Email',
			dataIndex: 'email'
		},
		{
			title: 'Đã tạo tài khoản',
			dataIndex: 'registed',
			render: (registed: boolean) => (
				<Tag color={registed ? 'green' : 'red'}> {registed ? 'Đã Đăng ký' : 'Chưa'}</Tag>
			)
		},
		{
			title: 'Hành động',
			dataIndex: '',
			render: (data: any) => {
				return (
					<div className="flex flex-col gap-2">
						<DeleteAction action={() => handleHardDelete(data?.id)} />
					</div>
				)
			}
		}
	]
	return (
		<>
			<div className="w-full md:max-w-[500px] md:bg-white md:rounded-md md:px-4 md:pb-2 md:mb-2 md:pt-2">
				<Divider className=" font-600">Thêm mới</Divider>
				<FormAddWhiteList />
			</div>
			<Table columns={columns} rowKey="id" {...tableProps} />
		</>
	)
}
