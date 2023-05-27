import { GetStaticProps, NextPage } from 'next'
import { FC, PropsWithChildren } from 'react'

import Favorites from '@/screens/favorites/Favorites'

const FavoritesPage: NextPage = () => {
	return <Favorites />
}

export default FavoritesPage
