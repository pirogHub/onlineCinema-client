import { GetStaticProps, NextPage } from 'next'
import { FC, PropsWithChildren } from 'react'

import Catalog from '@/ui/catalogMovies/Catalog'

import { IMovie } from '@/shared/types/movie.types'

import { movieService } from '@/services/movie.service'

const FreshPage: NextPage<{ movies: IMovie[] }> = ({ movies }) => {
	return (
		<Catalog
			movies={movies || []}
			title="Fresh movies"
			description="new movies and series in exellent quality: legal, safe, without ads"
		/>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: movies } = await movieService.getAll()

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

export default FreshPage
