import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import logoImage from '@/assets/images/icon2.svg'

const Logo: FC = () => {
	return (
		<Link className="px-layout mb-10 block" href="/">
			<Image
				src={logoImage}
				width={247}
				height={34}
				alt="online-cinema"
				draggable={false}
			/>
		</Link>
	)
}

export default Logo
