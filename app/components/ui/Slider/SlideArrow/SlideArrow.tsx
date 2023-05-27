import cn from 'classnames'
import { FC, PropsWithChildren } from 'react'

import MaterialIcon from '@/ui/MaterialIcon'

import styles from './SlideArrow.module.scss'

interface ISlideArrow {
	variant: 'left' | 'right'
	clickHandler: () => void
}

const SlideArrow: FC<PropsWithChildren<ISlideArrow>> = ({
	clickHandler,
	variant,
}) => {
	const isLeft = variant === 'left'

	return (
		<button
			onClick={clickHandler}
			className={cn(styles.arrow, {
				[styles.left]: isLeft,
				[styles.right]: !isLeft,
			})}
		>
			<MaterialIcon name={isLeft ? 'MdChevronLeft' : 'MdChevronRight'} />
		</button>
	)
}

export default SlideArrow
