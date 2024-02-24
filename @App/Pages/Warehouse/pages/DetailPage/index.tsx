import { CoreCard } from '@/@App/Core/components'
import WarehouseDetailProvider from './WarehouseDetailProvider'
import BillForm from './components/BillForm'
import { ProductInfo } from './components/ProductInfo'
import TableBill from './components/TableBill'
import { Button } from 'antd'
import { useRouter } from 'next/router'
import { WAREHOUSE_ROUTER } from '../../configs/router'

const DetailPage = (props: any) => {
	const router = useRouter()
	return (
		<WarehouseDetailProvider>
			<Button className="my-4" type="primary" onClick={() => router.push(WAREHOUSE_ROUTER.LIST)}>
				Quay lại
			</Button>
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
				<ProductInfo />
				<CoreCard>
					<BillForm />
				</CoreCard>
			</div>
			<CoreCard className="mt-12">
				<TableBill />
			</CoreCard>
		</WarehouseDetailProvider>
	)
}

export default DetailPage
