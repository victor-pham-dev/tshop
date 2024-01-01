import { useContext } from 'react'
import { CoreContext } from '../provider/CorePageProvider'

export const useCorePageContext = () => {
	const value = useContext(CoreContext)
	return value
}
