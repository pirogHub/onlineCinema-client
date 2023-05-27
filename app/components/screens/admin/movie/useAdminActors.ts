import { IOption } from './../../../ui/Select/select.interface';
import { actorService } from "@/services/actor.service"
import { toastError } from "@/utils/toastError"
import { useQuery } from "react-query"

export const useAdminActors = () => {
    const queryData = useQuery(
        "List of actor",
        () => actorService.getAll(), {
        select: ({ data }) =>
            data.map(
                (actor): IOption => ({
                    label: actor.name,
                    value: actor._id
                })
            ),
        onError: (error) => {
            toastError(error, "Actor list")
        }
    },
    )

    return queryData
}