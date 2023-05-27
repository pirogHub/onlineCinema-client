import { useRouter } from 'next/router'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { actorService } from '@/services/actor.service'

import { getKeys } from '@/utils/object/getKeys'
import { toastError } from '@/utils/toastError'

import { getAdminUrl } from '@/config/url.config'

import { IActorEditInput } from './actorEdit.interface'

export const useActorEdit = (setValue: UseFormSetValue<IActorEditInput>) => {
	const { push, query } = useRouter()

	const actorId = String(query.id)

	const { isLoading } = useQuery(
		['actor', actorId],
		() => actorService.getById(actorId),
		{
			onError: (error) => {
				toastError(error, 'Get actor')
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
		'update actor',
		(data: IActorEditInput) => actorService.update(actorId, data),
		{
			onError: (error) => {
				toastError(error, 'Get actor')
			},
			onSuccess() {
				toastr.success('Update actor', 'update was successful')
				push(getAdminUrl('actors'))
			},
		}
	)

	const onSubmit: SubmitHandler<IActorEditInput> = async (data) =>
		await mutateAsync(data)

	return {
		onSubmit,
		isLoading,
	}
}
