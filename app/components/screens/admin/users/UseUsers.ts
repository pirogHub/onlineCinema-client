import { useMemo } from 'react';
import { getAdminUrl } from '@/config/url.config';
import { ITableItem } from './../../../ui/AdminTable/AdminTable/AdminTable.interface';
import { useDebounce } from '@/hooks/useDebounce';
import { userService } from '@/services/user.service';
import { useState, ChangeEvent } from 'react';
import { useMutation, useQuery } from 'react-query';
import { convertMongoDate } from '@/utils/date/convertMongoDate';
import { toastError } from '@/utils/toastError';
import { toastr } from 'react-redux-toastr';
export const useUsers = () => {
    const [searchTerm, setSearchTerm] = useState('')

    const debouncedSearch = useDebounce(searchTerm, 500)

    const queryData = useQuery(
        ['user list', debouncedSearch],
        () => userService.getAll(debouncedSearch),
        {
            select: ({ data }) => data.map((u): ITableItem => ({
                _id: u._id,
                editUrl: getAdminUrl(`user/edit/${u._id}`),
                items: [u.email, convertMongoDate(u.createdAt), String(u.isAdmin)]
            })),
            onError: (err) => {
                toastError(err, "User list")
            }
        }
    )

    const handleSerach = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    const { mutateAsync: deleteAsync } = useMutation(
        'delete user',
        (userId: string) => userService.deleteUser(userId),
        {
            onError: (err) => {
                toastError(err, "Delete user")
            },
            onSuccess: () => {
                toastr.success('Delete user', 'delete was successful')
                queryData.refetch()
            }
        },
    )

    return useMemo(() => ({
        handleSerach, ...queryData, searchTerm, deleteAsync
    }), [queryData, searchTerm, deleteAsync])
}