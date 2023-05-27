import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { FC, PropsWithChildren } from 'react'
import { useQuery } from 'react-query'

import SkeletonLoader from '@/components/ui/SkeletonLoader'

import SubHeading from '@/ui/heading/SubHeading'

import { IMovie } from '@/shared/types/movie.types'

import { movieService } from '@/services/movie.service'

import { getMovieUrl } from '@/config/url.config'

import styles from '../Admin.module.scss'

const PopularMovie: FC<PropsWithChildren> = () => {
	const { isLoading, data: movie } = useQuery(
		'Most popular movie in admin',
		() => movieService.getMostPopularMovies(),
		{
			select: (data): IMovie => data[0],
		}
	)

	return (
		<div className={cn(styles.block, styles.popular)}>
			<SubHeading title="The most popular movie" />
			{isLoading ? (
				<>
					<h3>Opened ? times</h3>
					<SkeletonLoader className="h-44" />
				</>
			) : (
				movie && (
					<>
						<h3>Opened {movie.countOpened} times</h3>
						<Link href={getMovieUrl(movie.slug)}>
							<Image
								width={285}
								height={176}
								src={movie.bigPoster}
								alt={movie.title}
								className={styles.image}
								unoptimized
							/>
						</Link>
					</>
				)
			)}
		</div>
	)
}

export default PopularMovie
