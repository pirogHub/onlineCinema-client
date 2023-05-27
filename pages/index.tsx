import Home from 'components/screens/home/Home'
import { GetStaticProps, NextPage } from 'next'

import { IHome } from '@/screens/home/home.interface'

import { IGalleryItem } from '@/ui/Gallery/gallery.interface'
import { ISlide } from '@/ui/Slider/slider.interface'

import { actorService } from '@/services/actor.service'
import { movieService } from '@/services/movie.service'

import { getGenresList } from '@/utils/movie/getGenresListEach'

import { getActorUrl, getMovieUrl } from '@/config/url.config'

const HomePage: NextPage<IHome> = ({ slides, actors, trendingMovies }) => {
	return (
		<Home slides={slides} actors={actors} trendingMovies={trendingMovies} />
	)
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: movies } = await movieService.getAll()

		const slides: ISlide[] = movies.slice(0, 3).map((movie) => ({
			_id: movie._id,
			link: getMovieUrl(movie.slug),
			bigPoster: movie.bigPoster,
			subTitle: getGenresList(movie.genres),
			title: movie.title,
		}))

		const { data: dataActors } = await actorService.getAll()
		const actors: IGalleryItem[] = dataActors.slice(0, 7).map((actor) => ({
			_id: actor._id,
			name: actor.name,
			posterPath: actor.photo,
			link: getActorUrl(actor.slug),
			content: {
				title: actor.name,
				subTitle: `+${actor.countMovies} movies`,
			},
		}))

		const dataTrendingMovies = await movieService.getMostPopularMovies()
		const trendingMovies: IGalleryItem[] = dataTrendingMovies
			.slice(0, 7)
			.map((movie) => ({
				_id: movie._id,
				name: movie.title,
				posterPath: movie.poster,
				link: getMovieUrl(movie.slug),
			}))

		return {
			props: {
				slides,
				actors,
				trendingMovies,
			} as IHome,
			revalidate: 60,
		}
	} catch (error) {
		return {
			props: {
				slides: [],
				actors: [],
				trendingMovies: [],
			} as IHome,
			revalidate: 60,
		}
	}
}

export default HomePage
