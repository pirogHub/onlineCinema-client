import { useMemo } from 'react';
import { getAdminUrl } from '@/config/url.config';
import { ITableItem } from '../../../ui/AdminTable/AdminTable/AdminTable.interface';
import { useDebounce } from '@/hooks/useDebounce';
import { movieService } from '@/services/movie.service';
import { useState, ChangeEvent } from 'react';
import { useMutation, useQuery } from 'react-query';
import { convertMongoDate } from '@/utils/date/convertMongoDate';
import { toastError } from '@/utils/toastError';
import { toastr } from 'react-redux-toastr';
import { getGenresList, getGenresListEach } from '@/utils/movie/getGenresListEach';
import { useRouter } from 'next/router';

export const useMovies = () => {
    const [searchTerm, setSearchTerm] = useState('')

    const debouncedSearch = useDebounce(searchTerm, 500)

    const queryData = useQuery(
        ['movie list', debouncedSearch],
        () => movieService.getAll(debouncedSearch),
        {
            select: ({ data }) => data.map((movie): ITableItem => ({
                _id: movie._id,
                editUrl: getAdminUrl(`movie/edit/${movie._id}`),
                items: [movie.title, getGenresList(movie.genres), String(movie.rating)]
            })),
            onError: (err) => {
                toastError(err, "Movie list")
            }
        }
    )

    const handleSerach = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    const { mutateAsync: deleteAsync } = useMutation(
        'delete movie',
        (movieId: string) => movieService.delete(movieId),
        {
            onError: (err) => {
                toastError(err, "Delete movie")
            },
            onSuccess: () => {
                toastr.success('Delete movie', 'delete was successful')
                queryData.refetch()
            }
        },
    )

    const { push } = useRouter()

    const { mutateAsync: createAsync } = useMutation(
        'create movie',
        () => movieService.create(),
        {
            onError: (err) => {
                toastError(err, "Create movie")
            },
            onSuccess: ({ data: _id }) => {
                toastr.success('Create movie', 'create was successful')
                push(getAdminUrl(`movie/edit/${_id}`))
            }
        },
    )

    return useMemo(() => ({
        handleSerach,
        ...queryData,
        searchTerm,
        deleteAsync,
        createAsync
    }), [queryData, searchTerm, deleteAsync, createAsync])
}
