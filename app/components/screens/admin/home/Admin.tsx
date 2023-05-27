import { FC, PropsWithChildren } from 'react'

import AdminNavigation from '@/components/ui/AdminNavigation/AdminNavigation'
import Heading from '@/components/ui/heading/Heading'

import Meta from '@/utils/meta/meta'

import Statistics from './statistics/Statistics'

const Admin: FC<PropsWithChildren> = () => {
	return (
		<Meta title="Admin Panel">
			<AdminNavigation />
			<Heading title="Statistics" />
			<Statistics />
		</Meta>
	)
}

export default Admin
