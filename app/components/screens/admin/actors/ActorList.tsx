import { FC, PropsWithChildren } from 'react'

import AdminNavigation from '@/components/ui/AdminNavigation/AdminNavigation'
import AdminHeader from '@/components/ui/AdminTable/AdminHeader/AdminHeader'
import AdminTable from '@/components/ui/AdminTable/AdminTable/AdminTable'
import Heading from '@/components/ui/heading/Heading'

import Meta from '@/utils/meta/meta'

import styles from './ActorList.module.scss'
import { useActors } from './UseActors'

const ActorList: FC<PropsWithChildren> = () => {
	const {
		handleSerach,
		isLoading,
		searchTerm,
		data,
		deleteAsync,
		createAsync,
	} = useActors()

	return (
		<Meta title="Actors">
			<AdminNavigation />
			<Heading title="Actors" />

			<AdminHeader
				handleSearch={handleSerach}
				searchTerm={searchTerm}
				onClick={createAsync}
			/>
			<AdminTable
				isLoading={isLoading}
				removeHandler={deleteAsync}
				headerItems={['Name', 'Count movies']}
				tableItems={data || []}
			/>
		</Meta>
	)
}

export default ActorList
