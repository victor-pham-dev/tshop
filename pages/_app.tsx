import UserProvider from '@/@App/@Core/provider/UserProvider'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
// import { Messenger } from "@/components";
import CoreLayout from '@/@App/Layout/CoreLayout'
import { Inter } from 'next/font/google'
import AuthProvider from '@/@App/@Core/provider/AuthProvider'
const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
	return (
		<main className={inter.className}>
			<UserProvider>
				<AuthProvider>
					<CoreLayout>
						{/* <Messenger /> */}
						<Component {...pageProps}></Component>
					</CoreLayout>
				</AuthProvider>
			</UserProvider>
		</main>
	)
}
