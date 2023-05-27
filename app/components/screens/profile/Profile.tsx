import { FC, PropsWithChildren } from 'react'
import { useForm } from 'react-hook-form'

import SkeletonLoader from '@/ui/SkeletonLoader'
import Button from '@/ui/form-elements/Button'
import Heading from '@/ui/heading/Heading'

import Meta from '@/utils/meta/meta'

import AuthFields from '../auth/AuthFields'

import styles from './Profile.module.scss'
import { IProfileInput } from './profile.interface'
import { useProfile } from './useProfile'

const Profile: FC<PropsWithChildren> = () => {
	const { handleSubmit, register, formState, setValue } =
		useForm<IProfileInput>({
			mode: 'onChange',
		})

	const { isLoading, onSubmit } = useProfile(setValue)
	return (
		<Meta title="Profile">
			<Heading title="Profile" className="mb-6" />
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				{isLoading ? (
					<SkeletonLoader count={2} />
				) : (
					<>
						<AuthFields formState={formState} register={register} />

						<div className={styles.buttons}>
							<Button type="submit">Update</Button>
						</div>
					</>
				)}
			</form>
		</Meta>
	)
}

export default Profile
