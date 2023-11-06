import { useRouter } from 'next/router'
import { useRequest } from 'ahooks'
import { FormInstance, message } from 'antd'
import { useCoreContext } from '@/@App/@Core/hooks/useAppContext'
import { warehouseBillService } from '../../../services/warehouseBillService'

interface Props {
	form: FormInstance<any>
	handleCloseModal?: () => void
}
export const useWarehouseBillForm = (props: Props) => {
	const { form, handleCloseModal } = props
	const { triggerRefresh } = useCoreContext()

	const { loading: loadingCreateImportBill, run: onCreateImportBill } = useRequest(warehouseBillService.save, {
		manual: true,
		onSuccess: data => {
			message.success(data?.msg)
			triggerRefresh()
			form.resetFields()
			if (handleCloseModal) {
				handleCloseModal()
			}
		},
		onError: error => {
			message.error(error?.message)
		}
	})

	return { loadingCreateImportBill, onCreateImportBill }
}
