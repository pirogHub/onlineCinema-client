import cn from 'classnames'
import { FC, PropsWithChildren } from 'react'

import AdminActions from '../AdminActions/AdminActions'

import { IAdminTableItem } from './AdminTable.interface'
import styles from './AdminTable.module.scss'

const AdminTableItem: FC<PropsWithChildren<IAdminTableItem>> = ({
	removeHandler,
	tableItem,
	className,
}) => {
	return (
		<div className={cn(styles.item, styles?.[className || ''])}>
			{tableItem.items.map((value) => (
				<div key={value}>{value}</div>
			))}

			<AdminActions
				editUrl={tableItem.editUrl}
				removeHandler={removeHandler}
			/>
		</div>
	)
}

export default AdminTableItem
