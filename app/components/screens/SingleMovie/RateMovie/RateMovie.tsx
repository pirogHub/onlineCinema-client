import { FC } from 'react'
import StarRating from 'react-star-rating-component'

import AuthButton from '@/ui/VideoPlayer/AuthVideoPlaceholder/AuthButton'

import { useAuth } from '@/hooks/useAuth'

import { getMovieUrl } from '@/config/url.config'

import styles from './RateMovie.module.scss'
import { useRateMovie } from './useRateMovie'

interface IRateMovie {
	id: string
	slug: string
}

const RateMovie: FC<IRateMovie> = ({ id, slug }) => {
	const { user } = useAuth()

	const { handleClick, isSended, rating } = useRateMovie(id)

	return (
		<div className={styles.wrapper}>
			<h3>How do you like the movie?</h3>
			<p>Ratings improve recommendations</p>
			{user ? (
				<>
					{isSended ? (
						<div className={styles.thanks}> Thanks for Rating!</div>
					) : (
						<StarRating
							name="star-rating"
							value={rating}
							onStarClick={handleClick}
							emptyStarColor="#4f4f4f"
						/>
					)}
				</>
			) : (
				<AuthButton slug={getMovieUrl(slug)} />
			)}
		</div>
	)
}

export default RateMovie
