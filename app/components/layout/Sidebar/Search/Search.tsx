import SearchField from 'components/ui/searchField/searchField'
import { FC } from 'react'

import styles from './Search.module.scss'
import SearchList from './SearchList/SearchList'
import { useSearch } from './useSearch'

const Search: FC = () => {
	const { isSuccess, data, handleSerach, searchTerm } = useSearch()
	return (
		<div className={styles.wrapper}>
			<SearchField handleSearch={handleSerach} searchTerm={searchTerm} />
			{isSuccess && <SearchList movies={data || []} />}
		</div>
	)
}

export default Search
