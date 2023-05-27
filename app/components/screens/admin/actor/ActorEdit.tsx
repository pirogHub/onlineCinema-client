import dynamic from 'next/dynamic'
import { FC, PropsWithChildren } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { stripHtml } from 'string-strip-html'

import AdminNavigation from '@/components/ui/AdminNavigation/AdminNavigation'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import SlugField from '@/components/ui/SlugField/SlugField'
import Button from '@/components/ui/form-elements/Button'
import Field from '@/components/ui/form-elements/Field'
// import TextEditor from '@/components/ui/form-elements/TextEditor'
import Heading from '@/components/ui/heading/Heading'

import UploadField from '@/ui/form-elements/UploadField/UploadField'

import Meta from '@/utils/meta/meta'
import { generateSlug } from '@/utils/string/generateSlug'

import formStyles from '../../../ui/form-elements/admin-form.module.scss'

import { IActorEditInput } from './actorEdit.interface'
import { useActorEdit } from './useActorEdit'

const ActorEdit: FC<PropsWithChildren> = () => {
	const {
		control,
		handleSubmit,
		register,
		formState: { errors },
		getValues,
		setValue,
	} = useForm<IActorEditInput>({
		mode: 'onChange',
	})

	const { isLoading, onSubmit } = useActorEdit(setValue)

	return (
		<Meta title="Edit actor">
			<AdminNavigation />
			<Heading title="Edit actor" />
			<form className={formStyles.form} onSubmit={handleSubmit(onSubmit)}>
				{isLoading ? (
					<SkeletonLoader count={3} />
				) : (
					<>
						<div className={formStyles.fields}>
							<Field
								{...register('name', {
									required: 'Name is required!',
								})}
								placeholder="Name"
								error={errors.name}
							/>

							<div>
								<SlugField
									register={register}
									error={errors.slug}
									generate={() => {
										setValue(
											'slug',
											generateSlug(getValues('name'))
										)
									}}
								/>
							</div>

							<Controller
								control={control}
								name="photo"
								defaultValue=""
								render={({
									field: { value, onChange },
									fieldState: { error },
								}) => (
									<UploadField
										onChange={onChange}
										file={value}
										error={error}
										folder="actors"
										placeholder="Photo"
									/>
								)}
								rules={{
									required: 'Photo is required!',
								}}
							/>
						</div>
						<Button>Update</Button>
					</>
				)}
			</form>
		</Meta>
	)
}

export default ActorEdit
