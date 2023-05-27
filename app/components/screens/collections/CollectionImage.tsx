import Image from 'next/image'
import { FC, PropsWithChildren } from 'react'

import { ICollection } from './collections.interface'

const CollectionImage: FC<
	PropsWithChildren<{ image: string; title: string }>
> = ({ image, title }) => {
	return <Image alt={title} src={image} fill draggable={false} />
}

export default CollectionImage
