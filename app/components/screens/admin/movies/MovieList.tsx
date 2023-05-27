import { FC, PropsWithChildren } from 'react'

import AdminNavigation from '@/components/ui/AdminNavigation/AdminNavigation'
import AdminHeader from '@/components/ui/AdminTable/AdminHeader/AdminHeader'
import AdminTable from '@/components/ui/AdminTable/AdminTable/AdminTable'
import Heading from '@/components/ui/heading/Heading'

import Meta from '@/utils/meta/meta'

import styles from './MovieList.module.scss'
import { useMovies } from './UseMovies'

const MovieList: FC<PropsWithChildren> = () => {
	const {
		handleSerach,
		isLoading,
		searchTerm,
		data,
		deleteAsync,
		createAsync,
	} = useMovies()

	return (
		<Meta title="Movies">
			<AdminNavigation />
			<Heading title="Movies" />

			<AdminHeader
				handleSearch={handleSerach}
				searchTerm={searchTerm}
				onClick={createAsync}
			/>
			<AdminTable
				isLoading={isLoading}
				removeHandler={deleteAsync}
				headerItems={['Title', 'Genre', 'Rating']}
				tableItems={data || []}
			/>
		</Meta>
	)
}

export default MovieList
