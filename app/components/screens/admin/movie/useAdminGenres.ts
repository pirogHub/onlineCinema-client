import { IOption } from './../../../ui/Select/select.interface';
import { genreService } from "@/services/genre.service"
import { toastError } from "@/utils/toastError"
import { useQuery } from "react-query"

export const useAdminGenres = () => {
    const queryData = useQuery(
        "List of genre",
        () => genreService.getAll(), {
        select: ({ data }) =>
            data.map(
                (genre): IOption => ({
                    label: genre.name,
                    value: genre._id
                })
            ),
        onError: (error) => {
            toastError(error, "Genre list")
        }
    },
    )

    return queryData
}