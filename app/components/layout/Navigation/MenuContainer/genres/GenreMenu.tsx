import SkeletonLoader from 'components/ui/SkeletonLoader'
import { FC } from 'react'

import Menu from '../Menu'

import { useAllGenres } from './useAllGenres'

const GenreMenu: FC = () => {
	const { isLoading, data } = useAllGenres()

	return isLoading ? (
		<div className="mx-11 mb-6">
			<SkeletonLoader count={5} className="h-5 mt-3" />
		</div>
	) : (
		<Menu menu={{ title: 'Popular genres', items: data || [] }} />
	)
}

export default GenreMenu
