import Image from 'next/image'
import Link from 'next/link'
import { FC, PropsWithChildren } from 'react'

import { useAuth } from '@/hooks/useAuth'

import { IMovie } from '@/shared/types/movie.types'

import { getMovieUrl } from '@/config/url.config'

import FavoriteButton from '../SingleMovie/FavoriteButton/FavoriteButton'

import styles from './Favorites.module.scss'

const FavoriteItem: FC<PropsWithChildren<{ movie: IMovie }>> = ({ movie }) => {
	const { user } = useAuth()
	return (
		<div className={styles.itemWrapper}>
			{!!user && <FavoriteButton movieId={movie._id} />}
			<Link href={getMovieUrl(movie.slug)} className={styles.item}>
				<Image
					src={movie.bigPoster}
					alt={movie.title}
					fill
					draggable={false}
					priority
				/>
				<div className={styles.title}>{movie.title}</div>
			</Link>
		</div>
	)
}

export default FavoriteItem
