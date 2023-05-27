import cn from 'classnames'
import { FC, PropsWithChildren } from 'react'

import styles from './AdminTable.module.scss'

const AdminTableHeader: FC<PropsWithChildren<{ headerItems: string[] }>> = ({
	headerItems,
}) => {
	return (
		<div className={cn(styles.item, styles.itemHeader)}>
			{headerItems.map((val) => (
				<div key={val}>{val}</div>
			))}
			<div>Actions</div>
		</div>
	)
}

export default AdminTableHeader
