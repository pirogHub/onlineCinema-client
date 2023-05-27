import { FC, PropsWithChildren } from 'react'
import { FormState, UseFormRegister } from 'react-hook-form'

import Field from '@/components/ui/form-elements/Field'

import CheckBoxField from '@/ui/form-elements/CheckBoxField'

import { validEmail } from '@/shared/regex'

import styles from './AuthFields.module.scss'

interface IAuthFields {
	register: UseFormRegister<any>
	formState: FormState<any>
	isPasswordRequired?: boolean
}

const AuthFields: FC<PropsWithChildren<IAuthFields>> = ({
	register,
	formState: { errors },
	isPasswordRequired = false,
}) => {
	return (
		<>
			<Field
				{...register('email', {
					required: 'Email is required',
					pattern: {
						value: validEmail,
						message: 'Please enter a valid email address',
					},
				})}
				placeholder="Email"
				error={errors.email}
			/>
			<Field
				{...register(
					'password',
					isPasswordRequired
						? {
								required: 'Password is required',
								minLength: {
									value: 6,
									message:
										'Min length should be more 6 symblos',
								},
						  }
						: {}
				)}
				placeholder="Password"
				type="password"
				error={errors.password}
			/>
			<CheckBoxField
				{...register('isAdmin')}
				placeholder="I want to be admin"
				error={errors.isAdmin}
			/>
		</>
	)
}

export default AuthFields
