import { FC, PropsWithChildren } from 'react'

import styles from './Gallery.module.scss'
import GalleryItem from './GalleryItem'
import { IGalleryItem } from './gallery.interface'

const Gallery: FC<PropsWithChildren<{ items: IGalleryItem[] }>> = ({
	items,
}) => {
	return (
		<div className={styles.gallery}>
			{items.map((item) => (
				<GalleryItem variant="vertical" key={item._id} item={item} />
			))}
		</div>
	)
}

export default Gallery
