import Link from 'next/link'
import { FC } from 'react'

import MovieItem from './MovieItem'
import { IMovieList } from './MovieList.interface'
import styles from './MovieList.module.scss'

const MovieList: FC<IMovieList> = ({ link, title, movies }) => {
	return (
		<div className={styles.list}>
			<div className={styles.heading}>{title}</div>
			{movies.map((movie) => (
				<MovieItem key={movie._id} movie={movie} />
			))}
			<Link className={styles.button} href={link}>
				See more
			</Link>
		</div>
	)
}

export default MovieList
