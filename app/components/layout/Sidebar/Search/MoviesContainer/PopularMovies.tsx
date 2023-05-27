import SkeletonLoader from 'components/ui/SkeletonLoader'
import { FC } from 'react'
import { useQuery } from 'react-query'

import { movieService } from '@/services/movie.service'

import MovieList from './MovieList'

const PopularMovies: FC = () => {
	const { isLoading, data: popularMovies } = useQuery(
		'Popular movies in sidebar',
		() => movieService.getMostPopularMovies(),
		{
			select: (data) => data.slice(0, 3),
		}
	)
	return isLoading ? (
		<div className="mt-11">
			<SkeletonLoader count={3} className="h-28 mb-4" />
		</div>
	) : (
		<MovieList
			link="/trending"
			movies={popularMovies || []}
			title="Polular Movies"
		/>
	)
}

export default PopularMovies
