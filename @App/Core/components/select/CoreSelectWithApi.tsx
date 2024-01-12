import { useRequest } from 'ahooks'
import { Select, Spin } from 'antd'
import React, { ReactNode, useEffect, useState } from 'react'
import { searchProps } from '../../service/BaseService'

const { Option } = Select

interface Props {
	name?: string
	label?: ReactNode
	apiService: ({ params, header }: searchProps) => Promise<any>
	valuePath?: string
	labelPath?: string
	customRender?: (data: any[]) => void
	placeholder?: string
	searchKey?: string
	size?: 'middle' | 'large' | 'small'
}

export const CoreSelectWithApi: React.FC<Props> = ({
	name,
	label,
	apiService,
	searchKey = 'name',
	valuePath = 'id',
	labelPath = 'name',
	customRender,
	size = 'middle',
	...restProps
}) => {
	const [searchText, setSearchText] = useState<string>('')

	const { loading, run, data } = useRequest(apiService, { manual: true, debounceWait: 500 })

	useEffect(() => {
		run({ params: { [searchKey]: searchText ?? '', page: 1, pageSize: 1000 } })
	}, [searchText])

	const handleSearch = (value: any) => {
		setSearchText(value)
	}

	return (
		<Select
			showSearch
			size={size}
			placeholder="Chọn"
			defaultActiveFirstOption={false}
			showArrow={false}
			filterOption={false}
			onSearch={handleSearch}
			notFoundContent={loading ? <Spin size="small" /> : null}
			className="min-w-[240px]"
			{...restProps}
		>
			{data?.data?.dataTable?.map((option: any) => (
				<Option key={Math.random()} value={option[valuePath]}>
					{customRender ? customRender(option) : option[labelPath]}
				</Option>
			))}
		</Select>
	)
}

export default React.memo(CoreSelectWithApi)
