import { useRequest } from 'ahooks'
import { Select, Spin } from 'antd'
import { useEffect, useState } from 'react'
import { roleServices } from '../../Role/services/roleServices'
import { CoreSelectWithApi } from '@/@App/@Core/components'

const DashboardAdmin = () => {
	return (
		<>
			<CoreSelectWithApi
				apiService={roleServices.search}
				name="role"
				customRender={(option: any) => <>{`${option?.label} --  ${option?.alias}`}</>}
			/>
		</>
	)
}
export default DashboardAdmin
