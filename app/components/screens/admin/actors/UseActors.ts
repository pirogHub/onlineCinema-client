import { useMemo } from 'react';
import { getAdminUrl } from '@/config/url.config';
import { ITableItem } from '../../../ui/AdminTable/AdminTable/AdminTable.interface';
import { useDebounce } from '@/hooks/useDebounce';
import { actorService } from '@/services/actor.service';
import { useState, ChangeEvent } from 'react';
import { useMutation, useQuery } from 'react-query';
import { toastError } from '@/utils/toastError';
import { toastr } from 'react-redux-toastr';
import { useRouter } from 'next/router';
export const useActors = () => {
    const [searchTerm, setSearchTerm] = useState('')

    const debouncedSearch = useDebounce(searchTerm, 500)

    const queryData = useQuery(
        ['actor list', debouncedSearch],
        () => actorService.getAll(debouncedSearch),
        {
            select: ({ data }) => data.map((actor): ITableItem => ({
                _id: actor._id,
                editUrl: getAdminUrl(`actor/edit/${actor._id}`),
                items: [actor.name, String(actor.countMovies)]
            })),
            onError: (err) => {
                toastError(err, "Actor list")
            }
        }
    )

    const handleSerach = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    const { mutateAsync: deleteAsync } = useMutation(
        'delete actor',
        (actorId: string) => actorService.deleteActor(actorId),
        {
            onError: (err) => {
                toastError(err, "Delete actor")
            },
            onSuccess: () => {
                toastr.success('Delete actor', 'delete was successful')
                queryData.refetch()
            }
        },
    )


    const { push } = useRouter()

    const { mutateAsync: createAsync } = useMutation(
        'create actor',
        () => actorService.create(),
        {
            onError: (err) => {
                toastError(err, "Create actor")
            },
            onSuccess: ({ data: _id }) => {
                toastr.success('Create actor', 'create was successful')
                push(getAdminUrl(`actor/edit/${_id}`))
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