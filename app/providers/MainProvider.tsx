import Layout from 'components/layout/Layout'
import { FC, PropsWithChildren, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'

import { TypeComponentAuthFields } from '@/shared/types/auth.types'

import { APP_SERVER_URL } from '@/config/api.config'
import { IS_PRODUCTION } from '@/config/constants'

import { store } from '@/store/store'

import AuthProvider from './AuthProvider/AuthProvider'
import HeadProvider from './HeadProvider/HeadProvider'
import ReduxToast from './ReduxToast'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
})

const MainProvider: FC<PropsWithChildren<TypeComponentAuthFields>> = ({
	children,
	Component,
}) => {
	useEffect(() => {
		console.log('process.env', process.env)
		console.log('IS_PRODUCTION', IS_PRODUCTION)
		console.log('process.env.APP_SERVER_URL', process.env.APP_SERVER_URL)
		console.log('APP_SERVER_URL', APP_SERVER_URL)

		fetch('https://jsonplaceholder.typicode.com/todos/1')
			.then((response) => response.json())
			.then((json) => console.log('fetch syka json', json))
			.catch((err) => console.log('fetch syka error', err))
	})
	return (
		<HeadProvider>
			<Provider store={store}>
				<QueryClientProvider client={queryClient}>
					<ReduxToast />
					<AuthProvider Component={Component}>
						<Layout>{children}</Layout>
					</AuthProvider>
				</QueryClientProvider>
			</Provider>
		</HeadProvider>
	)
}

export default MainProvider
