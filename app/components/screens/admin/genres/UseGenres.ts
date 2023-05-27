import { useMemo } from 'react';
import { getAdminUrl } from '@/config/url.config';
import { ITableItem } from '../../../ui/AdminTable/AdminTable/AdminTable.interface';
import { useDebounce } from '@/hooks/useDebounce';
import { genreService } from '@/services/genre.service';
import { useState, ChangeEvent } from 'react';
import { useMutation, useQuery } from 'react-query';
import { convertMongoDate } from '@/utils/date/convertMongoDate';
import { toastError } from '@/utils/toastError';
import { toastr } from 'react-redux-toastr';
import { useRouter } from 'next/router';
export const useGenres = () => {
    const [searchTerm, setSearchTerm] = useState('')

    const { push } = useRouter()

    const debouncedSearch = useDebounce(searchTerm, 500)

    const queryData = useQuery(
        ['genre list', debouncedSearch],
        () => genreService.getAll(debouncedSearch),
        {
            select: ({ data }) => data.map((genre): ITableItem => ({
                _id: genre._id,
                editUrl: getAdminUrl(`genre/edit/${genre._id}`),
                items: [genre.name, genre.slug]
            })),
            onError: (err) => {
                toastError(err, "Genre list")
            }
        }
    )

    const handleSerach = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    const { mutateAsync: deleteAsync } = useMutation(
        'delete genre',
        (genreId: string) => genreService.delete(genreId),
        {
            onError: (err) => {
                toastError(err, "Delete genre")
            },
            onSuccess: () => {
                toastr.success('Delete genre', 'delete was successful')
                queryData.refetch()
            }
        },
    )


    const { mutateAsync: createAsync } = useMutation(
        'create genre',
        () => genreService.create(),
        {
            onError: (err) => {
                toastError(err, "Create genre")
            },
            onSuccess: ({ data: _id }) => {
                toastr.success('Create genre', 'create was successful')
                push(getAdminUrl(`genre/edit/${_id}`))
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