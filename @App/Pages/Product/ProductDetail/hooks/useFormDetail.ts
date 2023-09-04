import { productServices } from '../../services/productServices'
import { useRequest } from 'ahooks'

export const useFormDetail = () => {
	const { loading: loadingSaveProduct, run: saveProduct } = useRequest(productServices.detail, {
		manual: true,
		onSuccess: data => console.log(data),
		onError: error => console.log('er', error)
	})

	return { loadingSaveProduct, saveProduct }
}
