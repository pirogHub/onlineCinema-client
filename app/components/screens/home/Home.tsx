import Layout from 'components/layout/Layout'
import Heading from 'components/ui/heading/Heading'
import { FC } from 'react'
import { toastr } from 'react-redux-toastr'
import Meta from 'utils/meta/meta'

import Gallery from '@/ui/Gallery/Gallery'
import Slider from '@/ui/Slider/Slider'
import SubHeading from '@/ui/heading/SubHeading'

import { IHome } from './home.interface'

const Home: FC<IHome> = ({ slides, actors, trendingMovies }) => {
	return (
		<Meta
			title="Watch movies online"
			description="Watch MovieApp movies and TV shows or stream right to your browser"
		>
			<Heading
				title="Watch movies online"
				className="text-gray-300 mb-8 text-xl"
			/>

			{slides.length && <Slider slides={slides} />}

			<div className="my-10">
				<SubHeading title="Trending now" />
				{trendingMovies?.length && <Gallery items={trendingMovies} />}
			</div>
			<div>
				<SubHeading title="Best actors" />
				{actors?.length && <Gallery items={actors} />}
				{/* Gallery */}
			</div>
		</Meta>
	)
}

export default Home
