import { FC, PropsWithChildren } from 'react'
import { Controller, useForm } from 'react-hook-form'

import AdminNavigation from '@/components/ui/AdminNavigation/AdminNavigation'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import Button from '@/components/ui/form-elements/Button'
import Heading from '@/components/ui/heading/Heading'

import AuthFields from '@/screens/auth/AuthFields'

import Meta from '@/utils/meta/meta'

import { useUserEdit } from './useUserEdit'
import { IUserEditInput } from './userEdit.interface'

const UserEdit: FC<PropsWithChildren> = () => {
	const { control, handleSubmit, register, formState, setValue } =
		useForm<IUserEditInput>({
			mode: 'onChange',
		})

	const { isLoading, onSubmit } = useUserEdit(setValue)

	return (
		<Meta title="Edit user">
			<AdminNavigation />
			<Heading title="Edit user" />
			<form className="admin-form" onSubmit={handleSubmit(onSubmit)}>
				{isLoading ? (
					<SkeletonLoader count={3} />
				) : (
					<>
						<AuthFields register={register} formState={formState} />

						<Controller
							control={control}
							name="isAdmin"
							render={({ field }) => (
								<button
									onClick={(e) => {
										e.preventDefault()
										field.onChange(!field.value)
									}}
									className="text-link block mb-7"
								>
									{field.value
										? 'Make it regular user'
										: 'Make it Admin'}
								</button>
							)}
						></Controller>

						<Button>Update</Button>
					</>
				)}
			</form>
		</Meta>
	)
}

export default UserEdit
