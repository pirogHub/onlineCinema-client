import cn from 'classnames'
import { FC, PropsWithChildren, useEffect, useState } from 'react'
import { useMutation } from 'react-query'

import { useFavorites } from '@/screens/favorites/useFavorites'

import { useAuth } from '@/hooks/useAuth'

import { userService } from '@/services/user.service'

import { toastError } from '@/utils/toastError'

import styles from './FavoriteButton.module.scss'

// import HeartImage from './heart-animation.png'

const FavoriteButton: FC<{ movieId: string }> = ({ movieId }) => {
	const [isSmashed, setIsSmashed] = useState(false)

	const { favoriteMovies, refetch } = useFavorites()

	useEffect(() => {
		if (!favoriteMovies) return

		const isHasMovie = favoriteMovies.some((f) => f._id === movieId)

		if (isSmashed !== isHasMovie) setIsSmashed(isHasMovie)
	}, [favoriteMovies, isSmashed, movieId])

	const { mutateAsync } = useMutation(
		'update favorites',
		() => userService.toggleFavorite(movieId),
		{
			onError: (error) => {
				toastError(error, 'Update favorite list')
			},
			onSuccess() {
				setIsSmashed(!isSmashed)
				refetch()
			},
		}
	)

	return (
		<button
			onClick={() => mutateAsync()}
			className={cn(styles.button, {
				[styles.animate]: isSmashed,
			})}
			style={{ backgroundImage: `url("/heart-animation.png")` }}
		></button>
	)
}

export default FavoriteButton
