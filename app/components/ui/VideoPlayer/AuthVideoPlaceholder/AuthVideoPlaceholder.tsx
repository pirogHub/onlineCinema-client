import { FC, PropsWithChildren } from 'react'

import AuthButton from './AuthButton'
import styles from './AuthVideoPlaceholder.module.scss'

const AuthVideoPlaceholder: FC<PropsWithChildren<{ slug: string }>> = ({
	slug,
}) => {
	return (
		<div className={styles.placeholder}>
			<div>You must be logged in to start watching</div>
			<AuthButton slug={slug} />
		</div>
	)
}

export default AuthVideoPlaceholder
