import { FC, PropsWithChildren } from 'react'

import Button from '@/components/ui/form-elements/Button'

const AdminCreateButton: FC<PropsWithChildren<{ onClick: () => void }>> = ({
	onClick,
}) => {
	return <Button onClick={onClick}>Create new</Button>
}

export default AdminCreateButton
