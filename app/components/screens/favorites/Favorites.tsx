import { FC, PropsWithChildren } from 'react'

import SkeletonLoader from '@/ui/SkeletonLoader'
import Heading from '@/ui/heading/Heading'

import { useAuth } from '@/hooks/useAuth'

import Meta from '@/utils/meta/meta'

import FavoriteItem from './FavoriteItem'
import styles from './Favorites.module.scss'
import { useFavorites } from './useFavorites'

const Favorites: FC<PropsWithChildren> = () => {
	const { favoriteMovies, isLoading } = useFavorites()

	const { user } = useAuth()

	if (!user) return null

	return (
		<Meta title="Favorites">
			<Heading title="Favorites" />
			<section className={styles.favorites}>
				{isLoading ? (
					<SkeletonLoader
						count={3}
						className={styles.skeletonLoader}
						containerClassName={styles.containerLoader}
					/>
				) : (
					favoriteMovies?.map((movie) => (
						<FavoriteItem movie={movie} key={movie._id} />
					))
				)}
			</section>
		</Meta>
	)
}

export default Favorites
