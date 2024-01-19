import { useRequest } from 'ahooks'
import { Spin, TreeSelect } from 'antd'
import React, { ReactNode, useMemo } from 'react'
import { searchProps } from '../../service/BaseService'
import _ from 'lodash'


interface Component {
	name?: string
	label?: ReactNode
	apiService: ({ params, header }: searchProps) => Promise<any>
	valuePath?: string
	labelPath?: string
	customRender?: (data: any[]) => ReactNode
	placeholder?: string
	searchKey?: string
	size?: 'middle' | 'large' | 'small'
	valueField: string
	titleField: string
	childrenField: string
	dataPath?: string

}

const CoreTreeSelectWithApi: React.FC<Component> = ({
	name,
	label,
	apiService,
	searchKey = 'name',
	valuePath = 'id',
	labelPath = 'name',
	customRender,
	size = 'middle',
	valueField,
	titleField,
	childrenField,
	dataPath,
	...restProps
}) => {
	const {loading, data} = useRequest(apiService)

	const convertDataToTree = (array: any[]): any[] => {
		const result = array?.map(item => {
			return {
				title: item[titleField] ?? '',
				value: item[valueField],
				children: convertDataToTree(item[childrenField] ?? []),
				originData: item

			}
		})
		return result
	} 
	const treeData = useMemo(() => {
		if (!data) {
			return []
		}
		const originData = dataPath ? _.get(data, dataPath) : data
		const convertedData = convertDataToTree(originData)
		return convertedData
	}, [JSON.stringify(data)])


	return (
		<TreeSelect
			showSearch
			loading={loading}
			size={size}
			onSelect={(data: any) => console.log(data)}
			placeholder="Chọn"
			showArrow={false}
			notFoundContent={loading ? <Spin size="small" /> : null}
			className="min-w-[240px]"
			{...restProps}
			treeData={treeData}
		/>
	)
}

export default React.memo(CoreTreeSelectWithApi)