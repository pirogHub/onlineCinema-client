import { AxiosResponse } from 'axios'
import { getGenreUrl } from 'config/url.config'
import { useQuery } from 'react-query'
import { genreService } from 'services/genre.service'

import { IMenuItem } from '../menu.interface'

export const useAllGenres = () => {
	const queryData = useQuery(
		'popular genre menu',
		() => genreService.getAll(),
		{
			select: ({ data }) =>
				data
					.filter((genre) => genre.icon)
					.map(
						(genre) =>
							({
								icon: genre.icon,
								link: getGenreUrl(genre.slug),
								title: genre.name,
							} as IMenuItem)
					)
					.splice(0, 4),

			onError(error) {
				//error
			},
		}
	)

	return queryData
}
