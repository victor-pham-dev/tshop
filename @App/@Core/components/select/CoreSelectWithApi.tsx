import { useRequest } from 'ahooks'
import { Select, Spin } from 'antd'
import React, { ReactNode, useEffect, useState } from 'react'
import { searchProps } from '../../service/BaseService'

const { Option } = Select

interface Props {
	name: string
	label?: ReactNode
	apiService: ({ params, header }: searchProps) => Promise<any>
	valuePath?: string
	labelPath?: string
	customRender?: (data: any[]) => void
}

export const CoreSelectWithApi: React.FC<Props> = ({
	name,
	label,
	apiService,
	valuePath = 'id',
	labelPath = 'name',
	customRender,
	...restProps
}) => {
	const [searchText, setSearchText] = useState<string>('')

	const { loading, run, data } = useRequest(apiService, { manual: true, debounceWait: 500 })

	useEffect(() => {
		run({ params: { label: searchText, page: 1, pageSize: 1000 } })
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
			className="min-w-[240px]"
			{...restProps}
		>
			{data?.data?.dataTable?.map((option: any) => (
				<Option key={option.value} value={option[valuePath]}>
					{customRender ? customRender(option) : option[labelPath]}
				</Option>
			))}
		</Select>
	)
}

export default React.memo(CoreSelectWithApi)
