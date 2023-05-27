import cn from 'classnames'
import Image from 'next/image'
import { FC, PropsWithChildren } from 'react'

import SkeletonLoader from '@/ui/SkeletonLoader'

import { IUploadField } from '../form.interface'

import styles from './UploadField.module.scss'
import { useUpload } from './useUpload'

const UploadField: FC<IUploadField> = ({
	onChange,
	placeholder,
	error,
	file,
	folder,
	isNoImage = false,
	style,
}) => {
	const { isLoading, uploadFile } = useUpload(onChange, folder)

	return (
		<div className={cn(styles.field, styles.uploadField)} style={style}>
			<div className={styles.uploadFlex}>
				<label>
					<span>{placeholder}</span>
					<input type="file" onChange={uploadFile} />
					{error && (
						<div className={styles.error}>{error.message}</div>
					)}
				</label>

				{!isNoImage && (
					<div className={styles.uploadImageContainer}>
						{isLoading ? (
							<SkeletonLoader
								count={1}
								className="w-full h-full"
							/>
						) : (
							file && (
								<Image
									alt=""
									src={file}
									// layout="fill"
									fill
									unoptimized
								/>
							)
						)}
					</div>
				)}
			</div>
		</div>
	)
}

export default UploadField
