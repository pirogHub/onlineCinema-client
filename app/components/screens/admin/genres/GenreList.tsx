import { FC, PropsWithChildren } from 'react'

import AdminNavigation from '@/components/ui/AdminNavigation/AdminNavigation'
import AdminHeader from '@/components/ui/AdminTable/AdminHeader/AdminHeader'
import AdminTable from '@/components/ui/AdminTable/AdminTable/AdminTable'
import Heading from '@/components/ui/heading/Heading'

import Meta from '@/utils/meta/meta'

import styles from './GenreList.module.scss'
import { useGenres } from './UseGenres'

const GenreList: FC<PropsWithChildren> = () => {
	const {
		handleSerach,
		isLoading,
		searchTerm,
		data,
		deleteAsync,
		createAsync,
	} = useGenres()

	return (
		<Meta title="Genres">
			<AdminNavigation />
			<Heading title="Genres" />

			<AdminHeader
				handleSearch={handleSerach}
				searchTerm={searchTerm}
				onClick={createAsync}
			/>
			<AdminTable
				isLoading={isLoading}
				removeHandler={deleteAsync}
				headerItems={['Name', 'Slug']}
				tableItems={data || []}
			/>
		</Meta>
	)
}

export default GenreList
