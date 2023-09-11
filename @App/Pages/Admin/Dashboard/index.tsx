import { useRequest } from 'ahooks'
import { Select, Spin } from 'antd'
import { useEffect, useState } from 'react'
import { roleServices } from '../../Role/services/roleServices'

const DashboardAdmin = () => {
	return (
		<>
			<CustomSelectWithApi />
		</>
	)
}
export default DashboardAdmin

const { Option } = Select
export const CustomSelectWithApi = ({ ...restProps }) => {
	const [searchText, setSearchText] = useState<string>('')

	const { loading, run, data } = useRequest(roleServices.search, { manual: true, debounceWait: 500 })

	useEffect(() => {
		run({ options: { label: searchText, page: 1, pageSize: 1000 } })
	}, [searchText])

	const handleSearch = (value: any) => {
		setSearchText(value)
	}

	return (
		<Select
			showSearch
			placeholder="Select an option"
			defaultActiveFirstOption={false}
			showArrow={false}
			filterOption={false}
			onSearch={handleSearch}
			notFoundContent={loading ? <Spin size="small" /> : null}
			className="w-[240px]"
			{...restProps}
		>
			{data?.data?.dataTable?.map((option: any) => (
				<Option key={option.value} value={option?.id}>
					{option.label}
				</Option>
			))}
		</Select>
	)
}
