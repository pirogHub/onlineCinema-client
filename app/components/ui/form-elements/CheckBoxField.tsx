import cn from 'classnames'
import { forwardRef } from 'react'

import styles from './Form.module.scss'
import { IField } from './form.interface'

const CheckBoxField = forwardRef<HTMLInputElement, IField>(
	({ placeholder, error, style, ...rest }, ref) => {
		return (
			<div
				className={cn(styles.common, styles.checkbox_field)}
				style={style}
			>
				<label className={cn(styles.checkbox_field_label)}>
					<input type="checkbox" ref={ref} {...rest} />
					<span>{placeholder}</span>
				</label>
				<div className={cn(styles.checkbox_field_warning)}>
					(Will work when register only)
				</div>
				{error && (
					<div className={styles.error}>{String(error.message)}</div>
				)}
			</div>
		)
	}
)

CheckBoxField.displayName = 'CheckBoxField'

export default CheckBoxField
