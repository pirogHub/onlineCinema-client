import Link from 'next/link'
import { FC, PropsWithChildren } from 'react'

import styles from './AuthVideoPlaceholder.module.scss'

const AuthButton: FC<PropsWithChildren<{ slug: string }>> = ({ slug }) => {
	return (
		<Link href={`/auth?redirect=${slug}`} className={styles.btn}>
			Sign In
		</Link>
	)
}

export default AuthButton
