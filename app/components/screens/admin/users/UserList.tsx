import { FC, PropsWithChildren } from 'react'

import AdminNavigation from '@/components/ui/AdminNavigation/AdminNavigation'
import AdminHeader from '@/components/ui/AdminTable/AdminHeader/AdminHeader'
import AdminTable from '@/components/ui/AdminTable/AdminTable/AdminTable'
import Heading from '@/components/ui/heading/Heading'

import Meta from '@/utils/meta/meta'

import { useUsers } from './UseUsers'
import styles from './UserList.module.scss'

const UserList: FC<PropsWithChildren> = () => {
	const { handleSerach, isLoading, searchTerm, data, deleteAsync } =
		useUsers()

	const currentUserEmail_string = localStorage.getItem('user')
	const currentUserEmail = currentUserEmail_string
		? JSON.parse(currentUserEmail_string)?.email
		: null

	// const conditionFuncForMark = (item: any) => item?.[0] === currentUserEmail
	const conditionFuncForMark = (item: any) => {
		const maybeEmail = item?.items?.[0]
		const tmp = maybeEmail === currentUserEmail

		return tmp
	}

	return (
		<Meta title="Users">
			<AdminNavigation />
			<Heading title="Users" />

			<AdminHeader handleSearch={handleSerach} searchTerm={searchTerm} />
			<AdminTable
				isLoading={isLoading}
				removeHandler={deleteAsync}
				headerItems={['Email', 'Date register', 'Is admin']}
				tableItems={data || []}
				MarkFieldByCondition={{
					conditionFunc: conditionFuncForMark,
					conditionClassName: 'bgGreen',
				}}
			/>
		</Meta>
	)
}

export default UserList
