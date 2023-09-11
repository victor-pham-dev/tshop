import { useRequest } from 'ahooks'
import { productServices } from '../../services/productServices'
import { useEffect, useState } from 'react'
import { useUser } from '@/hooks'
import { useRouter } from 'next/router'
import { Product } from '@prisma/client'

export const useProductDetail = () => {
	const router = useRouter()
	const id = router.query.id as string
	const [product, setProduct] = useState<any>(null)
	const { loading: loadingFetchProduct, runAsync: fetchProduct } = useRequest(productServices.find, { manual: true })

	useEffect(() => {
		const getProduct = async (id: string) => {
			const product = await fetchProduct(id)
			setProduct(product)
			if (!product) {
				router.push('/404')
			}
		}
		if (id && id?.toString() !== 'new') {
			getProduct(id)
		}
	}, [id])

	return { product: product?.data, loadingFetchProduct }
}
