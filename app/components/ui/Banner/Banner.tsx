import Image from 'next/image'
import { FC, PropsWithChildren } from 'react'

import styles from './Banner.module.scss'

interface IBunner {
	image: string
	Detail?: FC | null
}

const Banner: FC<PropsWithChildren<IBunner>> = ({ image, Detail }) => {
	return (
		<div className={styles.banner}>
			<Image
				src={image}
				draggable={false}
				fill
				className="image-like-bg object-tap"
				unoptimized
				priority
				alt=""
			/>

			{Detail && <Detail />}
		</div>
	)
}

export default Banner
