import { useUser } from '@/hooks'
import { useEffect } from 'react'

export default function Logout() {
	const { reset } = useUser()

	useEffect(() => {
		reset()
	}, [])
	return
}
