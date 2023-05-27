import { useDebounce } from 'hooks/useDebounce'
import { ChangeEvent, useState } from 'react'
import { useQuery } from 'react-query'

import { movieService } from '@/services/movie.service'

export const useSearch = () => {
	const [searchTerm, setSearchTerm] = useState('')

	const debouncedSearch = useDebounce(searchTerm, 500)

	const { isSuccess, data } = useQuery(
		['search movie list', debouncedSearch],
		() => movieService.getAll(debouncedSearch),
		{
			select: ({ data }) => data,
			enabled: !!debouncedSearch,
		}
	)

	const handleSerach = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	return { isSuccess, handleSerach, data, searchTerm }
}
