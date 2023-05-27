import { GetStaticProps, NextPage } from 'next'
import { FC, PropsWithChildren } from 'react'

import Collections from '@/screens/collections/Collections'
import { ICollection } from '@/screens/collections/collections.interface'

import Catalog from '@/ui/catalogMovies/Catalog'

import { genreService } from '@/services/genre.service'
import { movieService } from '@/services/movie.service'

import Error404 from './404'

const GenresPage: NextPage<{ collections: ICollection[] }> = ({
	collections,
}) => {
	return collections ? (
		<Collections collections={collections || []} />
	) : (
		<Error404 />
	)
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: collections } = await genreService.getCollections()

		return {
			props: {
				collections,
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

export default GenresPage
