import { useRouter } from 'next/router'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { genreService } from '@/services/genre.service'

import { getKeys } from '@/utils/object/getKeys'
import { toastError } from '@/utils/toastError'

import { getAdminUrl } from '@/config/url.config'

import { IGenreEditInput } from './genreEdit.interface'

export const useGenreEdit = (setValue: UseFormSetValue<IGenreEditInput>) => {
	const { push, query } = useRouter()

	const genreId = String(query.id)

	const { isLoading } = useQuery(
		['genre', genreId],
		() => genreService.getById(genreId),
		{
			onError: (error) => {
				toastError(error, 'Get genre')
			},
			onSuccess: ({ data }) => {
				getKeys(data).forEach((key) => {
					setValue(key, data[key])
				})
			},
			enabled: !!query.id,
		}
	)

	const { mutateAsync } = useMutation(
		'update genre',
		(data: IGenreEditInput) => genreService.update(genreId, data),
		{
			onError: (error) => {
				toastError(error, 'Get genre')
			},
			onSuccess() {
				toastr.success('Update genre', 'update was successful')
				push(getAdminUrl('genres'))
			},
		}
	)

	const onSubmit: SubmitHandler<IGenreEditInput> = async (data) =>
		await mutateAsync(data)

	return {
		onSubmit,
		isLoading,
	}
}
