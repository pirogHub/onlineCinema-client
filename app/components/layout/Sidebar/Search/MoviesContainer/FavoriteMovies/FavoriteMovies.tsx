import { FC } from 'react'

import { useFavorites } from '@/screens/favorites/useFavorites'

import SkeletonLoader from '@/ui/SkeletonLoader'

import { useAuth } from '@/hooks/useAuth'

import MovieList from '../MovieList'

import NotAuthFavoriteMovies from './NotAuthFavoriteMovies'

const FavoriteMovies: FC = () => {
	const { favoriteMovies, isLoading } = useFavorites()

	const { user } = useAuth()

	if (!user) return <NotAuthFavoriteMovies />
	return isLoading ? (
		<div className="mt-11">
			<SkeletonLoader count={3} className="h-28 mb-4" />
		</div>
	) : (
		<MovieList
			link="/favorites"
			movies={favoriteMovies?.slice(0, 3) || []}
			title="Favorites"
		/>
	)
}

export default FavoriteMovies
