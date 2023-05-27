import { FC, PropsWithChildren, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import Button from '@/components/ui/form-elements/Button'
import Heading from '@/components/ui/heading/Heading'

import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'

import Meta from '@/utils/meta/meta'

import styles from './Auth.module.scss'
import AuthFields from './AuthFields'
import { IAuthInput } from './auth.interface'
import { useAuthRedirect } from './useAuthRedirect'

const Auth: FC<PropsWithChildren> = () => {
	useAuthRedirect()
	const { isLoading } = useAuth()

	const [type, setType] = useState<'login' | 'register'>('login')

	const {
		register: registerInput,
		handleSubmit,
		formState,
		reset,
	} = useForm<IAuthInput>({
		mode: 'onChange',
		defaultValues: { isAdmin: true },
	})

	const { login, register } = useActions()

	const onSubmit: SubmitHandler<IAuthInput> = async (data) => {
		if (type === 'login') await login(data)
		else if (type === 'register') await register(data)

		reset()
	}

	return (
		<Meta title="Auth">
			<section className={styles.wrapper}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Heading title="Auth" className="mb-6" />

					<AuthFields
						formState={formState}
						register={registerInput}
						isPasswordRequired
					/>

					<div className={styles.buttons}>
						<Button
							type="submit"
							onClick={() => setType('login')}
							disabled={isLoading}
						>
							Login
						</Button>
						<Button
							type="submit"
							onClick={() => setType('register')}
							disabled={isLoading}
						>
							Register
						</Button>
					</div>
				</form>
			</section>
		</Meta>
	)
}

export default Auth
