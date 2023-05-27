import { GetStaticProps, NextPage } from 'next'
import { FC, PropsWithChildren } from 'react'

import Catalog from '@/ui/catalogMovies/Catalog'

import { IMovie } from '@/shared/types/movie.types'

import { movieService } from '@/services/movie.service'

const TrendingPage: NextPage<{ movies: IMovie[] }> = ({ movies }) => {
	return (
		<Catalog
			movies={movies || []}
			title="Trending movies"
			description="Trending movies in exellent quality: legal, safe, without ads"
		/>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const movies = await movieService.getMostPopularMovies()

		return {
			props: {
				movies,
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

export default TrendingPage
