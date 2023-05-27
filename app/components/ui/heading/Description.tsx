import cn from 'classnames'
import parse from 'html-react-parser'
import { FC } from 'react'

const Description: FC<{ text: string; className?: string }> = ({
	text,
	className = '',
}) => {
	const tmp = text
	const tmp2 = parse(text)

	return (
		<div
			className={cn(
				'text-lg font-light text-white text-opacity-60',
				className
			)}
		>
			{parse(text)}
		</div>
	)
}

export default Description
