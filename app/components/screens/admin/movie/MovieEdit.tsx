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

import { IMovieEditInput } from './movieEdit.interface'
import { useAdminActors } from './useAdminActors'
import { useAdminGenres } from './useAdminGenres'
import { useMovieEdit } from './useMovieEdit'

const DynamicSelect = dynamic(() => import('@/ui/Select/Select'), {
	ssr: false,
})

const MovieEdit: FC<PropsWithChildren> = () => {
	const {
		control,
		handleSubmit,
		register,
		formState: { errors },
		getValues,
		setValue,
	} = useForm<IMovieEditInput>({
		mode: 'onChange',
	})

	const { isLoading, onSubmit } = useMovieEdit(setValue)

	const { isLoading: isGenresLoading, data: genres } = useAdminGenres()
	const { isLoading: isActorsLoading, data: actors } = useAdminActors()

	return (
		<Meta title="Edit movie">
			<AdminNavigation />
			<Heading title="Edit movie" />
			<form className={formStyles.form} onSubmit={handleSubmit(onSubmit)}>
				{isLoading ? (
					<SkeletonLoader count={3} />
				) : (
					<>
						<div className={formStyles.fields}>
							<Field
								{...register('title', {
									required: 'Title is required!',
								})}
								placeholder="Title"
								error={errors.title}
							/>

							<div>
								<SlugField
									register={register}
									error={errors.slug}
									generate={() => {
										setValue(
											'slug',
											generateSlug(getValues('title'))
										)
									}}
								/>
							</div>

							<Field
								{...register('parameters.country', {
									required: 'Country is required!',
								})}
								placeholder="Country"
								error={errors.parameters?.country}
								style={{ width: '31%' }}
							/>

							<Field
								{...register('parameters.duration', {
									required: 'Duration is required!',
								})}
								placeholder="Duration (min)"
								error={errors.parameters?.duration}
								style={{ width: '31%' }}
							/>

							<Field
								{...register('parameters.year', {
									required: 'Year is required!',
								})}
								placeholder="Year"
								error={errors.parameters?.year}
								style={{ width: '31%' }}
							/>

							{/* React Select */}
							<Controller
								control={control}
								name="genres"
								render={({ field, fieldState: { error } }) => (
									<DynamicSelect
										field={field}
										options={genres || []}
										isLoading={isGenresLoading}
										isMulti
										placeholder="Genres"
										error={error}
									/>
								)}
								rules={{
									required:
										'Please select at least one genre!',
								}}
							/>

							<Controller
								control={control}
								name="actors"
								render={({ field, fieldState: { error } }) => (
									<DynamicSelect
										field={field}
										options={actors || []}
										isLoading={isActorsLoading}
										isMulti
										placeholder="Actors"
										error={error}
									/>
								)}
								rules={{
									required:
										'Please select at least one actor!',
								}}
							/>

							<Controller
								control={control}
								name="poster"
								defaultValue=""
								render={({
									field: { value, onChange },
									fieldState: { error },
								}) => (
									<UploadField
										onChange={onChange}
										file={value}
										error={error}
										folder="movies"
										placeholder="Poster"
									/>
								)}
								rules={{
									required: 'Poster is required!',
								}}
							/>

							<Controller
								control={control}
								name="bigPoster"
								defaultValue=""
								render={({
									field: { value, onChange },
									fieldState: { error },
								}) => (
									<UploadField
										onChange={onChange}
										file={value}
										error={error}
										folder="movies"
										placeholder="Big poster"
									/>
								)}
								rules={{
									required: 'Big poster is required!',
								}}
							/>

							<Controller
								control={control}
								name="videoUrl"
								defaultValue=""
								render={({
									field: { value, onChange },
									fieldState: { error },
								}) => (
									<UploadField
										onChange={onChange}
										file={value}
										error={error}
										folder="movies"
										placeholder="Video"
										style={{ marginTop: -25 }}
										isNoImage
									/>
								)}
								rules={{
									required: 'Video is required!',
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

export default MovieEdit
