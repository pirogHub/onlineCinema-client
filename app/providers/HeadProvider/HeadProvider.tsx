import Head from 'next/head'
import NextProgressBar from 'nextjs-progressbar'
import { FC, PropsWithChildren } from 'react'

import { accentColor } from '@/config/constants'

import Favicons from './Favicons'

const HeadProvider: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<NextProgressBar
				color={accentColor}
				startPosition={0.3}
				stopDelayMs={200}
				height={3}
			/>
			<Head>
				<meta
					name="viewport"
					content="width-device-width, initial-scale=1, maximum-scale=1.0"
				/>

				<Favicons />

				<meta name="theme-color" content={'#181B1e'} />
				<meta name="msaplication-navbutton-color" content={'#181B1e'} />
				<meta
					name="apple-mobile-web-app-status-bar-style"
					content={'#181B1e'}
				/>
				<link rel="manifest" href="/manifest.json" />
			</Head>
			{children}
		</>
	)
}

export default HeadProvider
