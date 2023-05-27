import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { FC, PropsWithChildren } from 'react'

import Catalog from '@/ui/catalogMovies/Catalog'

import { IGenre } from '@/shared/types/genre.types'
import { IMovie } from '@/shared/types/movie.types'

import { genreService } from '@/services/genre.service'
import { movieService } from '@/services/movie.service'

import Error404 from '../404'

interface IGenrePage {
	movies: IMovie[]
	genre: IGenre | undefined
}

const GenrePage: NextPage<IGenrePage> = ({ movies, genre }) => {
	return genre ? (
		<Catalog
			movies={movies || []}
			title={genre.name}
			description={genre.description}
		/>
	) : (
		<Error404 />
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: genres } = await genreService.getAll()
		const paths = genres.map((g) => ({
			params: { slug: g.slug },
		}))

		return { paths, fallback: 'blocking' }
	} catch (error) {
		return {
			paths: [],
			fallback: 'blocking',
		}
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const { data: genre } = await genreService.getBySlug(
			String(params?.slug)
		)
		debugger
		const { data: movies } = await movieService.getByGenres([genre._id])

		return {
			props: {
				movies,
				genre,
			},
			revalidate: 60,
		}
	} catch (error) {
		return {
			props: {
				notFound: true,
			},
			revalidate: 60,
		}
	}
}

export default GenrePage
