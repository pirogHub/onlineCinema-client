import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { FC, PropsWithChildren } from 'react'

import Catalog from '@/ui/catalogMovies/Catalog'

import { IActor } from '@/shared/types/movie.types'
import { IMovie } from '@/shared/types/movie.types'

import { actorService } from '@/services/actor.service'
import { movieService } from '@/services/movie.service'

import Error404 from '../404'

interface IActorPage {
	movies: IMovie[]
	actor: IActor | undefined
}

const ActorPage: NextPage<IActorPage> = ({ movies, actor }) => {
	return actor ? (
		<Catalog movies={movies || []} title={actor.name} />
	) : (
		<Error404 />
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: actors } = await actorService.getAll()
		const paths = actors.map((a) => ({
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
		const { data: actor } = await actorService.getBySlug(
			String(params?.slug)
		)

		const { data: movies } = await movieService.getByActor(actor._id)

		return {
			props: {
				movies,
				actor,
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

export default ActorPage
