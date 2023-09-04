import { useRequest } from 'ahooks'
import { productServices } from '../../services/productServices'
import { useEffect } from 'react'
import { useUser } from '@/hooks'
import { useRouter } from 'next/router'
import { Product } from '@prisma/client'

export const useProductDetail = () => {
	const router = useRouter()
	const { id } = router.query

	const {
		data: product,
		loading: loadingFetchProduct,
		run: fetchProduct
	} = useRequest(productServices.find, { manual: true })
	useEffect(() => {
		if (id && id?.toString() !== 'new') {
			fetchProduct(id?.toString())
		}
	}, [id])
	return { product: product?.data, loadingFetchProduct }
}
