import { FC } from 'react'
import * as MaterialIcons from 'react-icons/md'
import { TypeMaterialIconName } from 'shared/types/icon.types'

import { useRenderClient } from '@/hooks/useRenderClient'

const MaterialIcon: FC<{ name: TypeMaterialIconName }> = ({ name }) => {
	const { isRenderClient } = useRenderClient()

	const IconComponent = MaterialIcons[name]

	if (isRenderClient) {
		if (!IconComponent) {
			return <MaterialIcons.MdDragIndicator />
		}
	} else {
		return null
	}

	return <IconComponent /> || <MaterialIcons.MdDragIndicator />
}

export default MaterialIcon
