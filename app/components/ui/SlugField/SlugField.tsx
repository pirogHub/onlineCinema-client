import { FC, PropsWithChildren } from 'react'
import { FieldError, UseFormRegister } from 'react-hook-form'

import Field from '../form-elements/Field'

import styles from './SlugField.module.scss'

interface ISluGField {
	error?: FieldError
	register: UseFormRegister<any>
	generate: () => void
}

const SlugField: FC<PropsWithChildren<ISluGField>> = ({
	generate,
	register,
	error,
}) => {
	return (
		<div className={styles.generate}>
			<Field
				{...register('slug', {
					required: 'Slug is required!',
				})}
				placeholder="Slug"
				error={error}
			/>
			<div className={styles.badge} onClick={generate}>
				generate
			</div>
		</div>
	)
}

export default SlugField
