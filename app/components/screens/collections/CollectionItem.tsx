import cn from 'classnames'
import Link from 'next/link'
import { FC, PropsWithChildren } from 'react'

import { getGenreUrl } from '@/config/url.config'

import CollectionImage from './CollectionImage'
import styles from './Collections.module.scss'
import { ICollection } from './collections.interface'

const styleImgArr = ['first', 'second', 'third', 'forth', 'fifth']

const CollectionItem: FC<PropsWithChildren<{ collection: ICollection }>> = ({
	collection,
}) => {
	const tmp = collection
	debugger

	return (
		<Link href={getGenreUrl(collection.slug)} className={styles.collection}>
			<div className={styles.content}>
				<span className={styles.title}>{collection.title}</span>
			</div>
			{collection.image.map((i, idx) => (
				<div className={cn(styles.behind, styles[styleImgArr[idx]])}>
					<CollectionImage title={collection.title} image={i} />
				</div>
			))}
			{/* <div style={{ zIndex: 1 }}>
				<CollectionImage
					title={collection.title}
					image={collection.image[0]}
				/>
			</div>

			<div className={cn(styles.behind, styles.second)}>
				<CollectionImage
					title={collection.title}
					image={collection.image[1]}
				/>
			</div> */}
			{/*<div className={cn(styles.behind, styles.third)}>
				<CollectionImage
					title={collection.title}
					image={collection.image[2]}
				/>
			</div> */}
		</Link>
	)
}

export default CollectionItem
