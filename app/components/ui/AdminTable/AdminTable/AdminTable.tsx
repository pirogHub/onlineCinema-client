import { FC, PropsWithChildren } from 'react'

import SkeletonLoader from '../../SkeletonLoader'

import { ITableItem } from './AdminTable.interface'
import styles from './AdminTable.module.scss'
import AdminTableHeader from './AdminTableHeader'
import AdminTableItem from './AdminTableItem'

interface IAdminTable {
	tableItems: ITableItem[]
	isLoading: boolean
	headerItems: string[]
	removeHandler: (id: string) => void
	MarkFieldByCondition?: {
		conditionFunc: Function
		conditionClassName: string
	}
}

const AdminTable: FC<PropsWithChildren<IAdminTable>> = ({
	headerItems,
	isLoading,
	removeHandler,
	tableItems,
	MarkFieldByCondition,
}) => {
	const conditionFunc = MarkFieldByCondition?.conditionFunc
		? MarkFieldByCondition.conditionFunc
		: undefined

	const conditionFuncHelper = (item: any) => {
		const tmp = conditionFunc
			? conditionFunc(item)
				? MarkFieldByCondition?.conditionClassName
				: ''
			: ''

		return tmp
	}
	return (
		<div>
			<AdminTableHeader headerItems={headerItems} />
			{isLoading ? (
				<SkeletonLoader count={1} height={48} className="mt-4" />
			) : tableItems.length ? (
				tableItems.map((ti) => (
					<AdminTableItem
						key={ti._id}
						removeHandler={() => removeHandler(ti._id)}
						tableItem={ti}
						className={conditionFuncHelper(ti)}
					/>
				))
			) : (
				<div className={styles.notFound}>Elements not found</div>
			)}
		</div>
	)
}

export default AdminTable
