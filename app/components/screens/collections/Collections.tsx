import { FC, PropsWithChildren } from 'react'

import Description from '@/ui/heading/Description'
import Heading from '@/ui/heading/Heading'

import Meta from '@/utils/meta/meta'

import CollectionItem from './CollectionItem'
import styles from './Collections.module.scss'
import { ICollection } from './collections.interface'

const title = 'Discovery'
const description = 'In this section you will find all genres on this site'

const Collections: FC<PropsWithChildren<{ collections: ICollection[] }>> = ({
	collections,
}) => {
	return (
		<Meta title={title} description={description}>
			<Heading title={title} className={styles.heading} />
			<Description text={description} className={styles.description} />

			<section className={styles.collections}>
				{collections.map((c) => (
					<CollectionItem key={c._id} collection={c} />
				))}
			</section>
		</Meta>
	)
}

export default Collections
