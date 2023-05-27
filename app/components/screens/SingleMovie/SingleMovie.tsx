import dynamic from 'next/dynamic'
import { FC, PropsWithChildren } from 'react'

import Banner from '@/ui/Banner/Banner'
import Gallery from '@/ui/Gallery/Gallery'
import VideoPlayer from '@/ui/VideoPlayer/VideoPlayer'
import SubHeading from '@/ui/heading/SubHeading'

import Meta from '@/utils/meta/meta'

import { IMoviePage } from '../../../../pages/movies/[slug]'

import Content from './Content/Content'
import { useUpdateCountOpened } from './useUpdateCountOpened'

const DynamicVideoPlayer = dynamic(
	() => import('@/ui/VideoPlayer/VideoPlayer'),
	{ ssr: false }
)

const DymanicStarRate = dynamic(() => import('./RateMovie/RateMovie'), {
	ssr: false,
})
const SingleMovie: FC<PropsWithChildren<IMoviePage>> = ({
	movie,
	similarMovies,
}) => {
	useUpdateCountOpened(movie.slug)
	return (
		<Meta title={movie.title} description={`Watch ${movie.title}`}>
			<Banner
				image={movie.bigPoster}
				Detail={() => <Content movie={movie} />}
			/>

			<DynamicVideoPlayer
				slug={movie.slug}
				videoSource={movie.videoUrl}
			/>

			<div className="mt-12">
				<SubHeading title="Similar" />
				<Gallery items={similarMovies} />
			</div>

			<DymanicStarRate slug={movie.slug} id={movie._id} />
		</Meta>
	)
}

export default SingleMovie
