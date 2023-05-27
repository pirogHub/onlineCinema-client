import { FC, PropsWithChildren } from 'react'

import AdminNavItem from './AdminNavItem'
import styles from './AdminNavigation.module.scss'
import { navItems } from './admin-navigation.data'

const AdminNavigation: FC<PropsWithChildren> = () => {
	return (
		<nav className={styles.nav}>
			<ul>
				{navItems.map((i) => (
					<AdminNavItem key={i.link} item={i} />
				))}
			</ul>
		</nav>
	)
}

export default AdminNavigation
