import { useAuth } from "@/hooks/useAuth"
import { ratingService } from "@/services/rating.service"
import { toastError } from "@/utils/toastError"
import { useState } from "react"
import { useMutation, useQuery } from "react-query"
import { toastr } from "react-redux-toastr"

export const useRateMovie = (movieId: string) => {


    const [rating, setRating] = useState(0)
    const [isSended, setIsSended] = useState(false)

    const { user } = useAuth()

    const { refetch } = useQuery(
        ['your movie rating', movieId],
        () => ratingService.getByUserMovie(movieId),
        {
            onError: (error) => {
                toastError(error, 'Get rating')
            },
            onSuccess: ({ data }) => {
                setRating(data)
            },
            enabled: !!movieId && !!user,
        }
    )

    const { mutateAsync } = useMutation(
        'set rating movie',
        ({ value }: { value: number }) => ratingService.setRating(movieId, value),
        {
            onError: (error) => {
                toastError(error, 'Get rating')
            },
            onSuccess() {
                toastr.success('Update rating', 'You have successfully rated!')
                setIsSended(true)
                refetch()

                setTimeout(() => {
                    setIsSended(false)
                }, 2400)
            },
        }
    )

    const handleClick = async (nextValue: number) => {

        setRating(nextValue)
        await mutateAsync({ value: nextValue })
    }

    return {
        isSended,
        rating,
        handleClick
    }


}