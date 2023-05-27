import Heading from 'components/ui/heading/Heading'
import Meta from 'utils/meta/meta'

export default function Error500() {
	return (
		<Meta title="Server-side error">
			<Heading title="500 - Server-side error occured" />
		</Meta>
	)
}
