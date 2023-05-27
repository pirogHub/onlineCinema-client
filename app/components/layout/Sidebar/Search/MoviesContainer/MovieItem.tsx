import MaterialIcon from 'components/ui/MaterialIcon'
import { getMovieUrl } from 'config/url.config'
import { getGenreUrl } from 'config/url.config'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { IMovie } from 'shared/types/movie.types'
import { getGenresListEach } from 'utils/movie/getGenresListEach'

import styles from './MovieList.module.scss'

const MovieItem: FC<{ movie: IMovie }> = ({ movie }) => {
	return (
		<div className={styles.item}>
			<Link href={getMovieUrl(movie.slug)}>
				<Image
					src={movie.poster}
					draggable={false}
					alt={movie.title}
					width={65}
					height={97}
					priority
				/>
			</Link>
			<div className={styles.info}>
				<div>
					<div className={styles.title}>{movie.title}</div>
					<div className={styles.genres}>
						{movie.genres.map((g, idx) => (
							<Link href={getGenreUrl(g.slug)} key={g._id}>
								{getGenresListEach(
									idx,
									movie.genres.length,
									g.name
								)}
							</Link>
						))}
					</div>
				</div>
				<div className={styles.rating}>
					<MaterialIcon name="MdStarRate" />
					<span>
						{movie.rating ? movie.rating.toFixed(1) : '3.0'}
					</span>
				</div>
			</div>
		</div>
	)
}

export default MovieItem
