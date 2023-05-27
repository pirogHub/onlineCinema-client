import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import SingleMovie from '@/screens/SingleMovie/SingleMovie'

import { IGalleryItem } from '@/ui/Gallery/gallery.interface'

import { IMovie } from '@/shared/types/movie.types'

import { movieService } from '@/services/movie.service'

import { getMovieUrl } from '@/config/url.config'

import Error404 from '../404'

export interface IMoviePage {
	similarMovies: IGalleryItem[]
	movie: IMovie //| undefined
}

const MoviePage: NextPage<IMoviePage> = ({ similarMovies, movie }) => {
	return movie ? (
		<SingleMovie movie={movie} similarMovies={similarMovies || []} />
	) : (
		<Error404 />
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: movies } = await movieService.getAll()
		const paths = movies.map((a) => ({
			params: { slug: a.slug },
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
		const { data: movie } = await movieService.getBySlug(
			String(params?.slug)
		)

		const { data: dataSimularMovies } = await movieService.getByGenres(
			movie.genres.map((g) => g._id)
		)

		const similarMovies: IGalleryItem[] = dataSimularMovies
			.filter((m) => m._id !== movie._id)
			.map((movie) => ({
				_id: movie._id,
				name: movie.title,
				posterPath: movie.poster,
				link: getMovieUrl(movie.slug),
			}))

		return {
			props: {
				similarMovies,
				movie,
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

export default MoviePage
