import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { useMutation } from 'react-query'

import { fileService } from '@/services/file.service'

import { toastError } from '@/utils/toastError'

type TypeUpload = (
	onChange: (...event: any[]) => void,
	folder?: string
) => {
	uploadFile: (e: ChangeEvent<HTMLInputElement>) => Promise<void>
	isLoading: boolean
}

export const useUpload: TypeUpload = (onChange, folder) => {
	const [isLoading, setIsLoading] = useState(false)

	const { mutateAsync } = useMutation(
		'upload file',
		(data: FormData) => fileService.upload(data, folder),
		{
			onSuccess: ({ data }) => {
				const tmp = data
				
				onChange(data[0].url)
			},
			onError: (error) => {
				toastError(error, 'Upload file')
			},
		}
	)

	const uploadFile = useCallback(
		async (e: ChangeEvent<HTMLInputElement>) => {
			const files = e.target.files

			if (!files?.length) return

			setIsLoading(true)

			const formData = new FormData()

			formData.append('files', files[0])

			await mutateAsync(formData)

			setTimeout(() => setIsLoading(false))
		},
		[mutateAsync]
	)

	return useMemo(
		() => ({
			uploadFile,
			isLoading,
		}),
		[uploadFile, isLoading]
	)
}
