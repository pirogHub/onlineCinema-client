import { FC, PropsWithChildren } from 'react'

import Meta from '@/utils/meta/meta'

import { getMovieUrl } from '@/config/url.config'

import GalleryItem from '../Gallery/GalleryItem'
import Description from '../heading/Description'
import Heading from '../heading/Heading'

import styles from './Catalog.module.scss'
import { ICatalog } from './catalog.interface'

const Catalog: FC<PropsWithChildren<ICatalog>> = ({
	movies,
	title,
	description,
}) => {
	return (
		<Meta title={title} description={description}>
			<Heading title={title} className={styles.heading} />
			{description && (
				<Description
					text={description}
					className={styles.description}
				/>
			)}

			<section className={styles.movies}>
				{movies.map((movie) => (
					<GalleryItem
						key={movie._id}
						item={{
							_id: movie._id,
							name: movie.title,
							link: getMovieUrl(movie.slug),
							posterPath: movie.bigPoster,
							content: {
								title: movie.title,
							},
						}}
						variant="horizontal"
					/>
				))}
			</section>
		</Meta>
	)
}

export default Catalog
